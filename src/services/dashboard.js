import axios from "axios";
import { getAdminToken } from "@/utils/authUtils";

const API_URL = import.meta.env.VITE_API_DOMAIN + "/api";

const getAuthHeaders = () => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getKycOverview = async (days = 15) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/kyc-overview?days=${days}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching KYC overview:", error);
    throw error;
  }
};

export const getDataSources = async (days = 15) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/data-sources?days=${days}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data sources:", error);
    throw error;
  }
};

export const getUserActivity = async (days = 15) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/user-activity?days=${days}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

export const getUrgentTasks = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/urgent-tasks`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching urgent tasks:", error);
    throw error;
  }
};

export const getKycActivities = async (
  page = 1,
  limit = 10,
  status = "all"
) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/kyc-activities?page=${page}&limit=${limit}&status=${status}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching KYC activities:", error);
    throw error;
  }
};

export const getStatsOverview = async (days = 7) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/stats/overview?days=${days}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

export const getStatsKycMetrics = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats/kyc-metrics`, {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

export const getStatsCountries = async (days = 7) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/stats/countries?days=${days}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

export const getStatsIndustries = async (days = 7) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/stats/industries?days=${days}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

//Request-Packages

export const getListPackages = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/request-packages`, {
      headers: getAuthHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching request packages:", error);
    throw error;
  }
};

export const createPackages = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/request-packages`, params, {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating request package:", error);
    throw error;
  }
};

export const updatePackage = async (params) => {
  try {
    const response = await axios.patch(
      `${API_URL}/request-packages/${params.id}`,
      params,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
};

export const updatePackagePopular = async (params) => {
  try {
    const response = await axios.patch(
      `${API_URL}/request-packages/${params.id}/toggle-popular`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating request package:", error);
    throw error;
  }
};

export const deletePackage = async (params) => {
  try {
    const response = await axios.delete(
      `${API_URL}/request-packages/${params.id}`,

      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating request package:", error);
    throw error;
  }
};
