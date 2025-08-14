import { axiosInstance } from "./api";

// Dashboard APIs
export const getKycOverview = async (days = 15) =>
  axiosInstance
    .get(`/admin/dashboard/kyc-overview`, { params: { days } })
    .then((res) => res.data);

export const getDataSources = async (days = 15) =>
  axiosInstance
    .get(`/admin/dashboard/data-sources`, { params: { days } })
    .then((res) => res.data);

export const getUserActivity = async (days = 15) =>
  axiosInstance
    .get(`/admin/dashboard/user-activity`, { params: { days } })
    .then((res) => res.data);

export const getUrgentTasks = async () =>
  axiosInstance.get(`/admin/dashboard/urgent-tasks`).then((res) => res.data);

export const getKycActivities = async (page = 1, limit = 10, status = "all") =>
  axiosInstance
    .get(`/admin/dashboard/kyc-activities`, {
      params: { page, limit, status },
    })
    .then((res) => res.data);

export const getStatsOverview = async (days = 7) =>
  axiosInstance
    .get(`/admin/stats/overview`, { params: { days } })
    .then((res) => res.data.data);

export const getStatsKycMetrics = async () =>
  axiosInstance.get(`/admin/stats/kyc-metrics`).then((res) => res.data.data);

export const getStatsCountries = async (days = 7) =>
  axiosInstance
    .get(`/admin/stats/countries`, { params: { days } })
    .then((res) => res.data.data);

export const getStatsIndustries = async (days = 7) =>
  axiosInstance
    .get(`/admin/stats/industries`, { params: { days } })
    .then((res) => res.data.data);

// Request-Packages
export const getListPackages = async (params) =>
  axiosInstance.get(`/request-packages`, { params }).then((res) => res.data);

export const createPackages = async (params) =>
  axiosInstance.post(`/request-packages`, params).then((res) => res.data.data);

export const updatePackage = async (params) =>
  axiosInstance
    .patch(`/request-packages/${params.id}`, params)
    .then((res) => res.data.data);

export const updatePackagePopular = async (params) =>
  axiosInstance
    .patch(`/request-packages/${params.id}/toggle-popular`)
    .then((res) => res.data.data);

export const deletePackage = async (params) =>
  axiosInstance
    .delete(`/request-packages/${params.id}`)
    .then((res) => res.data.data);

// Metadata
export const getListCountries = async () =>
  axiosInstance
    .get(`/api/organization/meta/countries`)
    .then((res) => res.data.data);

export const getListIndustries = async () =>
  axiosInstance
    .get(`/api/organization/meta/industries`)
    .then((res) => res.data.data);

// Organization Management
export const getListOrganizationManagement = async (params) =>
  axiosInstance.get(`/admin/organizations`, { params }).then((res) => res.data);

export const updateOrganization = async (params) =>
  axiosInstance
    .put(`/admin/organizations/${params.id}/status`, params)
    .then((res) => res.data);

// Package Purchases
export const getListPackagePurchasesManagement = async (params) =>
  axiosInstance.get(`/package-purchases`, { params }).then((res) => res.data);
