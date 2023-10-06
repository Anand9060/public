import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import _ from "lodash";
import { isMobile } from "react-device-detect";
import {
  validateEmail,
  createMessage,
  truncate,
  isEmpty,
} from "../../assets/lib/function";

import MsgBox from "../../components/MsgBox.jsx";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";

import { updateObjectApi, getObjectDetails } from "../../services/objectApi";
import {
  Paper,
  Grid,
  Backdrop,
  CircularProgress,
  Container,
  Typography,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import {
  renderState,
  progressOpen,
  progressClose,
} from "../../services/hederSlice";
import { useDispatch, useSelector } from "react-redux";
var is_mobile = isMobile; //true;

export const EditObjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };

  // funlabel("fieldName");

  const objectId = location.state.object_id;
  //   console.log(objectId);

  const [objectDetails, setObjectDetails] = useState({
    objId: objectId,
    obj_name: "",
  });

  // const labelTextFun = (name) => {
  //   const value = "";
  //   textLabel.map((ele) => {
  //     if (ele.Name == name) {
  //       value = ele.Value;
  //     }
  //   });
  //   return value;
  // };

  // const labelText = textLabel.map((ele) => {
  //   if (ele.Name == "fieldName") {
  //     console.log(ele.Value);
  //     return ele.Value;
  //   }
  // });

  //   console.log("_________________________________");
  //   console.log(objectDetails);

  /** Common State and function for all pages */
  /** Developer only need to append some code in handleAlertClose or handleAlertConfirm function  */

  const [backdrop, setBackdrop] = useState(false);
  const [msgBox, setMsgBox] = useState({
    open: false,
    action: "",
    alertTitle: "",
    alertBody: "",
    isAlertConfirm: false,
    alertConfirmTxt: "Ok",
    alertCloseTxt: "Close",
  });

  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  const handleAlertClose = () => {
    let action = msgBox.action;
    setMsgBox({
      ...msgBox,
      open: false,
      action: "",
      alertTitle: "",
      alertBody: "",
      isAlertConfirm: false,
      alertConfirmTxt: "Ok",
      alertCloseTxt: "Close",
    });

    // Custom action
    if (action == "redirectManageFileds") {
      navigate("/object_fields", {
        state: { object_id: objectDetails.objId },
      });
    }
  };
  const handleAlertOpen = (msgbody) => {
    setMsgBox({
      ...msgBox,
      open: true,
      action: "",
      alertTitle: "",
      alertBody: msgbody,
      isAlertConfirm: false,
      alertConfirmTxt: "Ok",
      alertCloseTxt: "Close",
    });
  };

  const handleAlertConfirm = () => {
    setMsgBox({
      ...msgBox,
      open: false,
      action: "",
      alertTitle: "",
      alertBody: "",
      isAlertConfirm: false,
      alertConfirmTxt: "Ok",
      alertCloseTxt: "Close",
    });
  };
  const msgRef = useRef();
  /******************************** */

  /** Custom State and function for this page */

  const [state, setState] = useState({
    object_id: "",
    objectName: "",
    ErrobjectName: "",
  });

  //   const handleSubmit = () => {
  //     handleBackdropOpen();

  //     if (isEmpty(_.trim(state.objectName))) {
  //       setState({
  //         ...state,
  //         ErrobjectName: createMessage(1, "Object Name"),
  //       });
  //       handleBackdropClose();
  //     } else {
  //       const data = {
  //         OBJ_NAME: _.trim(state.objectName),
  //       };

  //       createObjectApi(data)
  //         .then((res) => {
  //           console.log(res);

  //           // if (res.status === 200) {
  //           handleBackdropClose();

  //           setMsgBox({
  //             ...msgBox,
  //             open: true,
  //             action: "redirectManageFileds",
  //             alertTitle: "",
  //             alertBody: "Object has been created successfully. ",
  //             isAlertConfirm: false,
  //             alertConfirmTxt: "",
  //             alertCloseTxt: "Manage Fields",
  //           });

  //           setState({
  //             ...state,
  //             object_id: res.data.OBJ_ID,
  //           });
  //           // } else {
  //           //   console.log(res.data);
  //           //   setState({
  //           //     ...state,
  //           //     ErrobjectName: res.data.message,
  //           //   });
  //           //   handleBackdropClose();
  //           // }
  //         })
  //         .catch((err) => {
  //           console.log(err.response.data.message);
  //           handleBackdropClose();
  //           handleAlertOpen(err.response.data.message);
  //         });
  //     }
  //   };

  /******************** */
  const handleSubmit = () => {
    let NameErr = "";
    let valid = true;
    const newData = {
      OBJ_ID: objectDetails.objId,
      OBJ_NAME: objectDetails.obj_name,
    };
    console.log(newData);
    handleBackdropOpen();
    if (isEmpty(objectDetails.obj_name)) {
      NameErr = createMessage(1, "Object Name");
      valid = false;
    }

    if (!valid) {
      setState({
        ...state,
        ErrobjectName: NameErr,
      });
      handleBackdropClose();
    } else {
      updateObjectApi(newData)
        .then((res) => {
          handleBackdropClose();
          setMsgBox({
            ...msgBox,
            open: true,
            action: "redirectManageFileds",
            alertTitle: "",
            alertBody: res.data.message,
            isAlertConfirm: false,
            alertConfirmTxt: "",
            alertCloseTxt: "Manage Fields",
          });
        })
        .catch((err) => {
          setState({
            ...state,
            ErrobjectName: err.response.data.message,
          });
          handleBackdropClose();

          console.log(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    dispatch(progressOpen());

    getObjectDetails({
      OBJ_ID: objectId,
    }).then((res) => {
      setObjectDetails({ ...objectDetails, obj_name: res.data.OBJ_NAME });
      dispatch(progressClose());
    });
  }, [objectDetails.objId, objectId, renderState]);
  return (
    <Container maxWidth={"xl"}>
      <Header></Header>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Menu></Menu>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} pt={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  {funlabel("editObject")}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <InputLabel>{funlabel("objectName")}</InputLabel>
                <TextField
                  margin="normal"
                  required
                  id="Edit-Object"
                  inputProps={{ maxLength: 250 }}
                  fullWidth
                  autoFocus
                  size="small"
                  value={objectDetails.obj_name}
                  onChange={(e) =>
                    setObjectDetails({
                      ...objectDetails,
                      obj_name: e.target.value,
                    })
                  }
                  helperText={
                    state.ErrobjectName != "" ? state.ErrobjectName : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  id="editSubmitBtn"
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ mt: 2.8, mb: 2 }}
                  onClick={handleSubmit}
                >
                  {funlabel("objectUpdate")}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {msgBox.open && (
        <MsgBox
          ref={msgRef}
          open={msgBox.open}
          alertTitle={msgBox.alertTitle}
          alertBody={msgBox.alertBody}
          isAlertConfirm={msgBox.isAlertConfirm}
          alertConfirmTxt={msgBox.alertConfirmTxt}
          alertCloseTxt={msgBox.alertCloseTxt}
          alertConfirmBtn={() => handleAlertConfirm()}
          alertCloseBtn={() => handleAlertClose()}
        />
      )}

      <Footer></Footer>
    </Container>
  );
};
