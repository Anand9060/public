// import React, { useState, useRef, useEffect } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { TextField } from "@mui/material";
// import { Backdrop, CircularProgress } from "@mui/material";
// // import { updatePool } from "../../services/poolDataSlice";
// import { useDispatch } from "react-redux";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Divider from "@mui/material/Divider";
// import {
//   renderState,
//   setsnackBarMsg,
//   snackbarOpen,
// } from "../../services/hederSlice";
// import Grid from "@mui/material/Grid";
// // import { renderState } from "../../services/headerSlice";
// // import { updatePoolListApi } from "../../services/poolApiCalls";
// import { useNavigate } from "react-router-dom";
// // import { deletePoolListApi } from "../../services/poolApiCalls";
// import { createMessage } from "../../assets/lib/function";
// // import { deleteEmployeeListApi } from "../../services/employeeApiCalls";

// import { getObjectDetails } from "../../services/objectApi";
// import { isEmpty } from "lodash";
// import { updateObjectApi } from "../../services/objectApi";

// const ObjectEdit = (props) => {
//   const navigate = useNavigate;
//   const dispatch = useDispatch();
//   const objId = props.objectsid;
//   //   const [age, setAge] = useState("");
//   const [backdrop, setBackdrop] = useState(false);
//   //   const [description, setdescription] = useState("");
//   const [stateErr, setStateErr] = useState({
//     NameErr: "",
//   });

//   const [state, setState] = useState(props.objects);

//   const handleCloseBtn = () => {
//     props.closeManageCase();
//   };

//   const handleBackdropClose = () => {
//     setBackdrop(false);
//   };
//   const handleBackdropOpen = () => {
//     setBackdrop(true);
//   };

//   const handleSubmit = () => {
//     let NameErr = "";
//     let valid = true;
//     const newData = {
//       OBJ_ID: state.OBJ_ID,
//       OBJ_NAME: state.OBJ_NAME,
//     };
//     handleBackdropOpen();
//     if (isEmpty(state.OBJ_NAME)) {
//       NameErr = createMessage(1, "Object Name");
//       valid = false;
//     }

//     if (!valid) {
//       setStateErr({
//         ...stateErr,
//         NameErr: NameErr,
//       });
//       handleBackdropClose();
//     } else {
//       updateObjectApi(newData)
//         .then((res) => {
//           if (res.data.message == "Something went wrong. Please check...") {
//             setStateErr({
//               ...stateErr,
//               NameErr: res.data.message,
//             });
//             handleBackdropClose();
//           } else {
//             // setstate({
//             //   ...state,
//             //   inputUserErr: res.data.message,
//             // });

//             dispatch(snackbarOpen());
//             handleBackdropClose();
//             dispatch(renderState());
//             dispatch(setsnackBarMsg(res.data.message));
//             props.closeManageCase();
//           }

//           // console.log(res.data);
//           // dispatch(renderState());

//           // handleBackdropClose();
//           // props.closeManageCase();
//         })
//         .catch((err) => {
//           setStateErr({
//             ...stateErr,
//             NameErr: err.response.data.message,
//           });
//           handleBackdropClose();

//           console.log(err.response.data.message);
//         });
//     }
//   };

//   return (
//     <Dialog
//       open={props.open}
//       keepMounted
//       aria-labelledby="alert-dialog-slide-title"
//       aria-describedby="alert-dialog-slide-description"
//       fullWidth={true}
//       onClose={props.closeManageCase}
//     >
//       <DialogTitle id="alert-dialog-slide-title">Object Edit</DialogTitle>
//       <Divider variant="middle" mt={0} />

//       <DialogContent>
//         <DialogContentText id="alert-dialog-slide-description">
//           <InputLabel>Object Name</InputLabel>
//           <TextField
//             size="small"
//             required
//             fullWidth
//             inputProps={{ maxLength: 250 }}
//             multiline
//             defaultValue=""
//             id="filled-multiline-static"
//             value={state.OBJ_NAME}
//             onChange={(e) =>
//               setState((pre) => {
//                 return { ...pre, OBJ_NAME: e.target.value };
//               })
//             }
//             helperText={stateErr.NameErr != "" ? stateErr.NameErr : ""}
//           />
//         </DialogContentText>
//       </DialogContent>
//       <Divider variant="middle" mt={0} />
//       <DialogActions>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//           }}
//         >
//           <Button color="primary" onClick={() => handleCloseBtn()}>
//             Close
//           </Button>
//           <Button color="primary" onClick={() => handleSubmit()}>
//             Update
//           </Button>
//         </div>
//       </DialogActions>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={backdrop}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Dialog>
//   );
// };

// export default ObjectEdit;
