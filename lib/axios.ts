import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
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


