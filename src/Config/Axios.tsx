import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://backend-social-production.up.railway.app",
});

export default axiosInstance;
