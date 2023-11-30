import { ACCESS_TOKEN_KEY } from "@/lib/constants";

/**
 * Sets the access token in the local storage.
 * @param {string} accessToken - The access token to be stored.
 */
export function setToken(accessToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

/**
 * Retrieves the access token from the local storage.
 * @returns {string | null} The access token or null if not set.
 */
export function getToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Removes the access token from the local storage.
 */
export function removeToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

/**
 * Checks if the access token is set in the local storage.
 * @returns {boolean} True if the access token is set, false otherwise.
 */
export function isTokenSet(): boolean {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
}
