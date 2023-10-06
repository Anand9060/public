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
import label from "../../assets/data/label.json";

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
import { Icon, Modal, Radio, RadioGroup } from "@mui/material";

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
import IconButton from "@mui/material/IconButton";

import { useSelector, useDispatch } from "react-redux";
import ObjectFieldsEdits from "../object/ObjectFieldsEdits";
import {
  createObjectFieldApi,
  fetchObjectFieldList,
  getObjectDetails,
  dataTypeList,
  updateObjectFieldList,
  getLookupObjectList,
  fetchMappingObject,
  fetchMappingObjectField,
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
import Icons from "../../components/Icons";
import Autocomplete from "@mui/material/Autocomplete";
import { filter } from "lodash";
import ObjectFieldsWorkFlowEdit from "./ObjectFieldsWorkFlowEdit";
import RuleModal from "./RuleModal";

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
  const datalabels = label.Labels;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation(); // This one I saw in some other stackoverflow answer
  const objectId = location.state.object_id;
  const msgRefAvailability = useRef();
  const renderStates = useSelector((state) => state.progressBarState.render);
  const textLabel = useSelector((state) => state.labelTextState.message);
  //  //console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };
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
    FieldId: "",
    FiledName: "",
    FiledTypes: "",
    FiledOptions: [{ OPTION_NAME: "" }],
    isUnique: false,
    isRequired: false,
    isSearchable: false,
    isLookup: false,
    isPrintable: false,
    ErrFiledName: "",
    ErrFiledTypes: "",
    LookupObject: "",
    mappingObjectName: "",
    mappingObjectFieldName: "",
  });

  // useEffect(() => {
  //    //console.log(state);
  // }, [state]);

  const optionCallbackFunList = (list) => {
    //console.log(list);

    setState({ ...state, FiledOptions: list });
    handleCreateOptionClose();
  };

  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);
  const [uploadFile, setUploadFile] = useState([]);
  const [rowData, setrowData] = useState([]);
  const [createOption, setCreateOption] = useState(false);
  const [carryMappingObjectId, setCarryMappingObjectId] = useState(null);
  const [dataEnable, setDataEnable] = useState(false);
  const [lookupEnable, setLookupEnable] = useState(false);
  const [manageCaseFieldEdit, setmanageCaseFieldEdit] = useState({
    open: false,
  });
  const [manageCaseFieldWorkflowEdit, setmanageCaseFieldWorkflowEdit] =
    useState({
      open: false,
    });

  const [dataTypeLists, setDataTypeLists] = useState([]);
  const [mappingObjectList, setMappingObjectList] = useState([]);
  const [mappingObjectFieldList, setMappingObjectFieldList] = useState([]);
  let bigArray = [];
  const [columnDefs] = useState([
    { field: "FIELD_NAME", flex: 1 },
    { field: "DATA_TYPE", flex: 1 },
    { field: "IS_UNIQUE", flex: 1 },
    { field: "IS_REQUIRED", flex: 1 },
    { field: "IS_SEARCHABLE", flex: 1 },
    { field: "IS_LOOKUP", flex: 1 },
    { field: "IS_PRINTABLE", flex: 1 },
    { field: "LOOKUP_OBJ_NAME", flex: 1 },
    { field: "MAPPING_OBJECT_NAME", flex: 1 },
    { field: "MAPPING_OBJECT_FIELD_NAME", flex: 1 },

    {
      field: funlabel("action"),
      cellRenderer: (prams) => (
        <>
          <IconButton
            id="objectfieldFaEdit"
            style={{
              marginLeft: "1.4rem",
              color: "#393E46",
              cursor: "pointer",
              fontSize: 18,
            }}
            onClick={() => handleManageCaseOpenFieldEdit(prams.data)}
          >
            <Icons name={"FaEdit"} />
          </IconButton>

          <ObjectFieldsAction
            fieldInfo={prams.data}
            // deletefield={FieldDeleteCallBackFun}
          />
          {/* { //console.log(FieldDeleteCallBackFun)} */}
        </>
      ),
    },
  ]);

  const handleCreateOptionOpen = () => setCreateOption(true);
  const handleCreateOptionClose = () => setCreateOption(false);

  const handleManageCaseCloseFieldWorkflowEdits = () => {
    setmanageCaseFieldWorkflowEdit({
      ...manageCaseFieldWorkflowEdit,
      open: false,
    });
  };

  const handleManageCaseOpenFieldFieldWorkflowEdits = (value) => {
    setmanageCaseFieldWorkflowEdit({
      ...manageCaseFieldWorkflowEdit,
      open: true,
      value: value,
    });
  };

  const handleManageCaseOpenFieldEdit = (prams) => {
    if (prams.FIELD_NAME === "Status" && prams.DATA_TYPE === "Workflow") {
      //console.log(prams);
      handleManageCaseOpenFieldFieldWorkflowEdits(prams);
    } else {
      //console.log(prams.MAPPING_OBJECT_NAME, "object Name..........");
      //console.log(prams.MAPPING_OBJECT_FIELD_NAME, "field Name..........");
      setCarryMappingObjectId(prams.MAPPING_OBJECT_ID);
      setState({
        ...state,
        FieldId: prams.FIELD_ID,
        FiledName: prams.FIELD_NAME,
        FiledTypes: prams.DATA_TYPE_ID,

        FiledOptions: prams?.OPTIONS ? prams?.OPTIONS : [],
        isUnique: prams.IS_UNIQUE,
        isRequired: prams.IS_REQUIRED,
        isSearchable: prams.IS_SEARCHABLE,
        isLookup: prams.IS_LOOKUP,
        isPrintable: prams.IS_PRINTABLE,
        LookupObject: prams.LOOKUP_OBJ_ID,
        mappingObjectName: prams.MAPPING_OBJECT_ID,
        mappingObjectFieldName: prams.MAPPING_OBJECT_FIELD_ID,
      });
    }
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
        <MenuItem value={element.DATA_TYPE_ID}>{element.DATA_TYPE}</MenuItem>
      ));
    }
    return componenets;
  };

  const handleDropChange = (e) => {
    // let dataTypeLists_1 = dataTypeLists;
    //console.log(e.target);
    const data = e.target.value;
    //console.log(dataTypeLists);
    //console.log(data, "444444444444444444444444");

    setState({
      ...state,
      FiledTypes: data,
    });
  };
  const changeMappingObject = (e) => {
    setCarryMappingObjectId(e.target.value);
    setState((prev) => ({ ...prev, mappingObjectName: e.target.value }));
  };
  const changeMappingObjectField = (e) => {
    setState((prev) => ({ ...prev, mappingObjectFieldName: e.target.value }));
  };
  //  //console.log(carryMappingObjectId);

  const handleReset = () => {
    setState({
      ...state,
      FieldId: "",
      FiledName: "",
      FiledTypes: "",
      FiledOptions: [{ OPTION_NAME: "" }],
      isUnique: false,
      isRequired: false,
      isSearchable: false,
      isLookup: false,
      isPrintable: false,
      ErrFiledName: "",
      ErrFiledTypes: "",
      LookupObject: "",
      mappingObjectName: "",
      mappingObjectFieldName: "",
    });
  };
  //  //console.log(rowData);

  const handleSubmit = () => {
    var valid = true;
    var ErrFiledName = "";
    var ErrFiledTypes = "";

    if (isEmpty(_.trim(state.FiledName))) {
      ErrFiledName = createMessage(1, "Filed Name");
      valid = false;
    }

    if (isEmpty(_.trim(state.FiledTypes))) {
      ErrFiledTypes = createMessage(1, "Data Type");
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

      if (state.FieldId == "") {
        const data = {
          OBJ_ID: objectId,
          FIELD_NAME: _.trim(state.FiledName),
          DATA_TYPE_ID: _.trim(state.FiledTypes),
          OPTIONS: state.FiledOptions === null ? [] : state.FiledOptions,
          IS_UNIQUE: state.isUnique,
          IS_REQUIRED: state.isRequired,
          IS_SEARCHABLE: state.isSearchable,
          IS_LOOKUP: state.isLookup,
          IS_PRINTABLE: state.isPrintable,
          LOOKUP_OBJ_ID: state.LookupObject,
          MAPPING_OBJECT_ID: state.mappingObjectName,
          MAPPING_OBJECT_FIELD_ID: state.mappingObjectFieldName,
        };

        //console.log("Data entered for field creation", data);

        createObjectFieldApi(data)
          .then((res) => {
            //console.log(res.data);
            // setState({
            //   FiledName: "",
            //   FiledTypes: " ",
            //   isUnique: false,
            //   FiledOptions: [
            //     {
            //       OPTION_NAME: "",
            //     },
            //   ],
            // });
            fetchObjectFieldList({
              OBJ_ID: objectId,
            }).then((res1) => {
              //console.log("Field list after creating field", res1.data);
              let RDATA = res1.data;
              //console.log(RDATA, "-----------------------------");
              setrowData(RDATA);
              dispatch(snackbarOpen());
              handleBackdropClose();
              dispatch(renderState());
            });
            dispatch(setsnackBarMsg(res.data.message));
            handleReset();
          })
          .catch((err) => {
            if (state.FiledTypes != "")
              setState({
                ...state,
                ErrFiledName: err.response.data.message,
                ErrFiledTypes: "",
              });
            else {
              setState({
                ...state,
                ErrFiledName: "",
                ErrFiledTypes: err.response.data.message,
              });
            }

            //console.log(err.response.data.message);
            handleBackdropClose();
            // handleAlertOpen(err);
          });
      } else {
        const data = {
          OBJ_ID: objectId,
          FIELD_ID: state.FieldId,
          FIELD_NAME: _.trim(state.FiledName),
          DATA_TYPE: _.trim(state.FiledTypes),
          DATA_TYPE_ID: _.trim(state.FiledTypes),

          OPTIONS: state.FiledOptions != "undefined" ? state.FiledOptions : [],
          IS_UNIQUE: state.isUnique,
          IS_REQUIRED: state.isRequired,
          IS_SEARCHABLE: state.isSearchable,
          IS_LOOKUP: state.isLookup,
          IS_PRINTABLE: state.isPrintable,
          LOOKUP_OBJ_ID: state.LookupObject,
          MAPPING_OBJECT_ID: state.mappingObjectName,
          MAPPING_OBJECT_FIELD_ID: state.mappingObjectFieldName,
          // OPTIONS: state.FiledOptions,
        };

        //console.log(data);

        updateObjectFieldList(data)
          .then((res) => {
            // setState({
            //   FiledName: "",
            //   FiledTypes: " ",
            //   isUnique: false,
            //   FiledOptions: [
            //     {
            //       OPTION_NAME: "",
            //     },
            //   ],
            // });
            fetchObjectFieldList({
              OBJ_ID: objectId,
            }).then((res1) => {
              //  //console.log(res1.data.OPTIONS);
              setrowData(res1.data);
              dispatch(snackbarOpen());
              handleBackdropClose();
              dispatch(renderState());
            });
            dispatch(setsnackBarMsg(res.data.message));
            handleBackdropClose();
            handleReset();
          })
          .catch((err) => {
            if (state.FiledTypes != "")
              setState({
                ...state,
                ErrFiledName: err.response.data.message,
                ErrFiledTypes: "",
              });
            else {
              setState({
                ...state,
                ErrFiledName: "",
                ErrFiledTypes: err.response.data.message,
              });
            }
            //console.log(err);
            handleBackdropClose();
            // handleAlertOpen(err);
          });
      }
    }
  };

  const dataTypeName = (id) => {
    let DTList = dataTypeList;
    let obj = _.find(DTList, function (o) {
      return o.DATA_TYPE_ID < id;
    });
    //console.log("SASAS", obj);
  };
  //  //console.log(dataTypeLists);

  // const FieldDeleteCallBackFun = (id) => {
  //    //console.log(bigArray);
  //   bigArray = bigArray.filter((e) => e.FIELD_ID != id);
  //   setrowData(bigArray);
  //   //  //console.log(id);
  // };

  useEffect(() => {
    dispatch(progressOpen());
    // handleBackdropOpen();
    dataTypeList()
      .then((respons) => {
        setDataTypeLists(respons.data);
        //console.log("Here-------------", respons.data);
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
          let RDATA = res1.data;
          // RDATA.map((ele, i) => {
          //   RDATA[i]["dataTypeName"] = dataTypeName(ele.DATA_TYPE_ID);
          // });

          //console.log("AAA", RDATA);
          setrowData(RDATA);

          //  //console.log(res1.data);
          // handleBackdropClose();
          dispatch(progressClose());
        });
      })
      .catch((err2) => {});
  }, [objectDetails.objectId, objectId, renderStates]);

  useEffect(() => {
    fetchMappingObject({ OBJ_ID: objectId })
      .then((res) => {
        //console.log(res);
        setMappingObjectList(res);
      })
      .catch((err) => {
        //console.log(err);
      });
    fetchMappingObjectField({ OBJ_ID: carryMappingObjectId })
      .then((res) => {
        setMappingObjectFieldList(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [objectId, carryMappingObjectId]);

  useEffect(() => {
    dataTypeLists.map((ele, i) => {
      if (ele.DATA_TYPE_ID == state.FiledTypes) {
        setDataEnable(ele.LIST_ENABLE);
        setLookupEnable(ele.LOOKUP_ENABLE === true ? true : false);
        //console.log("here---------------");
      }
    });
  }, [state.FiledTypes]);

  //////////////////////////////////////////////////////////////////////////////////////////

  const [lookupObjectListOpen, setLookupObjectListOpen] = useState(false);
  const [objectListForLookup, setObjectListForLookup] = useState(null);
  const [lookupObjectChoice, setLookupObjectChoice] = useState("");

  const handleLookupObjectListClose = () => {
    setLookupObjectListOpen(false);
  };

  const handleLookupObjectListOpen = () => {
    setLookupObjectListOpen(true);
  };

  useEffect(() => {
    const getObjectListForLookup = async (objectId) => {
      const res = await getLookupObjectList({ OBJ_ID: objectId });
      setObjectListForLookup(res.data);
    };

    getObjectListForLookup(objectId);
  }, []);

  const handlelookupObjectChoiceChange = (val) => {
    setLookupObjectChoice(val);
  };

  const handleLookupObjectChoiceSave = () => {
    setState((prevState) => ({
      ...prevState,
      LookupObject: lookupObjectChoice,
    }));
    //console.log(state);
    handleLookupObjectListClose();
  };

  const [change, setChange] = useState([]);

  // ---------------Code for Rule Validation---------------

  const [ruleValidationModalOpen, setRuleValidationModalOpen] = useState(false);
  const openModalForRuleValidation = () => setRuleValidationModalOpen(true);
  const closeModalForRuleValidation = () => setRuleValidationModalOpen(false);
  const RuleValidationModalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    height: "85vh",
    p: 3,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
  };

  useEffect(() => {
    // Fetch the list of uploaded files on component mount
    fetch(
      "https://ioueyxu8ej.execute-api.ap-south-1.amazonaws.com/dev/fileList"
    )
      .then((response) => response.json())
      .then((fileList) => {
        // Set the list of uploaded files in state
        setUploadFile(fileList);
      })
      .catch((error) => {
        console.error("Error fetching file list:", error);
      });
  }, []);
  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
    if (selectFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result.split(",")[1];
        const fileData = {
          OBJ_ID: objectId,
          name: selectFile.name,
          size: selectFile.size,
          type: selectFile.type,
          lastModified: selectFile.lastModified,
          base64Data: base64,
        };
        setUpload(fileData);
      };
      reader.readAsDataURL(selectFile);
    }
    console.log(e.target.files, "----");
  };
  const handleUpload = () => {
    if (file) {
      console.log(file, "setFile---------->");
      console.log(upload, "upload---->");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type
          // Add any other headers if needed
        },
        body: JSON.stringify(upload), // Convert the data to JSON format
      };
      fetch(
        "https://ioueyxu8ej.execute-api.ap-south-1.amazonaws.com/dev/replace",
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON response
        })
        .catch((error) => {
          // Handle any errors here
          alert("Uploaded Successfully");
          // console.error('Error:', error);
        });
    } else {
      alert("no file");
      console.error("no file---------->");
    }
    console.log(file, "----------------->");
  };
  const handlePdfDownload = () => {
    const dataaa = {
      OBJ_ID: objectId,
    };
    console.log(dataaa);
    handleBackdropOpen();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataaa),
    };
    fetch(
      "https://ioueyxu8ej.execute-api.ap-south-1.amazonaws.com/dev/download",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a new Blob with the correct MIME type for a PDF
        const pdfBlob = new Blob([blob], { type: "application/pdf" });
        // Create a temporary URL for the Blob
        const fileUrl = URL.createObjectURL(pdfBlob);
        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "downloaded.txt"; // Set the desired file name and extension
        link.click();
        // Revoke the object URL to free up resources
        URL.revokeObjectURL(fileUrl);
        handleBackdropClose();
      })
      .catch((error) => {
        handleBackdropClose();
        console.error("Error:", error);
      });
  };

  // --------------------------------------------------------

  return (
    <Container maxWidth={"xl"}>
      <Header></Header>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Menu></Menu>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} pt={10}>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography component="h1" variant="h5">
                    {state.FieldId == ""
                      ? funlabel("createField")
                      : funlabel("editField")}
                    : {objectDetails.obj_name}
                  </Typography>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <Button
                    style={{ margin: 10 }}
                    type="submit"
                    size="small"
                    variant="contained"
                    disabled={rowData.length > 0 ? false : true}
                    onClick={() =>
                      navigate("/mainlayout", {
                        state: {
                          object_id: objectDetails.objectId,
                          mode: "CREATE",
                        },
                      })
                    }
                  >
                    {funlabel("pageLayout")}
                  </Button>
                  <Button
                    style={{ margin: 10 }}
                    type="submit"
                    size="small"
                    variant="contained"
                    disabled={rowData.length > 0 ? false : true}
                    onClick={() =>
                      navigate("/getlayoutlist", {
                        state: { object_id: objectDetails.objectId },
                      })
                    }
                  >
                    {" "}
                    PageLayout List
                  </Button>
                  <Button
                    style={{ margin: 10 }}
                    type="submit"
                    size="small"
                    variant="contained"
                    disabled={rowData.length > 0 ? false : true}
                    onClick={() => {
                      //console.log(objectDetails);
                      navigate("/searchform", {
                        state: { OBJ_ID: objectDetails.objectId },
                      });
                    }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* <Grid item xs={3}>
                  <InputLabel>Field Label</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    name="FiledName"
                    autoFocus
                    id="object-fieldName"
                    fullWidth
                    size="small"
                    inputProps={{ maxLength: 250 }}
                    // value={state.FiledName}
                    // onChange={(e) =>
                    //   setState({ ...state, FiledName: e.target.value })
                    // }
                    // helperText={
                    //   state.ErrFiledName != "" ? state.ErrFiledName : ""
                    // }
                  />
                </Grid> */}
                <Grid item xs={3}>
                  <InputLabel>{funlabel("fieldName")}</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    name="FiledName"
                    autoFocus
                    id="object-fieldName"
                    fullWidth
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
                <Grid item xs={3}>
                  <InputLabel>{funlabel("dataType")}</InputLabel>
                  <Select
                    size="small"
                    margin="normal"
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.FiledTypes}
                    disabled={state.FieldId == "" ? false : true}
                    name="FieldType"
                    onChange={(e) => handleDropChange(e)}
                    // helperText={
                    //   state.ErrFiledTypes != "" ? state.ErrFiledTypes : ""
                    // }
                  >
                    {dataTypeLists.map((name) => (
                      <MenuItem
                        key={name.DATA_TYPE_ID}
                        value={name.DATA_TYPE_ID}
                        //   style={getStyles(name, personName, theme)}
                      >
                        {name.DATA_TYPE}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {state.ErrFiledTypes != "" ? state.ErrFiledTypes : ""}
                  </FormHelperText>
                </Grid>
                <Grid item xs={3}>
                  <InputLabel>{"Mapping Object"}</InputLabel>
                  <Select
                    size="small"
                    margin="normal"
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.mappingObjectName}
                    // disabled={state.FieldId == "" ? false : true}
                    name="mappingObjectName"
                    onChange={(e) => changeMappingObject(e)}
                  >
                    {mappingObjectList.map((name) => (
                      <MenuItem key={name.OBJ_ID} value={name.OBJ_ID}>
                        {name.OBJ_NAME}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <InputLabel>{"Mapping Object Field"}</InputLabel>
                  <Select
                    size="small"
                    margin="normal"
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.mappingObjectFieldName}
                    // disabled={state.FieldId == "" ? false : true}
                    name="mappingObjectFieldName"
                    onChange={(e) => changeMappingObjectField(e)}
                    // helperText={
                    //   state.ErrFiledTypes != "" ? state.ErrFiledTypes : ""
                    // }
                  >
                    {mappingObjectFieldList.map((name) => (
                      <MenuItem
                        key={name.FIELD_ID}
                        value={name.FIELD_ID}
                        //   style={getStyles(name, personName, theme)}
                      >
                        {name.FIELD_NAME}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  {dataEnable === true && lookupEnable === false ? (
                    <Button
                      variant="contained"
                      sx={{
                        marginRight: "1.5rem",
                        marginTop: "1.1rem",
                        "& .MuiInputBase-root": {
                          height: 40,
                        },
                      }}
                      onClick={handleCreateOptionOpen}
                    >
                      <Icons name={"AddIcon"} />
                      Add
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
                        fieldId={state.FieldId}
                      />
                    </Box>
                  </Modal>

                  {lookupEnable === true ? (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          marginRight: "1.5rem",
                          marginTop: "1.1rem",
                          "& .MuiInputBase-root": {
                            height: 40,
                          },
                        }}
                        onClick={handleLookupObjectListOpen}
                      >
                        <Icons name={"AddLookupObject"} />
                        {"Add Lookup Object"}
                      </Button>
                    </>
                  ) : null}

                  {/* ============================================================================ */}

                  <Modal
                    open={lookupObjectListOpen}
                    onClose={handleLookupObjectListClose}
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
                        onClick={handleLookupObjectListClose}
                      />
                      <InputLabel>{"Choose Lookup Object"}</InputLabel>
                      <RadioGroup
                        value={lookupObjectChoice}
                        onChange={(e) =>
                          handlelookupObjectChoiceChange(e.target.value)
                        }
                      >
                        {objectListForLookup &&
                          objectListForLookup.map((ele) => (
                            <FormControlLabel
                              key={ele.OBJ_NAME}
                              value={ele.OBJ_ID}
                              control={<Radio />}
                              label={ele.OBJ_NAME}
                            />
                          ))}
                      </RadioGroup>
                      <Box sx={{ marginTop: "1rem" }}>
                        <Button
                          variant="contained"
                          onClick={handleLookupObjectChoiceSave}
                        >
                          Save
                        </Button>
                        {"    "}
                        <Button
                          variant="contained"
                          onClick={handleLookupObjectListClose}
                        >
                          Close
                        </Button>
                      </Box>
                    </Box>
                  </Modal>

                  {/* ----------------Rule Validation Modal---------------- */}

                  <Modal open={ruleValidationModalOpen}>
                    <Box sx={RuleValidationModalstyle}>
                      <HiOutlineX
                        style={{
                          fontSize: "rem",
                          position: "absolute",
                          top: "-2rem",
                          right: "0",
                          color: "#eee",
                          zIndex: "-1",
                          cursor: "pointer",
                        }}
                        onClick={() => closeModalForRuleValidation()}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        justifyContent="space-between"
                      >
                        <RuleModal
                          rowData={rowData}
                          objectId={objectId}
                          ruleValidationModalOpen={ruleValidationModalOpen}
                          openModalForRuleValidation={
                            openModalForRuleValidation
                          }
                          closeModalForRuleValidation={
                            closeModalForRuleValidation
                          }
                        />
                      </Box>
                    </Box>
                  </Modal>

                  {/* ----------------------------------------------------- */}

                  <FormControlLabel
                    sx={{ marginTop: "1rem" }}
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
                    label={funlabel("isUnique")}
                  />
                  <FormControlLabel
                    sx={{ marginTop: "1rem" }}
                    control={
                      <Checkbox
                        checked={state.isRequired}
                        onChange={(e) =>
                          setState({
                            ...state,
                            isRequired: e.target.checked,
                          })
                        }
                      />
                    }
                    label={"IS_REQUIRED"}
                  />
                  <FormControlLabel
                    sx={{ marginTop: "1rem" }}
                    control={
                      <Checkbox
                        checked={state.isSearchable}
                        onChange={(e) =>
                          setState({
                            ...state,
                            isSearchable: e.target.checked,
                          })
                        }
                      />
                    }
                    label={"IS_SEARCHBLE"}
                  />
                  <FormControlLabel
                    sx={{ marginTop: "1rem" }}
                    control={
                      <Checkbox
                        checked={state.isLookup}
                        onChange={(e) =>
                          setState({
                            ...state,
                            isLookup: e.target.checked,
                          })
                        }
                      />
                    }
                    label={"IS_LOOKUP"}
                  />
                  <FormControlLabel
                    sx={{ marginTop: "1rem" }}
                    control={
                      <Checkbox
                        checked={state.isPrintable}
                        onChange={(e) =>
                          setState({
                            ...state,
                            isPrintable: e.target.checked,
                          })
                        }
                      />
                    }
                    label={"IS_PRINTABLE"}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    id="object-field-submit"
                    size="small"
                    variant="contained"
                    sx={{ mt: 2.8, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    {state.FieldId == ""
                      ? funlabel("addField")
                      : funlabel("updateField")}
                  </Button>
                  {/* ----------------Button for Rule Validation---------------- */}

                  <Button
                    type="submit"
                    id="object-field-submit"
                    size="small"
                    variant="contained"
                    sx={{ mt: 2.8, mb: 2, ml: 1 }}
                    onClick={() => openModalForRuleValidation()}
                  >
                    Add Rules
                  </Button>

                  {/* ------------------------------------------------------------ */}

                  {state.FieldId != "" && (
                    <Button
                      type="submit"
                      id="object-reset"
                      size="small"
                      variant="contained"
                      sx={{ mt: 2.8, mb: 2, ml: 4 }}
                      onClick={handleReset}
                    >
                      {funlabel("reset")}
                    </Button>
                  )}
                </Grid>
              </Grid>

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

              <span>Upload Documents</span>
              <input
                type="file"
                accept=".csv, .txt, .rtf, .docx, .xls"
                onChange={handleFileChange}
              />

              <Button
                type="submit"
                id="upload"
                size="small"
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={handleUpload}
              >
                Upload
              </Button>
              {/* {upload && (
                <div>
                  <h3>Selected File Details (JSON):</h3>
                  <pre>{JSON.stringify(upload, 0, 2)}</pre>
                </div>
              )} */}
              <Button
                type="submit"
                id="download"
                size="small"
                variant="contained"
                sx={{ mt: 1, mb: 1, ml: 4 }}
                onClick={handlePdfDownload}
              >
                Download
              </Button>
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

      {manageCaseFieldWorkflowEdit.open && (
        <ObjectFieldsWorkFlowEdit
          // ref={msgRefSkillE}
          open={manageCaseFieldWorkflowEdit.open}
          //   recorded={record}
          objectId={objectId}
          value={manageCaseFieldWorkflowEdit.value}
          closeManageCase={() => handleManageCaseCloseFieldWorkflowEdits()}
        />
      )}
    </Container>
  );
};
