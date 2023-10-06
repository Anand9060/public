import { Link } from "react-router-dom";
import api from "./api";

// export const getsearchResult = async (data) => {
//   console.log("Request --------->", data);
//   let res = null;
//   let colDef = [];
//   res = await api.post("/searchemp", data);
//   console.log("Response --------->", res);

//   if (res && res.data.length !== 0) {
//     colDef = Object.keys(res.data[0]).map((key)=>{
//       return {
//         field:key,
//         headerName: key,
//         flex:1,
//       }
//     });
//   }
//   return { res: res, colDef: colDef };
// };

export const getsearchResult = async (data) => {
  console.log("Request --------->", data);
  // let res = null;
  const res = await api.post("/searchemp", data);
  console.log("Response --------->", res );
  if (res && res.data.length !== 0) {
    return res.data;
  }
  else{
    return [];
  }
}

export const batchDeleteAPI = async (data) => {
  const res = await api.post("/batchdelete", data);
  return res.data;
}

export const batchEditAPI = async (data) => {
  const res = await api.post("/batchedit", data);
  return res.data;
}

export const batchCloneAPI = async (data) => {
  const res = await api.post("/batchclone", data);
  return res.data;
}