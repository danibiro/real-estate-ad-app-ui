import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/" + import.meta.env.VITE_BASE_URL + "/",
  withCredentials: true,
});

export default axiosInstance;
