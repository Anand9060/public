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

import AddIcon from "@mui/icons-material/Add";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import { loginApi } from "../../services/login";

import {
  validateEmail,
  createMessage,
  truncate,
  isEmpty,
} from "../../assets/lib/function";
import { Modal } from "@mui/material";

import MsgBox from "../../components/MsgBox.jsx";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FormHelperText from "@mui/material/FormHelperText";

import Menu from "../../components/Menu";
//import { setauth_token } from "../login/userSlice";
import Box from "@mui/material/Box";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  progressOpen,
  progressClose,
  setsnackBarMsg,
  snackbarOpen,
  renderState,
} from "../../services/hederSlice";
import { useSelector, useDispatch } from "react-redux";
import ObjectFieldsEdits from "../object/ObjectFieldsEdits";
import {
  createObjectFieldApi,
  fetchObjectFieldList,
  getObjectDetails,
  dataTypeList,
} from "../../services/objectApi";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import {
  Paper,
  List,
  Grid,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";

import { HiOutlineX } from "react-icons/hi";

import OptionFields from "./OptionFields";
import ObjectFieldsAction from "./ObjectFieldsAction";

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vh",
  p: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "1rem",
};

export const ObjectFields = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation(); // This one I saw in some other stackoverflow answer
  const objectId = location.state.object_id;
  const msgRefAvailability = useRef();
  const renderStates = useSelector((state) => state.progressBarState.render);
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
  const [manageOpenClose, setmanageOpenClose] = useState({
    open: false,
  });
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

  const [objectDetails, setObjectDetails] = useState({
    objectId: objectId,
    obj_name: "",
  });

  const [state, setState] = useState({
    FiledName: "",
    FiledTypes: "",
    FiledOptions: [{ OPTION_NAME: "" }],
    isUnique: false,
    ErrFiledName: "",
    ErrFiledTypes: "",
  });

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const optionCallbackFunList = (list) => {
    console.log(list);

    setState({ ...state, FiledOptions: list });
    handleCreateOptionClose();
  };

  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setrowData] = useState([]);
  const [createOption, setCreateOption] = useState(false);
  const [dataEnable, setDataEnable] = useState([]);
  const [manageCaseFieldEdit, setmanageCaseFieldEdit] = useState({
    open: false,
  });

  const [dataTypeLists, setDataTypeLists] = useState([]);
  let bigArray = [];
  const [columnDefs] = useState([
    { field: "FIELD_NAME" },
    { field: "DATA_TYPE" },
    { field: "IS_UNIQUE" },
    {
      field: "Action",
      cellRenderer: (prams) => (
        <>
          <FaEdit
            style={{
              marginLeft: "1.4rem",
              color: "#393E46",
              cursor: "pointer",
            }}
            onClick={() => handleManageCaseOpenFieldEdit(prams.data)}
          />
          <ObjectFieldsAction
            fieldInfo={prams.data}
            // deletefield={FieldDeleteCallBackFun}
          />
          {/* {console.log(FieldDeleteCallBackFun)} */}
        </>
      ),
    },
  ]);

  const handleCreateOptionOpen = () => setCreateOption(true);
  const handleCreateOptionClose = () => setCreateOption(false);

  const handleManageCaseOpenFieldEdit = (prams) => {
    setmanageCaseFieldEdit({
      open: true,
      object: prams,
    });
  };

  const handleManageCaseCloseFieldEdit = () => {
    setmanageCaseFieldEdit({
      ...manageCaseFieldEdit,
      open: false,
    });
  };

  const showDataTypeList = () => {
    let componenets = [];
    if (dataTypeLists.length !== 0) {
      componenets = dataTypeLists.map((element, index) => (
        <MenuItem value={element.DATA_TYPE} key={element.DATA_TYPE_ID}>
          {element.DATA_TYPE}
        </MenuItem>
      ));
    }
    return componenets;
  };

  // console.log(rowData);

  // const handleDropChange = (e) => {
  //   let dataTypeLists_1 = dataTypeLists;

  //   // alert(dataTypeLists_1[e.target.value].DATA_TYPE);
  //   setState({
  //     ...state,
  //     FiledTypes: dataTypeLists_1[e.target.value].DATA_TYPE,
  //   });
  //   setDataEnable(dataTypeLists_1[e.target.value].LIST_ENABLE);

  //   // setState((pre) => {
  //   //   return { ...pre, DATA_TYPE: e.target.value };
  //   // });
  //   // console.log(dataTypeLists_1[e.target.value].LIST_ENABLE);
  // };

  const handleDropChange = (e) => {
    // let dataTypeLists_1 = dataTypeLists;
    console.log(e.target.value);

    setState({
      ...state,
      FiledTypes: e.target.value,
    });

    dataTypeLists.map((ele, i) => {
      if (ele.DATA_TYPE === e.target.value) {
        setDataEnable(ele.LIST_ENABLE);
      }
    });
  };

  const handleSubmit = () => {
    var valid = true;
    var ErrFiledName = "";
    var ErrFiledTypes = "";

    if (isEmpty(_.trim(state.FiledName))) {
      ErrFiledName = createMessage(1, "Filed Name");
      valid = false;
    }

    if (isEmpty(_.trim(state.FiledTypes))) {
      ErrFiledTypes = createMessage(1, "Filed Type");
      valid = false;
    }

    if (!valid) {
      setState({
        ...state,
        ErrFiledName: ErrFiledName,
        ErrFiledTypes: ErrFiledTypes,
      });
    } else {
      handleBackdropOpen();
      const data = {
        OBJ_ID: objectId,
        FIELD_NAME: _.trim(state.FiledName),
        DATA_TYPE: _.trim(state.FiledTypes),
        OPTIONS: state.FiledOptions,
        IS_UNIQUE: state.isUnique,
      };

      // console.log(data);

      createObjectFieldApi(data)
        .then((res) => {
          console.log(res.data);
          setState({
            FiledName: "",
            FiledTypes: " ",
            isUnique: false,
            FiledOptions: [
              {
                OPTION_NAME: "",
              },
            ],
          });
          fetchObjectFieldList({
            OBJ_ID: objectId,
          }).then((res1) => {
            // console.log(res1.data.OPTIONS);
            setrowData(res1.data);
            dispatch(snackbarOpen());
            handleBackdropClose();
            dispatch(renderState());
          });
          dispatch(setsnackBarMsg(res.data.message));
        })
        .catch((err) => {
          setState({
            ...state,
            ErrFiledName: err.response.data.message,
          });

          console.log(err.response.data.message);
          handleBackdropClose();
          // handleAlertOpen(err);
        });
    }
  };

  // console.log(dataTypeLists);

  // const FieldDeleteCallBackFun = (id) => {
  //   console.log(bigArray);
  //   bigArray = bigArray.filter((e) => e.FIELD_ID != id);
  //   setrowData(bigArray);
  //   // console.log(id);
  // };

  useEffect(() => {
    dispatch(progressOpen());
    // handleBackdropOpen();
    dataTypeList()
      .then((respons) => {
        setDataTypeLists(respons.data);
        console.log(respons.data);
      })
      .then(() => {
        getObjectDetails({
          OBJ_ID: objectId,
        }).then((res) => {
          setObjectDetails({ ...objectDetails, obj_name: res.data.OBJ_NAME });
        });
      })
      .then(() => {
        fetchObjectFieldList({
          OBJ_ID: objectId,
        }).then((res1) => {
          setrowData(res1.data);

          console.log(res1.data);
          // handleBackdropClose();
          dispatch(progressClose());
        });
      })
      .catch((err2) => {});
  }, [objectDetails.objectId, objectId, renderStates]);

  return (
    <Container maxWidth={"xl"}>
      <Header></Header>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Menu></Menu>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} pt={10}>
            {manageCaseFieldEdit.open == true ? (
              <Grid>
                {manageCaseFieldEdit.open && (
                  <ObjectFieldsEdits
                    // ref={msgRefSkillE}
                    open={manageCaseFieldEdit.open}
                    //   recorded={record}
                    // caseId={32}
                    rowDatas={manageCaseFieldEdit.object}
                    closeManageCase={() => handleManageCaseCloseFieldEdit()}
                  />
                )}
              </Grid>
            ) : (
              <Grid>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography component="h1" variant="h5">
                      Object Name: {objectDetails.obj_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      disabled={rowData.length > 0 ? false : true}
                      onClick={() =>
                        navigate("/createlayout", {
                          state: { object_id: objectDetails.objectId },
                        })
                      }
                    >
                      Page Layout
                    </Button>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel>Field Name</InputLabel>
                    <TextField
                      margin="normal"
                      required
                      // fullWidth
                      name="FiledName"
                      autoFocus
                      sx={{
                        width: { sm: 200, md: 300 },
                        "& .MuiInputBase-root": {
                          height: 40,
                        },
                      }}
                      size="small"
                      inputProps={{ maxLength: 250 }}
                      value={state.FiledName}
                      onChange={(e) =>
                        setState({ ...state, FiledName: e.target.value })
                      }
                      helperText={
                        state.ErrFiledName != "" ? state.ErrFiledName : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>Data Type</InputLabel>
                    <TextField
                      id="outlined-select-currency"
                      select
                      margin="normal"
                      required
                      size="small"
                      sx={{
                        width: { sm: 200, md: 300 },
                        "& .MuiInputBase-root": {
                          height: 40,
                        },
                      }}
                      name="FiledTypes"
                      value={state.FiledTypes}
                      onChange={(e) => handleDropChange(e)}
                      helperText={
                        state.ErrFiledTypes != "" ? state.ErrFiledTypes : ""
                      }
                    >
                      {showDataTypeList()}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    {dataEnable == true ? (
                      <Button
                        variant="contained"
                        sx={{
                          marginRight: "1.5rem",
                          marginTop: "1.5rem",
                          "& .MuiInputBase-root": {
                            height: 40,
                          },
                        }}
                        onClick={handleCreateOptionOpen}
                      >
                        <AddIcon />
                      </Button>
                    ) : (
                      ""
                    )}
                    <Modal
                      open={createOption}
                      onClose={handleCreateOptionClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={Modalstyle}>
                        <HiOutlineX
                          style={{
                            fontSize: "2rem",
                            position: "absolute",
                            top: "-2rem",
                            right: "0",
                            color: "#eee",
                            zIndex: "-1",
                            cursor: "pointer",
                          }}
                          onClick={handleCreateOptionClose}
                        />

                        <OptionFields
                          open={manageOpenClose}
                          handleCloseCallBack={handleCreateOptionClose}
                          FiledOptions={state.FiledOptions}
                          optionListFun={optionCallbackFunList}
                          objId={objectId}
                        />
                      </Box>
                    </Modal>

                    <FormControlLabel
                      sx={{ marginTop: "1.5rem" }}
                      control={
                        <Checkbox
                          checked={state.isUnique}
                          onChange={(e) =>
                            setState({
                              ...state,
                              isUnique: e.target.checked,
                            })
                          }
                        />
                      }
                      label="is Unique"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      sx={{ mt: 2.8, mb: 2 }}
                      onClick={handleSubmit}
                    >
                      Add Field
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 400, width: "100%" }}
                >
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                  ></AgGridReact>
                </div>
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
