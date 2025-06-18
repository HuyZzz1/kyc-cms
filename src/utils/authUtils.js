/**
 * Authentication utility functions for admin operations
 */
import { setCookie, getCookie, removeCookie } from './cookieUtils';

// Cookie names
const ADMIN_TOKEN_COOKIE = 'adminToken';
const ADMIN_STATUS_COOKIE = 'isAdmin';
const ADMIN_INFO_COOKIE = 'adminInfo';
const ADMIN_PROFILE_COOKIE = 'adminProfile';
const TOKEN_EXPIRY_COOKIE = 'adminTokenExpiry';

/**
 * Set admin authentication data in cookies
 * @param {string} token - JWT token for admin authentication
 * @param {object} userData - Admin user data (optional)
 */
export const setAdminAuth = (token, userData = null) => {
  if (!token) return;
  
  // Store token in a secure cookie (expires in 1 day by default)
  setCookie(ADMIN_TOKEN_COOKIE, token, { days: 1 });
  setCookie(ADMIN_STATUS_COOKIE, "true", { days: 1 });
  
  if (userData) {
    setCookie(ADMIN_INFO_COOKIE, JSON.stringify(userData), { days: 1 });
  }
  
  // Set token expiration (default to 24 hours if not in token)
  // This is a simple implementation. In a real app, decode JWT to get actual expiry
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  setCookie(TOKEN_EXPIRY_COOKIE, expiresAt.toISOString(), { days: 1 });
};

/**
 * Check if admin token is expired
 * @returns {boolean} - True if token is expired or not present
 */
export const isAdminTokenExpired = () => {
  const expiresAt = getCookie(TOKEN_EXPIRY_COOKIE);
  if (!expiresAt) return true;
  
  return new Date() > new Date(expiresAt);
};

/**
 * Get admin authentication token
 * @returns {string|null} - The admin token or null if not found/expired
 */
export const getAdminToken = () => {
  const token = getCookie(ADMIN_TOKEN_COOKIE);
  if (!token || isAdminTokenExpired()) {
    return null;
  }
  return token;
};

/**
 * Clear admin authentication data
 */
export const clearAdminAuth = () => {
  removeCookie(ADMIN_TOKEN_COOKIE);
  removeCookie(ADMIN_STATUS_COOKIE);
  removeCookie(ADMIN_INFO_COOKIE);
  removeCookie(ADMIN_PROFILE_COOKIE);
  removeCookie(TOKEN_EXPIRY_COOKIE);
};

/**
 * Check if user is authenticated as admin
 * @returns {boolean} - True if user has valid admin token
 */
export const isAdminAuthenticated = () => {
  return !!getAdminToken() && getCookie(ADMIN_STATUS_COOKIE) === "true";
};

/**
 * Get admin user information
 * @returns {object|null} - Admin user data or null if not authenticated
 */
export const getAdminUserInfo = () => {
  if (!isAdminAuthenticated()) return null;
  
  try {
    const adminInfo = getCookie(ADMIN_INFO_COOKIE);
    return adminInfo ? JSON.parse(adminInfo) : null;
  } catch (error) {
    console.error("Error parsing admin info:", error);
    return null;
  }
};

/**
 * Format admin name for display (first letter of first and last names)
 * @param {string} name - Full name of the admin
 * @returns {string} - Initials (up to 2 characters)
 */
export const formatAdminInitials = (name) => {
  if (!name) return "AD";
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default {
  setAdminAuth,
  getAdminToken,
  clearAdminAuth,
  isAdminAuthenticated,
  isAdminTokenExpired,
  getAdminUserInfo,
  formatAdminInitials
};
