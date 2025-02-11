import axios from "axios";
import { BASE_URL } from "@/constant/environment";
import { message } from "antd";
import { PATHS } from "@/constant/path";
import { store } from "@/redux/store";
import { logout, setToken } from "@/redux/authenSlice";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});
axiosInstance.interceptors.request.use(
  // config request before sent to sever
  (config) => {
    const token = store.getState().authen.token;
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho phép can thiệp vào quá trình nhận phản hồi (RESPONSE) từ server.
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    // Nếu mã lỗi 403 hoặc 401 và request không chứa key _retry
    if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi API để cập nhật token mới
        const res = await axiosInstance.get("/api/refreshToken");
        if (res?.EC === 0) {
          let newToken = res?.DT;
          store.dispatch(setToken(newToken));
          // Thay đổi token trong header của yêu cầu ban đầu
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Gọi lại yêu cầu ban đầu với token mới
          return axiosInstance(originalRequest);
        }
        else {
          store.dispatch(logout());
          window.location.href = PATHS.HOME.LOGIN;
          message.error(res?.EM || "Có lỗi xảy ra");
        }
      } catch (error) {
        store.dispatch(logout());
        window.location.href = PATHS.HOME.LOGIN;
        message.error("Có lỗi xảy ra");
      }
    } else if (error.response?.status === 400) {
      message.error(error.response?.EM || "Có lỗi xảy ra");
    } else {
      console.log("error", error);
      // Nếu lỗi không phải 403 hoặc 401, trả về lỗi ban đầu
      return Promise.reject(error);
    }

  }
);
export default axiosInstance;
