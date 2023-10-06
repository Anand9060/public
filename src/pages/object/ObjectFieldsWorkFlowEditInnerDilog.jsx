import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMessage, isEmpty } from "../../assets/lib/function";

const ObjectFieldsWorkFlowEditInnerDilog = (props) => {
  //   console.log(props.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nullValue = "null";

  const [open, setOpen] = useState(true);

  const [backdrop, setBackdrop] = useState(false);

  const handleCloseBtn = () => {
    props.closeManageCase();

    const handleClick = () => {
      setOpen(!open);
    };

    const handleBackdropClose = () => {
      setBackdrop(false);
    };

    const handleBackdropOpen = () => {
      setBackdrop(true);
    };

    return <div>{props.STATE_TYPE_NAME}</div>;
  };
};

export default ObjectFieldsWorkFlowEditInnerDilog;
