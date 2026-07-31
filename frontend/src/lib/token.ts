/**
 * token.ts — In-memory storage for Access Token.
 *
 * Security Best Practice:
 * Access tokens are stored exclusively in JS memory (closure variable)
 * to protect against XSS token theft via localStorage/sessionStorage.
 */

let memoryAccessToken: string | null = null;

export const getAccessToken = (): string | null => {
  return memoryAccessToken;
};

export const setAccessToken = (token: string | null): void => {
  memoryAccessToken = token;
};

export const clearAccessToken = (): void => {
  memoryAccessToken = null;
};
