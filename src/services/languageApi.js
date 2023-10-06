import api from "./api";

export const fetchLanguageApi = async (data) => {
  const res = await api.post("/languagelist", data);
  return res;
};
export const fetchIconApi = async () => {
  const res = await api.get("/iconlist");
  return res;
};
