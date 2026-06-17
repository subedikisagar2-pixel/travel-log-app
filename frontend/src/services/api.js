import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getLogs = (params) => api.get("/logs", { params });
export const toggleLike = (logId) => api.post(`/logs/${logId}/like`);

export default api;
