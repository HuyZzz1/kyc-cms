export const urlVideo = (name) => {
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN || "http://localhost:4000";
  return `${API_DOMAIN}/api/admin/ekyc/video/${name}`;
}