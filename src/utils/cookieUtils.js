/**
 * Cookie utility functions for handling authentication cookies
 */

/**
 * Set a cookie with the given name, value, and options
 * 
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {Object} options - Cookie options
 * @param {number} options.days - Number of days until the cookie expires
 * @param {string} options.path - Cookie path (defaults to '/')
 * @param {boolean} options.secure - Whether the cookie should only be transmitted over HTTPS
 * @param {boolean} options.sameSite - SameSite attribute (Strict, Lax, None)
 */
export const setCookie = (name, value, options = {}) => {
  const { days = 1, path = '/', secure = true, sameSite = 'Strict' } = options;
  
  // Calculate expiration date
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  // Build cookie string
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookieString += `; expires=${expires.toUTCString()}`;
  cookieString += `; path=${path}`;
  
  if (secure) {
    cookieString += '; secure';
  }
  
  if (sameSite) {
    cookieString += `; samesite=${sameSite}`;
  }
  
  // Set the cookie
  document.cookie = cookieString;
};

/**
 * Get the value of a cookie by name
 * 
 * @param {string} name - The name of the cookie to get
 * @returns {string|null} - The cookie value or null if not found
 */
export const getCookie = (name) => {
  const nameString = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    
    if (cookie.indexOf(nameString) === 0) {
      return decodeURIComponent(cookie.substring(nameString.length));
    }
  }
  
  return null;
};

/**
 * Remove a cookie by setting its expiration date to the past
 * 
 * @param {string} name - The name of the cookie to remove
 * @param {string} path - The path of the cookie (must match the path used when setting)
 */
export const removeCookie = (name, path = '/') => {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
};

export default {
  setCookie,
  getCookie,
  removeCookie
};
