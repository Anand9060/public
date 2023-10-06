import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
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
import Icons from "../../components/Icons";
import {
  fatchWorkflowUpdateList,
  fetchObjectActionFieldDataList,
  fetchObjectActionList,
  submitWorkflowOptionList,
  updateWorkflowOptionList,
} from "../../services/objectApi";
import ObjectFieldsWorkFlowEditInnerDilog from "./ObjectFieldsWorkFlowEditInnerDilog";

const ObjectFieldsWorkFlowEdit = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const fakeObjArr = [
  //   {
  //     OBJ_ID: "JDOAKJFOA",
  //     OBJ_NAME: "ABC",
  //   },
  //   {
  //     OBJ_ID: "EWRW",
  //     OBJ_NAME: "ACFTION",
  //   },
  //   {
  //     OBJ_ID: "DFIJAFJIAO",
  //     OBJ_NAME: "FAKE",
  //   },
  // ];

  const fakeObjDataArr = {
    OBJ_ID: "EWRW",
    VALUE: ["AP", "PE", "QP", "DP"],
  };

  const nullValue = "null";

  const [open, setOpen] = useState(true);
  const [optionNameList, setOptionNameList] = useState([]);
  const [errState, setErrState] = useState("");
  const [backdrop, setBackdrop] = useState(false);

  const [optionLists, setOptionLists] = useState([]);
  const [editButtonClick, setEditButtonClick] = useState(false);

  const [workflowOption, setWorkflowOption] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [objectActionList, setObjectActionList] = React.useState([]);
  const [objectActionFieldValueList, setObjectActionFieldValueList] = useState(
    []
  );

  const [innerDialogOpen, setInnerDialogOpen] = useState({
    open: false,
  });

  const handleCloseInnerDialog = () => {
    setInnerDialogOpen({
      ...innerDialogOpen,
      open: false,
    });
  };

  const handleOpenInnerDialog = (value) => {
    console.log(value, "ooooooooooo");
    setInnerDialogOpen({
      ...innerDialogOpen,
      open: true,
      value: value,
    });
  };

  const handleCloseBtn = () => {
    props.closeManageCase();
    setOptionLists([]);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleBackdropClose = () => {
    setBackdrop(false);
  };

  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  const handleOptionChange = (e) => {
    setWorkflowOption(e.target.value);
  };

  // const InsertObjectValueInActionValueFunction = (id, value) => {
  //   //console.log(id, value);

  //   // Find the selected option from optionNameList
  //   const selectedOption = optionNameList.find(
  //     (ele) => ele.STATE_TYPE_NAME === value
  //   );
  //   //console.log(selectedOption, "---->");

  //   if (selectedOption) {
  //     const updatedOptionLists = optionLists.map((eles) =>
  //       eles.OPTION_ID === id
  //         ? {
  //             ...eles,
  //             ACTION_VALUE: selectedOption.DATA.ACTION_OBJ_FIELD_VALUE,
  //           }
  //         : eles
  //     );

  //     //console.log(updatedOptionLists, "--------->update");
  //     setOptionLists(updatedOptionLists); // Update the state with the modified array
  //   }
  // };

  const handleSourceChange = (id) => (e, value) => {
    const selectedOption = optionNameList.find(
      (ele) => ele.STATE_TYPE_NAME === value
    );
    if (selectedOption) {
      const updatedOptionLists = optionLists.map((ele) =>
        ele.OPTION_ID === id
          ? {
              ...ele,
              SOURCE_NAME: value,
              ACTION_VALUE: selectedOption.DATA.ACTION_OBJ_FIELD_VALUE,
            }
          : ele
      );
      setOptionLists(updatedOptionLists);
    }

    // InsertObjectValueInActionValueFunction(id, value); // Pass 'value' as an argument
  };

  //console.log(optionLists, "----------->");
  const objectActionValueFunction = async (id) => {
    //console.log(id, "===========> ");

    try {
      const res = await fetchObjectActionFieldDataList({ OBJ_ID: id });
      //console.log(res.data);
      setObjectActionFieldValueList(res.data);
    } catch {
      //console.log("eerrr");
    }
  };

  const handleActionValueChange = (id) => (e, value) => {
    optionNameList.map((ele) => {
      if (ele.STATE_TYPE_ID === id) {
        ele.DATA.ACTION_OBJ_FIELD_VALUE = value;
        // //console.log(ele.DATA.ACTION_OBJ_FIELD_VALUE);
      }
    });
  };

  const handleActionObjNameChange = (id) => (e, value) => {
    // //console.log(value);
    let objid = "";

    objectActionList?.map((ele) => {
      if (ele.OBJ_NAME === value) {
        objectActionValueFunction(ele.OBJ_ID);
        objid = ele.OBJ_ID;
      }
    });
    optionNameList.map((ele) => {
      //console.log(ele);
      if (ele.STATE_TYPE_ID === id) {
        ele.DATA.ACTION_OBJ_NAME = value;
        ele.DATA.ACTION_OBJ_ID = objid;

        // //console.log(ele.DATA. ACTION_OBJ_NAME);
      }
    });
  };

  const handleTargetChange = (id) => (e, value) => {
    const updatedOptionLists = optionLists.map((ele) =>
      ele.OPTION_ID === id ? { ...ele, TARGET_NAME: value } : ele
    );
    setOptionLists(updatedOptionLists);
  };

  const handleSTEP_NAMEChange = (id) => (e) => {
    const updatedOptionLists = optionLists.map((ele) =>
      ele.OPTION_ID === id ? { ...ele, STEP_NAME: e.target.value } : ele
    );
    setOptionLists(updatedOptionLists);
  };

  const handleAddOption = () => {
    let NameErr = "";
    let valid = true;

    if (isEmpty(workflowOption)) {
      NameErr = createMessage(1, "Option Name");
      valid = false;
    }

    if (!valid) {
      setErrState(NameErr);
    } else {
      if (editIndex === -1) {
        let workflownameObj = {
          STATE_TYPE_ID: new Date().getTime(),
          STATE_TYPE_NAME: workflowOption,
          DATA: {
            ACTION_OBJ_ID: "",
            ACTION_OBJ_NAME: "",
            ACTION_OBJ_FIELD_VALUE: [],
          },
        };

        optionNameList.push(workflownameObj);
        setWorkflowOption("");
        setErrState("");
      } else {
        optionNameList.forEach((ele) => {
          if (ele.STATE_TYPE_ID === editIndex) {
            ele.STATE_TYPE_NAME = workflowOption;
          }
        });

        setEditIndex(-1);
        setWorkflowOption("");
        setEditButtonClick(false);
        setErrState("");
      }
    }
  };

  const handleOptionEdit = (id) => {
    optionNameList.forEach((ele) => {
      if (ele.STATE_TYPE_ID === id) {
        setWorkflowOption(ele.STATE_TYPE_NAME);
        setEditIndex(id);
        setEditButtonClick(true);
      }
    });
  };

  const handleOptionDelete = (id) => {
    const newArr = optionNameList.filter((ele) => ele.STATE_TYPE_ID !== id);
    setOptionNameList(newArr);
  };

  const DeleteRowField = (id) => {
    const newArr = optionLists.filter((ele) => ele.OPTION_ID !== id);
    setOptionLists(newArr);
  };

  const handleAddRow = () => {
    const data = {
      OPTION_ID: new Date().getTime(),
      STEP_NAME: "",
      SOURCE_NAME: "",
      TARGET_NAME: "",
      ACTION_VALUE: [],
    };

    if (optionLists[0] === "") {
      setOptionLists([data]);
    } else {
      setOptionLists([...optionLists, data]);
    }

    setWorkflowOption("");
  };
  // //console.log(optionLists, "lllllllllllllllllllllllllllll");
  const handleSubmit = () => {
    handleBackdropOpen();
    let data = props.value;
    data.OBJ_ID = props.objectId;
    data.OPTION_NAME_LIST = optionNameList;
    data.STATE_WORKFLOW_LIST = optionLists;
    //console.log(data);

    if (optionLists[0].ACTION_MASTER_ID) {
      updateWorkflowOptionList(data)
        .then((res) => {
          //console.log(res.data);
          handleBackdropClose();
          handleCloseBtn();
        })
        .catch((err) => {
          //console.log(err);
          handleBackdropClose();
        });
    } else {
      submitWorkflowOptionList(data)
        .then((res) => {
          //console.log(res.data);
          handleBackdropClose();
          handleCloseBtn();
        })
        .catch((err) => {
          //console.log(err);
          handleBackdropClose();
        });
    }
  };

  const data = {
    STATE_TYPE_ID: new Date().getTime(),
    STATE_TYPE_NAME: "null",
    DATA: {
      ACTION_OBJ_ID: "",
      ACTION_OBJ_NAME: "",
      ACTION_OBJ_FIELD_VALUE: [],
    },
  };

  useEffect(() => {
    fatchWorkflowUpdateList({ OBJ_ID: props.objectId })
      .then((response) => {
        let Object = response.data;
        setOptionNameList(Object.OPTION_NAME_LIST);
        console.log(Object.STATE_WORKFLOW_LIST, "---------->");
        setOptionLists(Object.STATE_WORKFLOW_LIST);
      })
      .catch((err) => {
        //console.log(err);
      });

    if (optionNameList.length <= 0) {
      optionNameList.push(data);
    }
  }, [props.objectId]);

  useEffect(() => {
    fetchObjectActionList({ OBJ_ID: props.objectId })
      .then((res) => {
        //console.log(res.data);
        setObjectActionList(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(optionNameList);
  }, [optionNameList]);

  if (isEmpty(optionNameList)) {
    setOptionNameList([data]);
  }

  return (
    <div style={{ width: "200%", border: "3px solid red" }}>
      <Dialog
        open={props.open}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"lg"}
        onClose={props.closeManageCase}
      >
        <DialogTitle id="alert-dialog-slide-title">WorkFlow</DialogTitle>
        <Divider variant="middle" mt={0} />

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Grid item xs={6}>
                  <InputLabel>State Name</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    id="Create-Object"
                    inputProps={{ maxLength: 250 }}
                    fullWidth
                    autoFocus
                    value={workflowOption}
                    name="workflowOption"
                    size="small"
                    onChange={handleOptionChange}
                    helperText={errState !== "" ? errState : ""}
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    mt: "0.9rem",
                  }}
                >
                  <Button onClick={handleAddOption} variant="contained">
                    {editButtonClick ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <List>
                  <ListItemButton>
                    <ListItemText primary={"State List"} />
                    {open ? (
                      <IconButton onClick={handleClick}>
                        <Icons name={"ExpandLess"} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleClick}>
                        <Icons name={"ExpandMore"} />
                      </IconButton>
                    )}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {optionNameList?.map((object, index) => (
                        <ListItemButton sx={{ pl: 4 }} key={index}>
                          <ListItemIcon>
                            <Icons name={"HubIcon"} />
                          </ListItemIcon>
                          <ListItemText primary={object.STATE_TYPE_NAME} />

                          <Button
                            id={`State-action~`}
                            variant="contained"
                            size="small"
                            disabled={object.STATE_TYPE_NAME === "null"}
                            onClick={() => handleOpenInnerDialog(object)}
                            style={{ fontSize: 10 }}
                          >
                            Action
                          </Button>
                          <IconButton
                            id={`object-FaEdit~`}
                            disabled={object.STATE_TYPE_NAME === "null"}
                            onClick={() =>
                              handleOptionEdit(object.STATE_TYPE_ID)
                            }
                            style={{ fontSize: 20 }}
                          >
                            <Icons name={"FaEdit"} />
                          </IconButton>

                          <IconButton
                            id={"object-FaTrash~"}
                            disabled={object.STATE_TYPE_NAME === "null"}
                            onClick={() =>
                              handleOptionDelete(object.STATE_TYPE_ID)
                            }
                            style={{ marginLeft: "0.5rem", fontSize: 20 }}
                          >
                            <Icons name={"FaTrash"} />
                          </IconButton>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </Grid>

              {innerDialogOpen.open && (
                <div style={{ backgroundColor: "#eee", width: "100%" }}>
                  <Grid item xs={12}>
                    <Typography>
                      State Name: {innerDialogOpen.value.STATE_TYPE_NAME}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    fullWidth
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      margin: "1rem",
                    }}
                  >
                    <div>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={objectActionList?.map((name) => name.OBJ_NAME)}
                        sx={{ width: 230 }}
                        // getOptionDisabled={(option) => option === nullValue}
                        onChange={handleActionObjNameChange(
                          innerDialogOpen.value.STATE_TYPE_ID
                        )}
                        // value={object.TARGET_NAME || null}
                        renderInput={(params) => (
                          <TextField {...params} label="Action Object" />
                        )}
                      />
                    </div>
                    <div>
                      <Autocomplete
                        disablePortal
                        multiple
                        id="combo-box-demo"
                        options={objectActionFieldValueList?.map(
                          (name) => name
                        )}
                        sx={{ width: 230 }}
                        // getOptionDisabled={(option) => option === nullValue}
                        onChange={handleActionValueChange(
                          innerDialogOpen.value.STATE_TYPE_ID
                        )}
                        // value={object.TARGET_NAME || null}
                        renderInput={(params) => (
                          <TextField {...params} label="Object Value" />
                        )}
                      />
                    </div>

                    <Button
                      onClick={() => {
                        //console.log(optionNameList);
                        handleCloseInnerDialog();
                      }}
                    >
                      ok
                    </Button>
                  </Grid>
                </div>
              )}

              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAddRow}>
                  <div style={{ marginRight: "0.5rem ", marginTop: "0.4rem" }}>
                    <Icons name={"AddCircleOutlineIcon"} />
                  </div>
                  Add Row
                </Button>
              </Grid>

              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  fullWidth
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Source
                </Typography>

                {optionLists.map((object, index) =>
                  object.optionName !== "" ? (
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      disableListWrap={true}
                      value={object.SOURCE_NAME || null}
                      options={optionNameList.map(
                        (name) => name.STATE_TYPE_NAME
                      )}
                      onChange={handleSourceChange(object.OPTION_ID)}
                      sx={{ width: 230 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  ) : (
                    ""
                  )
                )}
              </Grid>
              <Grid item xs={3}>
                <Typography
                  fullWidth
                  variant="h6"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Step
                </Typography>

                <List component="div" disablePadding>
                  {optionLists.map((object, index) =>
                    object.optionName !== "" ? (
                      <TextField
                        required
                        id={"actionidww" + index}
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                        autoFocus
                        value={object.STEP_NAME || null}
                        name="STEP_NAME"
                        onChange={handleSTEP_NAMEChange(object.OPTION_ID)}
                      />
                    ) : (
                      ""
                    )
                  )}
                </List>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  fullWidth
                  variant="h6"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Target
                </Typography>

                {optionLists.map((object, index) =>
                  object.optionName !== "" ? (
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={optionNameList.map(
                        (name) => name.STATE_TYPE_NAME
                      )}
                      sx={{ width: 230 }}
                      getOptionDisabled={(option) => option === nullValue}
                      onChange={handleTargetChange(object.OPTION_ID)}
                      value={object.TARGET_NAME || null}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  ) : (
                    ""
                  )
                )}
              </Grid>
              <Grid item xs={3}>
                <Typography
                  fullWidth
                  variant="h6"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Action
                </Typography>

                <List component="div" disablePadding>
                  {optionLists.map((object, index) =>
                    object.optionName !== "" ? (
                      <>
                        <TextField
                          required
                          size=""
                          id={"actionid" + index}
                          inputProps={{ maxLength: 250 }}
                          sx={{ width: "70%" }}
                          disabled
                          autoFocus
                          value={object.ACTION_VALUE || null}
                          name="ACTION_NAME"
                          // onChange={handleACTION_NAMEChange(object.OPTION_ID)}
                        />

                        <IconButton
                          id={"object-FaTrash~"}
                          // disabled={object.STATE_TYPE_NAME === "null"}
                          onClick={() => DeleteRowField(object.OPTION_ID)}
                          style={{ marginLeft: "0.5rem", fontSize: 20 }}
                        >
                          <Icons name={"FaTrash"} />
                        </IconButton>
                      </>
                    ) : (
                      ""
                    )
                  )}
                </List>
              </Grid>
            </Grid>
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

            {optionLists.length > 0 && optionLists[0].ACTION_MASTER_ID ? ( // Conditional rendering
              <Button color="primary" onClick={handleSubmit}>
                Update
              </Button>
            ) : (
              <Button color="primary" onClick={handleSubmit}>
                Create
              </Button>
            )}
          </div>
        </DialogActions>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </div>
  );
};

export default ObjectFieldsWorkFlowEdit;
