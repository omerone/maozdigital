/**
 * OpenAI Configuration
 * כל הקריאות ל-OpenAI ישתמשו במודל GPT-4o-mini - המודל הכי זול
 */

export const OPENAI_CONFIG = {
  model: 'gpt-4o-mini',
  temperature: 0.7,
  max_tokens: 1000,
  // Base URL for OpenAI API
  apiUrl: 'https://api.openai.com/v1/chat/completions',
};

/**
 * Helper function to create OpenAI API request
 */
export async function createOpenAIRequest(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: {
    temperature?: number;
    max_tokens?: number;
  }
) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const response = await fetch(OPENAI_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_CONFIG.model,
      messages,
      temperature: options?.temperature ?? OPENAI_CONFIG.temperature,
      max_tokens: options?.max_tokens ?? OPENAI_CONFIG.max_tokens,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  return response.json();
}

