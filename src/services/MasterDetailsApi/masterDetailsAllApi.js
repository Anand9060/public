import api from "../api";

export const fetchRelativeObject = async (data) => {
  const res = await api.post("/mdetailsobjectlist", data);
  return res;
};
