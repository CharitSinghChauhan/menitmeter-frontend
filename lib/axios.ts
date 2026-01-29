import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PULBIC_BACKEND_URL
    : "http://localhost:8000";

const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Learn : difference betweent the error and log
    console.error(error);
    // Learn : what it will do
    return Promise.reject(error);
  },
);

export default api;
