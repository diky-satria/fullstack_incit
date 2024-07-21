import Axios from "axios";
import Cookies from "js-cookie";

// HANDLE REDUX
import { authLogout } from "../redux/auth/action";
import toast from "react-hot-toast";
import { getState } from "@/redux/store";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const state: any = getState();
      const user = state.auth;

      try {
        let response = await axios.get(`/api/auth/signout/${user.email}`);

        Cookies.remove("authToken");
        toast.success(response.data.msg, {
          position: "top-left",
        });
      } catch (error: any) {
        toast.error(error.response.data.msg, {
          position: "top-left",
        });
      }

      localStorage.removeItem("persist:root");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axios;
