import axios from 'axios';

const API_URL = import.meta.env.VITE_API_DOMAIN + "/api/admin/dashboard";

export const getKycOverview = async (days = 15) => {
  try {
    const response = await axios.get(`${API_URL}/kyc-overview?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching KYC overview:', error);
    throw error;
  }
};

export const getDataSources = async (days = 15) => {
  try {
    const response = await axios.get(`${API_URL}/data-sources?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data sources:', error);
    throw error;
  }
};

export const getUserActivity = async (days = 15) => {
  try {
    const response = await axios.get(`${API_URL}/user-activity?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};

export const getUrgentTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/urgent-tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching urgent tasks:', error);
    throw error;
  }
};

export const getKycActivities = async (page = 1, limit = 10, status = 'all') => {
  try {
    const response = await axios.get(`${API_URL}/kyc-activities?page=${page}&limit=${limit}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching KYC activities:', error);
    throw error;
  }
}; 