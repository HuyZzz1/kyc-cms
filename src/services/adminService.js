import axios from "axios";
import { getOrganizationToken } from "@/utils/authUtils";

// Get base URL from environment variable or use default
const BASE_URL = import.meta.env.VITE_API_DOMAIN || "http://localhost:4000";

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: BASE_URL + '/api/organization',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Add request interceptor to add auth token to requests
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add token to all admin API requests
    const token = getOrganizationToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Setting auth token for request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Admin Service for handling admin-related API calls
 */
class AdminService {
  /**
   * Login admin user
   * @param {LoginDto} loginDto - Login credentials
   * @returns {Promise} - Response with token and user info
   */
  async login(loginDto) {
    try {
      const response = await apiClient.post('/login', loginDto);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Get admin profile information
   * @returns {Promise} - Response with admin profile data
   */
  async getProfile() {
    try {
      const token = getOrganizationToken();
      if (!token) {
        throw new Error("No organization token found");
      }

      const response = await apiClient.get('/profile');
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Get eKYC list with pagination
   * @param {Object} params - Pagination parameters (page, limit)
   * @returns {Promise} - API response with list of eKYC records and pagination info
   */
  async getEkycList (params) {
    try {
      const response = await apiClient.get('/ekyc/list', { params });
      return response.data;
    } catch (error) {
      console.error("eKYC list error:", error);
      throw error;
    }
  }
  
  /**
   * Get eKYC detail by ID
   * @param {string} id - eKYC record ID
   * @returns {Promise} - API response with eKYC record details
   */
  async getEkycDetail (id) {
    try {
      const response = await apiClient.get(`/ekyc/details/${id}`);
      return response.data;
    } catch (error) {
      console.error(`eKYC detail error for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Update eKYC verification status (for admin)
   * @param {string} id - eKYC record ID
   * @param {Object} updateData - Data to update (isAdminVerified, adminVerifiedBy)
   * @returns {Promise} - API response with updated record
   */
  async updateEkycStatus (id, updateData) {
    try {
      const response = await apiClient.put(`/ekyc/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`eKYC status update error for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Admin verify document by ID
   * @param {string} documentId - The document ID to be approved by admin
   * @param {Object} adminData - Admin information (name, etc.)
   * @returns {Promise} - API response with verification result
   */
  async adminVerifyDocument (documentId, adminData) {
    try {
      const response = await apiClient.put(`/ekyc/admin-verify/${documentId}`, adminData);
      return response.data;
    } catch (error) {
      console.error(`Admin verification error for document ID ${documentId}:`, error);
      throw error;
    }
  }
  
  /**
   * Download document image
   * @param {string} imagePath - Path to the image file
   * @returns {Promise} - API response with image data
   */
  async downloadFileMedia (imagePath) {
    try {
      const response = await apiClient.get('/ekyc/download-file', {
        params: { filename: imagePath },
        responseType: 'blob', // Important for handling binary data
      });
      return response;
    } catch (error) {
      console.error(`Image download error for path ${imagePath}:`, error);
      throw error;
    }
  }

  /**
   * Handle API errors with appropriate messages
   * @param {Error} error - The error object from axios
   * @returns {Error} - Processed error with clear message
   */
  handleApiError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = 
        error.response.data?.message || 
        error.response.data?.error || 
        "An error occurred with the API request";
      
      const customError = new Error(errorMessage);
      customError.status = error.response.status;
      customError.data = error.response.data;
      return customError;
    } else if (error.request) {
      // The request was made but no response was received
      return new Error("No response from server. Please check your internet connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      return error;
    }
  }
}

const adminService = new AdminService();
export default adminService;

/**
 * Register a new organization
 * @param {Object} data - Registration data { name, email, password }
 * @returns {Promise} - API response
 */
export async function registerOrganization(data) {
  try {
    const response = await axios.post(
      BASE_URL + "/api/organization/register",
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Registration failed");
    }
    throw error;
  }
}
