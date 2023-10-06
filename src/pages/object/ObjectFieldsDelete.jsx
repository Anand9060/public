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
import labels from "../../assets/data/label.json";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
// import { renderState } from "../../services/headerSlice";
// import { updatePoolListApi } from "../../services/poolApiCalls";

import {
  renderState,
  snackbarOpen,
  setsnackBarMsg,
} from "../../services/hederSlice";
import { useNavigate } from "react-router-dom";
// import { deletePoolListApi } from "../../services/poolApiCalls";
import { createMessage, isEmpty } from "../../assets/lib/function";
// import { deleteEmployeeListApi } from "../../services/employeeApiCalls";
import { fetchObjectFieldDelete } from "../../services/objectApi";

const ObjectFieldsDelete = (props) => {
  const datalabels = labels.Labels;

  const navigate = useNavigate;
  const dispatch = useDispatch();
  const fieldInfosss = props.fieldInfoss;
  // console.log(fieldInfosss);
  // const deleted = "Permanently Delete";
  //   const [age, setAge] = useState("");
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };
  const [backdrop, setBackdrop] = useState(false);
  //   const [description, setdescription] = useState("");

  const [state, setstate] = useState({
    inputUser: "",
    inputUserErr: "",
  });
  // console.log(Objects);
  //   const poolDesc = useRef(null);

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

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
    const data = {
      FIELD_ID: id,
      DELETETEXT: state.inputUser,
    };
    handleBackdropOpen();

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
      fetchObjectFieldDelete(data)
        .then((res) => {
          // if (res.data.message == "Wrong input. Please check...") {
          //   setstate({
          //     ...state,
          //     inputUserErr: res.data.message,
          //   });
          //   handleBackdropClose();
          // } else {
          setstate({
            ...state,
            inputUserErr: res.data.message,
          });
          // props.fieldDeleteId(id);
          dispatch(snackbarOpen());
          handleBackdropClose();
          dispatch(renderState());
          dispatch(setsnackBarMsg(res.data.message));
          props.closeManageCase();
          // }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setstate({
            ...state,
            inputUserErr: err.response.data.message,
          });
          handleBackdropClose();
        });
    }
  };

  const roleTypeField = (
    <Grid container>
      <Grid item xs={12}>
        <InputLabel>{funlabel("fieldName")}</InputLabel>
        <Typography size="small" sx={{ mb: 2 }}>
          {fieldInfosss.FIELD_NAME}
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
      <DialogTitle id="alert-dialog-slide-title">
        {funlabel("deleteField")}
      </DialogTitle>
      <Divider variant="middle" mt={0} />

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {roleTypeField}
          <InputLabel>{funlabel("permanetlyDeleteText")}</InputLabel>
          <TextField
            size="small"
            required
            fullWidth
            inputProps={{ maxLength: 20 }}
            defaultValue=""
            id="object-Fieldname-delete"
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
          <Button
            color="primary"
            onClick={() => handleSubmit(fieldInfosss.FIELD_ID)}
          >
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

export default ObjectFieldsDelete;
