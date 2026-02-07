import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("baseURL", baseURL);

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
