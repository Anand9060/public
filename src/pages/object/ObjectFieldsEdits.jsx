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

import { createMessage, isEmpty } from "../../assets/lib/function";
import { Modal } from "@mui/material";

import MsgBox from "../../components/MsgBox.jsx";

import Box from "@mui/material/Box";
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

import {
  createObjectFieldApi,
  fetchObjectFieldList,
  getObjectDetails,
  dataTypeList,
} from "../../services/objectApi";
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

const ObjectFieldsEdits = (props) => {
  const rowDatas = props.rowDatas;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // This one I saw in some other stackoverflow answer
  const objectId = location.state.object_id;
  // //console.log(objectId);
  const msgRefAvailability = useRef();
  // const renderState = useSelector((state) => state.progressBarState.render);
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
  const renderStates = useSelector((state) => state.progressBarState.render);

  //console.log(objectDetails);

  const [state, setState] = useState(rowDatas);

  const optionCallbackFunList = (list) => {
    //console.log(list);
    setState({ ...state, FiledOptions: list });
    handleCreateOptionClose();
  };

  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setrowData] = useState([]);
  const [createOption, setCreateOption] = useState(false);
  const [dataEnable, setDataEnable] = useState([]);

  const [dataTypeLists, setDataTypeLists] = useState([]);

  const handleCreateOptionOpen = () => setCreateOption(true);
  const handleCreateOptionClose = () => setCreateOption(false);

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

      // //console.log(data);

      createObjectFieldApi(data)
        .then((res) => {
          //console.log(res.data);
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
            // //console.log(res1.data.OPTIONS);
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

          //console.log(err.response.data.message);
          handleBackdropClose();
          // handleAlertOpen(err);
        });
    }
  };

  useEffect(() => {
    dispatch(progressOpen());
    // handleBackdropOpen();
    dataTypeList()
      .then((respons) => {
        setDataTypeLists(respons.data);
        //console.log(respons.data);
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
          dispatch(progressClose());
        });
      });
  }, [objectDetails.objectId, objectId, renderStates]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography component="h1" variant="h5">
            Edit Object
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
            value={state.FIELD_NAME}
            onChange={(e) => setState({ ...state, FIELD_NAME: e.target.value })}
            // helperText={state.ErrFiledName != "" ? state.ErrFiledName : ""}
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
            disabled
            name="FiledTypes"
            value={state.DATA_TYPE}
            onChange={(e) => handleDropChange(e)}
            // helperText={state.ErrFiledTypes != "" ? state.ErrFiledTypes : ""}
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
                checked={state.IS_UNIQUE}
                onChange={(e) =>
                  setState({
                    ...state,
                    IS_UNIQUE: e.target.checked,
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
            Update Field
          </Button>
        </Grid>

        <Grid item xs={1}>
          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => props.closeManageCase()}
          >
            Cancel
          </Button>
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
    </>
  );
};

export default ObjectFieldsEdits;
