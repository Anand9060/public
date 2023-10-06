import axios from "axios";
import api from "./api";

export const loginApi = async (data) => {
  const res = await api.post("/alluserdata", data);
  return res;
};

export const logoutApi = async (data) => {
  const res = await api.post(
    "/userlogout",
    data,
    {
      headers: {
        Authorization: `${sessionStorage.getItem("token")}`,
        email: `${sessionStorage.getItem("email")}`,
      },
    }
  );
  return res;
};