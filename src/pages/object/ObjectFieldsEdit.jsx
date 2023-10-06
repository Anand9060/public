import React, { useState, useRef, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
// import { updatePool } from "../../services/poolDataSlice";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormControlLabel, Checkbox, MenuItem } from "@mui/material";
import { dataTypeList } from "../../services/objectApi";
import DeleteIcon from "@mui/icons-material/Delete";

// import { renderState } from "../../services/headerSlice";
// import { updatePoolListApi } from "../../services/poolApiCalls";
import { useNavigate } from "react-router-dom";
// import { deletePoolListApi } from "../../services/poolApiCalls";
import { createMessage, isEmpty } from "../../assets/lib/function";
// import { deleteEmployeeListApi } from "../../services/employeeApiCalls";

import { updateObjectFieldList } from "../../services/objectApi";
import {
  renderState,
  setsnackBarMsg,
  snackbarOpen,
} from "../../services/hederSlice";

const ObjectFieldsEdit = (props) => {
  const navigate = useNavigate;
  //   const [age, setAge] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  //   const [description, setdescription] = useState("");
  const [inputUser, setinputUser] = useState("");
  const [inputUserDelete, setInputUserDelete] = useState({
    inputUserErr: "",
    inputUserValid: false,
  });
  const [openO, setOpenO] = useState(true);
  const [state, setState] = useState(props.fieldInfoss);

  //console.log(state);

  // //console.log(props.fieldInfoss);
  const [oldOptionList, setOldOptionList] = useState(props.fieldInfoss.OPTIONS);
  // //console.log(oldOptionList);
  const [newOptionLists, setNewOptionLists] = useState({
    optionName: "",
    optionNameErr: "",
    fieldNameErr: "",
  });
  // //console.log(optionLists);

  const [dataTypeLists, setDataTypeLists] = useState([]);

  // //console.log(state.DATA_TYPE);

  // //console.log(props.fieldInfoss);

  const [dataEnable, setDataEnable] = useState(props.fieldInfoss.LIST_ENABLE);
  const [useEnableList, setUseEnableList] = useState(false);
  //console.log(useEnableList);

  const dispatch = useDispatch();

  const handleCloseBtn = () => {
    setinputUser("");
    props.closeManageCase();
  };
  const handleClick = () => {
    setOpenO(!openO);
  };

  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };
  const showDataTypeList = () => {
    let componenets = [];
    if (dataTypeLists.length > 0) {
      componenets = dataTypeLists.map((element, index) => (
        <MenuItem value={element.DATA_TYPE} key={element.DATA_TYPE_ID}>
          {element.DATA_TYPE}
          {/* {//console.log(element)} */}
        </MenuItem>
      ));
    }
    // //console.log(componenets);
    return componenets;
  };

  const handleCheckChange = (e) => {};

  const handleDropChange = (e) => {
    // let dataTypeLists_1 = dataTypeLists;
    //console.log(e.target.value);

    setState({
      ...state,
      DATA_TYPE: e.target.value,
    });

    dataTypeLists.map((ele, i) => {
      if (ele.DATA_TYPE === e.target.value) {
        setDataEnable(ele.LIST_ENABLE);
      }
    });

    // setDataEnable(dataTypeLists_1[e.target.value].LIST_ENABLE);

    // setState((pre) => {
    //   return { ...pre, DATA_TYPE: e.target.value };
    // });
    // //console.log(dataTypeLists_1[e.target.value].LIST_ENABLE);
  };

  const handleOption = () => {
    //console.log(oldOptionList);
    var valid = true;
    var ErroptionName = "";
    let arr = [];
    arr.push(newOptionLists);
    // //console.log(newOptionLists);

    // oldOptionList.push(newOptionLists.optionName);
    setOldOptionList(arr);
    //console.log(oldOptionList);
  };

  const DataTypeapi = dataTypeList().then((res) => {
    // //console.log(res.data);

    let data = res.data;
    data.map((ele) => {
      if (ele.DATA_TYPE == state.DATA_TYPE) {
        setUseEnableList(ele.LIST_ENABLE);
      }
    });
  });
  //console.log(useEnableList);

  // const handleDeleteOption = (opt) => {
  //   const arr = oldOptionList.filter((e) => e.OPTION_NAME != opt);
  //   //console.log(arr);
  //   setOldOptionList(arr);
  // };

  const handleCheckBox = (e) => {
    setState({
      ...state,
      IS_UNIQUE: e.target.checked,
    });
  };

  const handleSumit = () => {
    var fieldNameErr = "";
    var valid = true;
    const data = {
      OBJ_ID: state.OBJ_ID,
      FIELD_ID: state.FIELD_ID,
      FIELD_NAME: state.FIELD_NAME,
      IS_UNIQUE: state.IS_UNIQUE,
      DATA_TYPE: state.DATA_TYPE,
      OPTIONS: oldOptionList,
    };

    //console.log(data);
    handleBackdropOpen();

    if (isEmpty(state.FIELD_NAME)) {
      fieldNameErr = createMessage(1, "Field Name");
      valid = false;
    }

    if (!valid) {
      setNewOptionLists({
        ...newOptionLists,
        fieldNameErr: fieldNameErr,
      });
    } else {
      updateObjectFieldList(data)
        .then((res) => {
          //console.log(res.data);
          dispatch(snackbarOpen());
          handleBackdropClose();
          dispatch(renderState());
          dispatch(setsnackBarMsg(res.data.message));
          props.closeManageCase();
        })
        .catch((err) => {
          //console.log(err);
          handleBackdropClose();
        });
    }
  };

  useEffect(() => {
    // handleBackdropOpen();

    dataTypeList().then((respons) => {
      setDataTypeLists(respons.data);
      // //console.log(respons.data);
    });

    // dataTypeLists.map((ele) => {
    //   //console.log(ele);
    // });
  }, []);

  return (
    <Dialog
      open={props.open}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      onClose={props.closeManageCase}
    >
      <DialogTitle id="alert-dialog-slide-title">Field Edit</DialogTitle>
      <Divider variant="middle" mt={0} />

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <InputLabel>Field Name</InputLabel>
          <TextField
            size="small"
            required
            fullWidth
            multiline
            defaultValue=""
            id="Object-fieldname-Edit"
            placeholder="Field Name"
            inputProps={{ maxLength: 250 }}
            value={state.FIELD_NAME}
            onChange={(e) => {
              setState((pre) => {
                return { ...pre, FIELD_NAME: e.target.value };
              });
            }}
          />

          <Grid container={2}>
            <Grid item={6}>
              <InputLabel>Data Type</InputLabel>
              <TextField
                // id="outlined-select-currency"
                select
                margin="normal"
                // required
                size="normal"
                sx={{
                  width: { sm: 200, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                // name="FiledTypes"
                value={state.DATA_TYPE}
                // defaultValue="Number"
                onChange={(e) => handleDropChange(e)}

                // onChange={(e) => {
                //   setState((pre) => {
                //     return { ...pre, DATA_TYPE: e.target.value };
                //   });
                // }}
              >
                {showDataTypeList()}

                {/* {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
            <Grid item={6}>
              <FormControlLabel
                sx={{ marginTop: "1.5rem", marginLeft: "2rem" }}
                display="flex"
                textAlign="end"
                justifyContent="space-around"
                fullWidth
                control={
                  <Checkbox
                    checked={state.IS_UNIQUE}
                    onChange={(e) => {
                      handleCheckBox(e);
                    }}
                  />
                }
                label="is Unique"
              />
            </Grid>
          </Grid>

          {useEnableList || dataEnable == true ? (
            <>
              {/* <Grid
                container={2}
                // sx={{ border: "1px solid red" }}
                display="flex"
                textAlign="start"
                justifyContent="space-between"
              >
                <Grid
                  item={10}

                  // sx={{ border: "1px solid red" }}
                >
                  <TextField
                    size="small"
                    required
                    multiline
                    defaultValue=""
                    inputProps={{ maxLength: 250 }}
                    id="filled-multiline-staticw"
                    placeholder="Field Name"
                    value={newOptionLists.optionName}
                    onChange={(e) => {
                      setNewOptionLists({
                        ...newOptionLists,
                        optionName: e.target.value,
                      });
                    }}
                    helperText={
                      newOptionLists.optionNameErr != ""
                        ? newOptionLists.optionNameErr
                        : ""
                    }
                  />
                </Grid>
                <Grid item={2}>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "3rem", marginTop: "0.2rem" }}
                    onClick={handleOption}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid> */}

              <Grid item={12}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <FeaturedPlayListOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="List" />
                    {openO ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openO} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {oldOptionList &&
                        oldOptionList.map((object, index) => {
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
            </>
          ) : (
            ""
          )}
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
          <Button color="primary" onClick={() => handleCloseBtn()}>
            Close
          </Button>
          <Button color="primary" onClick={() => handleSumit()}>
            Update
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

export default ObjectFieldsEdit;
