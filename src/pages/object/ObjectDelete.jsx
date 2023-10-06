import React, { useState, useRef, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
// import { updatePool } from "../../services/poolDataSlice";
import { useDispatch, useSelector } from "react-redux";
import labels from "../../assets/data/label.json";
import {
  renderState,
  snackbarOpen,
  setsnackBarMsg,
} from "../../services/hederSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
// import { renderState } from "../../services/headerSlice";
// import { updatePoolListApi } from "../../services/poolApiCalls";
import { useNavigate } from "react-router-dom";
// import { deletePoolListApi } from "../../services/poolApiCalls";
import { createMessage, isEmpty } from "../../assets/lib/function";
// import { deleteEmployeeListApi } from "../../services/employeeApiCalls";
import { deleteObjectApi, fetchObjectList } from "../../services/objectApi";

const ObjectDelete = (props) => {
  const datalabels = labels.Labels;
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const Objects = props.objects;
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };

  //   const [age, setAge] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  //   const [description, setdescription] = useState("");

  const [state, setstate] = useState({
    inputUser: "",
    inputUserErr: "",
  });
  const [navi, setnavi] = useState(navigate("/create_object"));
  // console.log(Objects);
  //   const poolDesc = useRef(null);

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  const handleCloseBtn = () => {
    setinputUser("");
    props.closeManageCase();
  };

  const handleChangeUserInput = (event) => {
    setstate({
      ...state,
      inputUser: event.target.value,
    });
  };
  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  const handleSubmit = (id) => {
    let inputUserErr = "";
    let valid = true;
    handleBackdropOpen();
    const data = {
      OBJ_ID: id,
      DELETETEXT: state.inputUser,
    };

    if (isEmpty(state.inputUser)) {
      inputUserErr = createMessage(1, "Input Field");
      valid = false;
    }

    if (!valid) {
      setstate({
        ...state,
        inputUserErr: inputUserErr,
      });
      handleBackdropClose();
    } else {
      deleteObjectApi(data)
        .then((res) => {
          dispatch(snackbarOpen());
          handleBackdropClose();
          dispatch(renderState());
          dispatch(setsnackBarMsg(res.data.message));
          props.backToObjCreate();
          props.closeManageCase();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setstate({
            ...state,
            inputUserErr: err.response.data.message,
          });
          handleBackdropClose();
        });

      // .then(() => {
      //   fetchObjectList()
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // });
    }
  };

  const roleTypeField = (
    <Grid container>
      <Grid item xs={12}>
        <InputLabel>{funlabel("objectName")}</InputLabel>
        <Typography size="small" sx={{ mb: 2 }}>
          {Objects.OBJ_NAME}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={props.open}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      onClose={props.closeManageCase}
    >
      <DialogTitle id="alert-dialog-slide-title"> Delete Object</DialogTitle>
      <Divider variant="middle" mt={0} />

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {roleTypeField}
          <InputLabel>{funlabel("permanetlyDeleteText")}</InputLabel>
          <TextField
            size="small"
            required
            fullWidth
            id="userInputId"
            defaultValue=""
            inputProps={{ maxLength: 20 }}
            placeholder="Permanently Delete"
            value={state.inputUser}
            onChange={handleChangeUserInput}
            helperText={state.inputUserErr != "" ? state.inputUserErr : ""}
          />
        </DialogContentText>
      </DialogContent>
      <Divider variant="middle" mt={0} />
      <DialogActions>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button color="primary" onClick={() => props.closeManageCase()}>
            {funlabel("close")}
          </Button>
          <Button color="primary" onClick={() => handleSubmit(Objects.OBJ_ID)}>
            {funlabel("delete")}
          </Button>
        </div>
      </DialogActions>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default ObjectDelete;
