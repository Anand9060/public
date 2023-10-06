import api from "./api";

export const fetchObjectList = async () => {
  const res = api.post("/objectlist");
  return res;
};

export const createObjectApi = async (data) => {
  const res = await api.post("/objectcreate", data);
  return res;
};
export const deleteObjectApi = async (data) => {
  const res = await api.post("/objectdelete", data);
  return res;
};
export const updateObjectApi = async (data) => {
  const res = await api.post("/objectupdate", data);
  return res;
};

export const createObjectFieldApi = async (data) => {
  const res = await api.post("/fieldcreate", data);
  return res;
};
export const fetchObjectFieldList = async (data) => {
  const res = api.post("/fieldlist", data);

  return res;
};
export const updateObjectFieldList = async (data) => {
  console.log("The data ", data);
  const res = api.post("/fieldupdate", data);
  return res;
};
export const fetchObjectFieldDelete = async (data) => {
  const res = api.post("/fielddelete", data);
  return res;
};

export const getObjectDetails = async (data) => {
  const res = api.post("/objectdetails", data);
  return res;
};
// export const CreateOptionApi = async (data) => {
//   const res = api.post("/optioncreate", data);
//   return res;
// };

export const dataTypeList = async () => {
  const res = api.post("/datatypelist");
  return res;
};

export const getLookupObjectList = async (data) => {
  const res = api.post("/lookupobjectlist", data);
  return res;
};

export const getLookUpOptionList = async (data) => {
  const res = api.post("/dlockupdatatype", data);
  return res;
};

export const fatchValidationRule = async () => {
  const res = api.post("/validationrule");
  return res;
};
export const fatchWorkflowUpdateList = async (data) => {
  const res = await api.post("/getstateandaction", data);
  return res;
};
export const submitWorkflowOptionList = async (data) => {
  const res = api.post("/stateandactionadded", data);
  return res;
};
export const updateWorkflowOptionList = async (data) => {
  const res = api.post("/stateupdate", data);
  return res;
};
export const fetchObjectActionList = async (data) => {
  const res = api.post("/actionobjectlist", data);
  return res;
};
export const fetchObjectActionFieldDataList = async (data) => {
  const res = api.post("/actionobjectfieldvalue", data);
  return res;
};

export const getRuleList = async () => {
  const res = await api.post("/validationtrulelist");
  return res.data;
};

export const saveRule = async (data) => {
  const res = await api.post("/saverule", data);
  return res.data;
};

export const deleteRule = async (data) => {
  const res = await api.post("/deleterule", data);
  return res.data;
};

export const getRules = async (data) => {
  const res = await api.post("/getrule", data);
  return res.data;
};
export const fetchMappingObject= async (data) => {
  const res = await api.post("/mappingobjectlist", data);
  return res.data;
};
export const fetchMappingObjectField = async (data) => {
  const res = await api.post("/mappingfieldlist", data);
  return res.data;
};
