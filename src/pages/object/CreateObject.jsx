import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import _ from "lodash";
import { isMobile } from "react-device-detect";
import {
  validateEmail,
  createMessage,
  truncate,
  isEmpty,
} from "../../assets/lib/function";
import labels from "../../assets/data/label.json";
import MsgBox from "../../components/MsgBox.jsx";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { useSelector } from "react-redux";
import { createObjectApi } from "../../services/objectApi";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";

var is_mobile = isMobile; //true;

export const CreateObject = () => {
  const navigate = useNavigate();
  const datalabels = labels.Labels;
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };

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
        state: { object_id: state.object_id },
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
    workflowEnable: false,
    actionEnable: false,
  });

  const handleSubmit = () => {
    handleBackdropOpen();

    if (isEmpty(_.trim(state.objectName))) {
      setState({
        ...state,
        ErrobjectName: createMessage(1, "Object Name"),
      });
      handleBackdropClose();
    } else {
      const data = {
        OBJ_NAME: _.trim(state.objectName),
        WORKFLOW_ENABLE: state.workflowEnable,
        ACTION_ENABLE: state.actionEnable,
      };

      createObjectApi(data)
        .then((res) => {
          console.log(res);

          // if (res.status === 200) {
          handleBackdropClose();

          setMsgBox({
            ...msgBox,
            open: true,
            action: "redirectManageFileds",
            alertTitle: "",
            alertBody: "Object has been created successfully. ",
            isAlertConfirm: false,
            alertConfirmTxt: "",
            alertCloseTxt: "Manage Fields",
          });

          setState({
            ...state,
            object_id: res.data.OBJ_ID,
          });
          // } else {
          //   console.log(res.data);
          //   setState({
          //     ...state,
          //     ErrobjectName: res.data.message,
          //   });
          //   handleBackdropClose();
          // }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          handleBackdropClose();
          handleAlertOpen(err.response.data.message);
        });
    }
  };

  /******************** */

  return (
    <Container maxWidth={"xl"}>
      <Header></Header>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Menu></Menu>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} pt={10}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  {funlabel("objectCreate")}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>{funlabel("objectName")}</InputLabel>
                <TextField
                  margin="normal"
                  required
                  id="Create-Object"
                  inputProps={{ maxLength: 250 }}
                  fullWidth
                  autoFocus
                  size="small"
                  value={state.objectName}
                  onChange={(e) =>
                    setState({ ...state, objectName: e.target.value })
                  }
                  helperText={
                    state.ErrobjectName != "" ? state.ErrobjectName : ""
                  }
                />
              </Grid>

              <Grid item xs={3}>
                <FormControlLabel
                  sx={{ marginTop: "1rem" }}
                  control={
                    <Checkbox
                      checked={state.workflowEnable}
                      onChange={(e) =>
                        setState({
                          ...state,
                          workflowEnable: e.target.checked,
                        })
                      }
                    />
                  }
                  label={"WORKFLOW_ENABLE"}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  sx={{ marginTop: "1rem" }}
                  control={
                    <Checkbox
                      checked={state.actionEnable}
                      onChange={(e) =>
                        setState({
                          ...state,
                          actionEnable: e.target.checked,
                        })
                      }
                    />
                  }
                  label={"ACTION_ENABLE"}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  id="objectCreate-submit"
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ mt: 2.8, mb: 2 }}
                  onClick={handleSubmit}
                >
                  {funlabel("save")}
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
