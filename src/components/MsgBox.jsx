import React, {
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import _ from "lodash";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { auto } from "@popperjs/core";

const styles = (theme) => ({});

const MsgBox = (props) => {
  // console.log(props);
  return (
    <Dialog
      open={props.open}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {props.alertTitle != "" && (
        <DialogTitle id="alert-dialog-slide-title">
          {props.alertTitle}
        </DialogTitle>
      )}

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <div dangerouslySetInnerHTML={{ __html: props.alertBody }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.isAlertConfirm && (
          <Button
            onClick={() => props.alertConfirmBtn()}
            id="confirmMsgBtn"
            color="primary"
            type="buttons"
          >
            {props.alertConfirmTxt}
          </Button>
        )}
        <Button
          onClick={() => props.alertCloseBtn()}
          id="confirmMsgBtn"
          color="primary"
          type="buttons"
        >
          {props.alertCloseTxt}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MsgBox;
