/**
 * Authentication utility functions for admin operations
 */
import { setCookie, getCookie, removeCookie } from './cookieUtils';

// Organization token
const ORGANIZATION_TOKEN_COOKIE = 'organizationToken';
const ORGANIZATION_STATUS_COOKIE = 'isOrganization';
const ORGANIZATION_INFO_COOKIE = 'organizationInfo';
const ORGANIZATION_TOKEN_EXPIRY_COOKIE = 'organizationTokenExpiry';

/**
 * Set organization authentication data in cookies
 * @param {string} token - JWT token for organization authentication
 * @param {object} userData - Organization user data (optional)
 */
export const setOrganizationAuth = (token, userData = null) => {
  if (!token) return;
  setCookie(ORGANIZATION_TOKEN_COOKIE, token, { days: 1 });
  setCookie(ORGANIZATION_STATUS_COOKIE, "true", { days: 1 });
  if (userData) {
    setCookie(ORGANIZATION_INFO_COOKIE, JSON.stringify(userData), { days: 1 });
  }
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  setCookie(ORGANIZATION_TOKEN_EXPIRY_COOKIE, expiresAt.toISOString(), { days: 1 });
};

/**
 * Check if organization token is expired
 * @returns {boolean} - True if token is expired or not present
 */
export const isOrganizationTokenExpired = () => {
  const expiresAt = getCookie(ORGANIZATION_TOKEN_EXPIRY_COOKIE);
  if (!expiresAt) return true;
  return new Date() > new Date(expiresAt);
};

/**
 * Get organization authentication token
 * @returns {string|null} - The organization token or null if not found/expired
 */
export const getOrganizationToken = () => {
  const token = getCookie(ORGANIZATION_TOKEN_COOKIE);
  if (!token || isOrganizationTokenExpired()) {
    return null;
  }
  return token;
};

/**
 * Clear organization authentication data
 */
export const clearOrganizationAuth = () => {
  removeCookie(ORGANIZATION_TOKEN_COOKIE);
  removeCookie(ORGANIZATION_STATUS_COOKIE);
  removeCookie(ORGANIZATION_INFO_COOKIE);
  removeCookie(ORGANIZATION_TOKEN_EXPIRY_COOKIE);
};

/**
 * Check if user is authenticated as organization
 * @returns {boolean} - True if user has valid organization token
 */
export const isOrganizationAuthenticated = () => {
  return !!getOrganizationToken() && getCookie(ORGANIZATION_STATUS_COOKIE) === "true";
};

/**
 * Get organization user information
 * @returns {object|null} - Organization user data or null if not authenticated
 */
export const getOrganizationUserInfo = () => {
  if (!isOrganizationAuthenticated()) return null;
  try {
    const orgInfo = getCookie(ORGANIZATION_INFO_COOKIE);
    return orgInfo ? JSON.parse(orgInfo) : null;
  } catch (error) {
    console.error("Error parsing organization info:", error);
    return null;
  }
};

export default {
  setOrganizationAuth,
  getOrganizationToken,
  clearOrganizationAuth,
  isOrganizationAuthenticated,
  getOrganizationUserInfo
};
