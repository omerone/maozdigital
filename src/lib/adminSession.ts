import bcrypt from 'bcryptjs';

const COOKIE_NAME = 'admin_session';
const DEFAULT_SESSION_MAX_AGE = 60 * 60 * 2; // 2 hours

type RequiredEnvKeys = 'ADMIN_SESSION_SECRET' | 'ADMIN_USERNAME';

const getRequiredEnv = (key: RequiredEnvKeys) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getOptionalEnv = (key: 'ADMIN_PASSWORD' | 'ADMIN_PASSWORD_HASH') => {
  const value = process.env[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
};

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

const getSecret = () => {
  return getRequiredEnv('ADMIN_SESSION_SECRET');
};

const cryptoApi = () => {
  if (!globalThis.crypto || !globalThis.crypto.subtle) {
    throw new Error('Web Crypto API is unavailable in this runtime.');
  }
  return globalThis.crypto;
};

export const getAdminUsername = () => getRequiredEnv('ADMIN_USERNAME').trim();

const timingSafeEqualText = (a: string, b: string) => {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

export const verifyAdminPassword = async (candidate: string) => {
  const trimmed = candidate.trim();
  const hashed = getOptionalEnv('ADMIN_PASSWORD_HASH');
  if (hashed) {
    try {
      return await bcrypt.compare(trimmed, hashed);
    } catch (error) {
      console.error('Failed comparing admin password hash:', error);
      return false;
    }
  }

  const plain = getOptionalEnv('ADMIN_PASSWORD');
  if (!plain) {
    throw new Error('Missing environment variable: ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH)');
  }
  return timingSafeEqualText(trimmed, plain.trim());
};

export interface SessionTokenPayload {
  issuedAt: number;
  nonce: string;
}

const buildUnsignedToken = ({ issuedAt, nonce }: SessionTokenPayload) => `${issuedAt}.${nonce}`;

const bufferToHex = (buffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const signToken = async (unsignedToken: string) => {
  const secret = getSecret();
  const encoder = new TextEncoder();
  const crypto = cryptoApi();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(unsignedToken));
  return bufferToHex(signature);
};

const timingSafeEqualHex = (a: string, b: string) => {
  if (a.length !== b.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
};

const generateNonce = () => {
  const crypto = cryptoApi();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bufferToHex(bytes.buffer);
};

export const createSessionToken = async () => {
  const issuedAt = Date.now();
  const nonce = generateNonce();
  const unsigned = buildUnsignedToken({ issuedAt, nonce });
  const signature = await signToken(unsigned);
  return `${unsigned}.${signature}`;
};

export const serializeSessionCookie = (token: string) => ({
  name: COOKIE_NAME,
  value: token,
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
  maxAge: DEFAULT_SESSION_MAX_AGE,
  secure: process.env.NODE_ENV === 'production',
});

export const verifySessionToken = async (token: string | undefined | null, maxAge: number = DEFAULT_SESSION_MAX_AGE) => {
  if (!token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [issuedAtRaw, nonce, signature] = parts;
  const issuedAt = Number(issuedAtRaw);

  if (!Number.isFinite(issuedAt) || !nonce || !signature) {
    return false;
  }

  const unsigned = buildUnsignedToken({ issuedAt, nonce });
  const expectedSignature = await signToken(unsigned);

  if (!timingSafeEqualHex(signature, expectedSignature)) {
    return false;
  }

  const ageInSeconds = (Date.now() - issuedAt) / 1000;
  return ageInSeconds <= maxAge;
};

export const clearSessionCookie = () => ({
  name: COOKIE_NAME,
  value: '',
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 0,
  secure: process.env.NODE_ENV === 'production',
});

