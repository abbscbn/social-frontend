import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://backend-social-production.up.railway.app",
});

export default axiosInstance;
