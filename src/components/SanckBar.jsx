import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { snackbarClose } from "../services/hederSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComp = () => {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const openSnack = useSelector(
    (state) => state.progressBarState.snackBarState
  );
  const snackBarMsg = useSelector(
    (state) => state.progressBarState.snackBarMsg
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackbarClose());
  };

  return (
    <div>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {snackBarMsg ? snackBarMsg : "Success !"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComp;
