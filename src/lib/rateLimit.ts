export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
}

interface AttemptRecord {
  timestamps: number[];
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

type Store = Map<string, AttemptRecord>;

declare global {
  var __LOGIN_RATE_LIMIT_STORE__: Store | undefined;
}

const getStore = (): Store => {
  if (!globalThis.__LOGIN_RATE_LIMIT_STORE__) {
    globalThis.__LOGIN_RATE_LIMIT_STORE__ = new Map();
  }
  return globalThis.__LOGIN_RATE_LIMIT_STORE__;
};

const cleanup = (record: AttemptRecord, now: number) => {
  record.timestamps = record.timestamps.filter((ts) => now - ts <= WINDOW_MS);
};

export const registerAttempt = (key: string): RateLimitResult => {
  const store = getStore();
  const now = Date.now();
  const record = store.get(key) ?? { timestamps: [] };
  cleanup(record, now);

  if (record.timestamps.length >= MAX_ATTEMPTS) {
    const retryAfter = WINDOW_MS - (now - record.timestamps[0]);
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(retryAfter, 0),
    };
  }

  record.timestamps.push(now);
  store.set(key, record);

  return {
    allowed: true,
    remaining: Math.max(MAX_ATTEMPTS - record.timestamps.length, 0),
    retryAfter: 0,
  };
};

export const resetAttempts = (key: string) => {
  const store = getStore();
  store.delete(key);
};
