import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://run.blu2print.site:8082/api",
  withCredentials: true
});

// axiosInstance.interceptors.request.use(
//   (config) => {

//   }
// )

export default axiosInstance;
