import api from "./api";

export const fetchSubmitLayout = async (data) => {
  console.log(data);
  const res = await api.post("/savelayout", data);
  console.log(res.data);
  return res;
};

export const fetchLayoutList = async (data) => {
  console.log(data);
  const res = await api.post("/layoutlist", data);
  console.log(res);
  return res.data;
};

export const fetchLayoutJSON = async (data) => {
  const res = await api.post("/getlayout", data);
  return res;
};

export const deleteLayout = async (data) => {
  const res = await api.post("/layoutdelete", data);
  return res;
};

export const layoutFieldDelete = async (data) => {
  const res = await api.post("/layoutfielddelete", data);
  return res;
};

export const deleteSectionLayout = async (data) => {
  const res = await api.post("/deletesection", data);
  return res;
};

export const saveFromDataApi = async (data) => {
  const res = await api.post("/formsave", data);
  return res;
};

export const fetchUpdateLayout = async (data) => {
  const res = await api.post("/layoutupdate", data);
  return res;
};

export const fetchFormData = async (data) => {
  const res = await api.post("/getformdetails", data);
  return res.data;
};
export const editFromData = async (data) => {
  const res = await api.post("/formedit", data);
  return res.data;
};

export const fetchTableHeaders = async (data) => {
  const res = await api.post("/getfield", data);
  console.log(res.data);
  const headers = res.data.filter((ele) => {
    return ele.field !== "ID";
  });
  console.log(headers);
  return headers;
};

export const getLookUpOptionList = async (data) => {
  const res = await api.post("/dlockupdatatype", data);
  return res;
};
export const fecthActionNameList = async (data) => {
  const res = await api.post("/statetransition", data);
  return res;
};
