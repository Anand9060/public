import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import HubIcon from "@mui/icons-material/Hub";
import labels from "../../assets/data/label.json";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
// import { CreateOptionApi } from "../../services/objectApi";
import Icons from "../../components/Icons";

import { Backdrop, CircularProgress, Icon } from "@mui/material";
import {
  validateEmail,
  createMessage,
  truncate,
  isEmpty,
} from "../../assets/lib/function";
import { border } from "@mui/system";

function OptionFields({
  open,
  FiledOptions,
  handleCloseCallBack,
  optionListFun,
  objId,
  fieldId,
}) {
  const [backdrop, setBackdrop] = useState(false);
  const datalabels = labels.Labels;

  const [openO, setOpenO] = useState(true);
  const [optionList, setOptionList] = useState(FiledOptions);
  const ObjId = objId;

  // console.log(fieldList);

  const [state, setState] = useState({
    optionName: "",
    ErrOptionName: "",
  });

  // const [stateErr, setStateErr] = useState({
  //   ErrOptionName: "",
  // });

  const handleClick = () => {
    setOpenO(!openO);
  };

  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  const handleOption = () => {
    var valid = true;
    var ErroptionName = "";

    if (isEmpty(state.optionName)) {
      ErroptionName = createMessage(1, "Option Name");
      valid = false;
    }

    handleBackdropOpen();
    if (!valid) {
      setState({
        ...state,
        ErrOptionName: ErroptionName,
      });
      handleBackdropClose();
    } else {
      // handleBackdropOpen();

      const data = {
        OPTION_NAME: state.optionName,
      };

      if (optionList[0].OPTION_NAME === "") {
        setOptionList([data]);
      } else {
        // optionList.push(data);
        setOptionList([...optionList, data]);
      }

      setState({
        ...state,
        optionName: "",
      });
      handleBackdropClose();

      // console.log(optionList);
    }
  };

  const handleSubmit = () => {
    optionListFun(optionList);
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        // maxWidth={"md"}
        fullWidth={true}
        onClose={false}
        // sx={{ border: "10px solid red" }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {datalabels.fieldOption}
        </DialogTitle>
        {/* <Divider variant="middle" mt={0} /> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {fieldId == "" ? (
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <InputLabel>
                    {datalabels.optionName}
                    <span className="req">*</span>
                  </InputLabel>
                  <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    inputProps={{ maxLength: 250 }}
                    id="OBJECToption"
                    name="object"
                    // autoComplete="location"
                    autoFocus
                    error={state.ErrOptionName.length > 0}
                    value={state.optionName}
                    onChange={(e) => {
                      setState({ ...state, optionName: e.target.value });
                    }}
                    helperText={
                      state.ErrOptionName != "" ? state.ErrOptionName : ""
                    }
                  />
                </Grid>

                <Grid item xs={4}>
                  <Button
                    id="OptionSubmit"
                    variant="contained"
                    sx={{ marginTop: "1.5rem", marginLeft: "2rem" }}
                    onClick={handleOption}
                  >
                    {datalabels.add}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              ""
            )}

            <Grid item={12}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //   <ListSubheader component="div" id="nested-list-subheader">
                //     Option List
                //   </ListSubheader>
                // }
              >
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Icons name={"FeaturedPlayListOutlinedIcon"} />
                  </ListItemIcon>
                  <ListItemText primary={datalabels.optionList} />
                  {/* {openO ? <ExpandLess /> : <ExpandMore />} */}
                  {openO ? (
                    <Icons name={"ExpandLess"} />
                  ) : (
                    <Icons name={"ExpandMore"} />
                  )}
                </ListItemButton>
                <Collapse in={openO} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {optionList.map((object, index) => {
                      return object.OPTION_NAME != "" ? (
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>{index + 1}</ListItemIcon>

                          <ListItemText primary={object.OPTION_NAME} />
                        </ListItemButton>
                      ) : (
                        ""
                      );
                    })}
                  </List>
                </Collapse>
              </List>
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <Divider variant="middle" mt={0} /> */}
        <DialogActions>
          <Button color="primary" onClick={handleSubmit}>
            {datalabels.save}
          </Button>
          <Button onClick={() => handleCloseCallBack()} color="primary">
            {datalabels.close}
          </Button>
        </DialogActions>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </>
  );
}

export default OptionFields;
