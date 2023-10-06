import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchObjectFieldList,
  fetchObjectList,
} from "../../services/objectApi";
import {
  editFromData,
  fecthActionNameList,
  fetchFormData,
  getLookUpOptionList,
  saveFromDataApi,
} from "../../services/PageLayoutApi";
import { Container, DatePicker, Footer, Grid } from "rsuite";
import { generate } from "shortid";

import { Button } from "@mui/material";
import {
  Autocomplete,
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Loading from "./Loading";
import { AgGridReact } from "ag-grid-react";
import Icons from "../../components/Icons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditObjData from "./EditObjData";

let printableLayoutObject = {};
let source_name = "";
let backupArr = [];
const EditData = () => {
  const [formData, setFormData] = useState(null);
  const [newFieldId, setNewFieldId] = useState(null);

  const [masterObjArr, setMasterObjArr] = useState([]);

  const [mainObjectName, setMainObjectName] = useState([]);
  const [mappingObjectList, setMappingObjectList] = useState([]);

  const [WorkflowList, setWorkflowList] = useState([]);
  const [newWorkflowActionList, setNewWorkflowActionList] = useState([]);
  const [workflowListExist, setWorkflowListExist] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { ID, OBJ_ID } = location.state;

  const [backdrop, setBackdrop] = useState(false);

  const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  const CustomCellRenderer = ({ value, ObjId }) => {
    //  //console.log(value, "------------>valuesss", ObjId);
    return (
      <div>
        <Link
          to="/editObjData"
          state={{ ID: value.ID, OBJ_ID: ObjId, mode: "EDIT" }}
        >
          <Icons name={"FaEdit"} />
        </Link>
      </div>
    );
  };

  useEffect(() => {
    //console.log("useEffect");
    const getOptions = async (data) => {
      const res = await getLookUpOptionList(data);

      // //console.log(res.data);
      return res.data;
    };

    fetchObjectList().then((ele) => {
      setMainObjectName(ele.data);
    });

    const setup = async () => {
      let newList = [];

      const fList = (await fetchObjectFieldList({ OBJ_ID })).data;
      //console.log("Field List", fList);

      // //console.log(ID);

      const fData = await fetchFormData({ ID });
      console.log("Form Data", fData);
      // masterObjArr.push(fData.MASTER_OBJECT);

      printableLayoutObject = { PRINTABLE_LAYOUT: fData.PRINTABLE_LAYOUT };

      //console.log(printableLayoutObject, "--------->layout");
      // masterObjArr.push(printableLayoutObject);
      // setMasterObjArr(printableLayoutObject);

      setMasterObjArr(fData.MASTER_OBJECT);
      setWorkflowList(fData.STATE_WORKFLOW_LIST);
      setMappingObjectList(fData.MAPPING_FIELD_AND_OBJECT);

      for (const field of fData.DATA) {
        const FIELD = fList.find((ele) => ele.FIELD_ID === field.FIELD_ID);
        //console.log(FIELD);
        if (FIELD) {
          let options;
          if (
            FIELD.DATA_TYPE === "Dynamic Lookup" ||
            FIELD.DATA_TYPE === "Dynamic Lookup Multiple Choice"
          ) {
            options = await getOptions({ FIELD_ID: FIELD.FIELD_ID });
            newList.push({
              ...FIELD,
              VALUE: field.VALUE,
              OPTIONS: options,
            });
          } else {
            newList.push({
              ...FIELD,
              VALUE: field.VALUE,
            });
          }
        }
      }
      setFormData(newList);

      //  //console.log(newList);
    };

    setup();
  }, []);

  useEffect(() => {
    const UpdateNewWorkActionvalue = () => {
      if (Array.isArray(newWorkflowActionList)) {
        newWorkflowActionList.forEach((ele) => {
          //console.log(ele, "----------------------->ele");
          handleOnChange(newFieldId, ele.SOURCE_NAME);
        });
      }
    };

    UpdateNewWorkActionvalue();
  }, [newWorkflowActionList, newFieldId]);
  //console.log(mappingObjectList, "-------------------------------->hello");

  const handleOnChange = (fieldId, value) => {
    //console.log(fieldId, value);
    let index = -1;
    formData.forEach((ele, i) => {
      if (ele.FIELD_ID === fieldId) index = i;
    });
    const newFormData = JSON.parse(JSON.stringify(formData));
    if (index !== -1) {
      newFormData[index].VALUE = value;
    }
    setFormData(newFormData);
    handleMappingValue(fieldId, value);
    //console.log(formData);
  };

  const handleMappingValue = (fieldId, value) => {
    mappingObjectList.forEach((ele) => {
      if (ele.FIELD_ID === fieldId) {
        ele.VALUE = value;
      }
    });
  };

  const handlegetlayoutJSON = (OBJ_ID, mainObjId) => {
    //console.log(OBJ_ID, mainObjId);

    navigate("/createObjData", {
      state: {
        OBJ_ID: OBJ_ID,
        OBJ_NAME: "abc",

        main_obj: mainObjId,
        state: "REFERENCEOBJ",
      },
    });
  };

  const handleOnClick = () => {
    //console.log("----");
    //  //console.log(formData);
    let newarrMaster = [];

    masterObjArr.map((ele) => {
      let obj = {
        REFERENCE_OBJ_ID: ele.REFERENCE_OBJ_ID,
      };
      newarrMaster.push(obj);
    });
    //  //console.log(newarrMaster, "------>>>>>>>>>>>>>");

    const data = [
      {
        ID,
        DATA: formData,
        REFERENCE_OBJ_LIST: newarrMaster,
        MAPPING_FIELD_AND_OBJECT: mappingObjectList,
      },
    ];

    console.log("Request Body", data);

    editFromData(data)
      .then((res) => {
        navigate(-1);
        console.log("Saved changes");
      })
      .catch((err) => console.log(err));
  };

  const handleWorkflowState = (ele) => () => {
    console.log(ele, "--------------------------->value00000");
    //console.log(ele.TARGET_NAME);
    handleBackdropOpen();
    setWorkflowListExist(true);

    if (ele.FIELD_ID) {
      setNewFieldId(ele.FIELD_ID);
    }

    handleOnChange(ele.FIELD_ID, ele.TARGET_NAME);
    const data = {
      DATA: formData,

      ACTION_MASTER_ID: ele.ACTION_MASTER_ID,
      STATE_MASTER_ID: ele.STATE_MASTER_ID,
      SOURCE_NAME: ele.SOURCE_NAME,
      TARGET_NAME: ele.TARGET_NAME,
      ACTION_VALUE: ele.ACTION_VALUE,
      API_NAME: ele.API_NAME,
      OBJ_ID,
      MAPPING_FIELD_AND_OBJECT: mappingObjectList,
    };
    console.log(data, "--------------->01111");
    if (newWorkflowActionList.length > 0) {
      setNewWorkflowActionList("");
    }
    fecthActionNameList(data)
      .then((res) => {
        const arrdata = res.data;
        if (arrdata.length > 0) {
          setNewWorkflowActionList(arrdata);
        } else if (newWorkflowActionList.length === 0) {
          backupArr.push(ele);
        } else {
          backupArr = newWorkflowActionList;
        }

        handleBackdropClose();
      })
      .catch((err) => {
        console.log(err);
        handleBackdropClose();
      });

    // if (Array.isArray(backupArr)) {

    // }
  };
  const handlenewWorkflowAcitonList = (ele) => () => {
    //console.log(ele, "--------------------------->value");
    handleBackdropOpen();
    // setWorkflowListExist(true);

    const data = {
      ACTION_MASTER_ID: ele.ACTION_MASTER_ID,
      STATE_MASTER_ID: ele.STATE_MASTER_ID,
      TARGET_NAME: ele.TARGET_NAME,
      SOURCE_NAME: ele.SOURCE_NAME,
      ACTION_VALUE: ele.ACTION_VALUE,
      OBJ_ID,
      MAPPING_FIELD_AND_OBJECT: mappingObjectList,
      DATA: formData,
      API_NAME: ele.API_NAME,
    };
    console.log(data, "----------->1");

    if (newWorkflowActionList.length > 0) {
      setNewWorkflowActionList("");
    }
    fecthActionNameList(data)
      .then((res) => {
        //  //console.log(res.data, "------------------->data");
        const arrdata = res.data;
        if (arrdata.length > 0) {
          setNewWorkflowActionList(arrdata);
        } else {
          backupArr = newWorkflowActionList;
        }

        handleBackdropClose();
      })
      .catch((err) => {
        console.log(err);
        handleBackdropClose();
      });
  };

  const columnDefss = (ObjId) => {
    //console.log(ObjId, "-------------->objIdColoum");
    let obj = {
      FIELD_ID: "",
      headerName: "",
      field: "",
    };

    let Obj2 = {
      headerName: "ID",
      field: "ID",
    };

    let obj3 = {
      field: "Action",
      headerName: "Action",

      cellRendererFramework: (params) =>
        CustomCellRenderer({ value: params.data, ObjId: ObjId }),
    };
    let arrObject = [];
    arrObject.push(Obj2);

    masterObjArr.forEach((eles) => {
      if (eles.REFERENCE_OBJ_ID === ObjId) {
        eles.COLUMN.forEach((ele) => {
          obj = {
            FIELD_ID: ele.FIELD_ID,
            headerName: ele.FIELD_NAME,
            field: ele.FIELD_NAME,
          };

          arrObject.push(obj);
        });
      }
    });

    arrObject.push(obj3);

    //  //console.log(arrObject);

    return arrObject;
  };

  const rowDatas = (OBJ_ID) => {
    let obj = {
      FIELD_ID: "",
      headerName: "",
      field: "",
    };
    let arrObject = [];

    //  //console.log(MASTER_OBJ_LIST.ITEMS);

    masterObjArr.forEach((eles) => {
      //console.log(eles);
      if (OBJ_ID === eles.REFERENCE_OBJ_ID) {
        eles.ROW.forEach((ele) => {
          arrObject.push(ele);
        });
      }
    });

    //console.log(arrObject);

    return arrObject;
  };
  const generateFieldJSX = (field) => {
    //  //console.log(field, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    switch (field.DATA_TYPE) {
      case "Single Line Text":
      case "Multiple Line Text":
      case "Action":
      case "Password":
        return (
          <Grid
            item
            xs={12}
            style={{ padding: 5, margin: 5 }}
            key={field.FIELD_ID}
          >
            <TextField
              variant="outlined"
              size="small"
              label={field.FIELD_NAME}
              fullWidth
              style={{ marginBottom: "1rem" }}
              value={field.VALUE}
              onChange={(event) =>
                handleOnChange(field.FIELD_ID, event.target.value)
              }
            />
          </Grid>
        );

      case "Number":
      case "Phone Number":
        return (
          <Grid
            item
            xs={12}
            key={field.FIELD_ID}
            style={{ padding: 5, margin: 5 }}
          >
            <InputLabel>{field.FIELD_NAME}</InputLabel>
            <TextField
              value={field.VALUE}
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginBottom: "1rem" }}
              type="number"
              onChange={(event) =>
                handleOnChange(field.FIELD_ID, event.target.value)
              }
            />
          </Grid>
        );

      case "Email":
        return (
          <Grid key={field.FIELD_ID} style={{ padding: 5, margin: 5 }}>
            <TextField
              variant="outlined"
              type="email"
              size="small"
              label={field.FIELD_NAME}
              value={field.VALUE}
              onChange={(event) =>
                handleOnChange(field.FIELD_ID, event.target.value)
              }
              style={{ marginBottom: "1rem" }}
              fullWidth
            />
          </Grid>
        );

      case "Radio Button":
        return (
          <Grid
            container
            spacing={2}
            style={{ padding: 5, margin: 5 }}
            key={field.FIELD_ID}
          >
            <Grid item>
              <InputLabel>{field.FIELD_NAME}</InputLabel>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="radio-buttons-group"
                  name="radio-buttons-group"
                  row
                  value={field.VALUE}
                  onChange={(event) =>
                    handleOnChange(field.FIELD_ID, event.target.value)
                  }
                >
                  {field.OPTIONS.map((option) => (
                    <FormControlLabel
                      key={option.OPTION_ID}
                      value={option.OPTION_NAME}
                      control={<Radio />}
                      label={option.OPTION_NAME}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );

      case "Date-Time":
        return (
          <Grid
            container
            spacing={2}
            key={field.FIELD_ID}
            style={{ padding: 5, margin: 5 }}
          >
            <Grid item>
              <InputLabel>{field.FIELD_NAME}</InputLabel>
            </Grid>
            <Grid item>
              <DatePicker
                format="yyyy-MM-dd"
                showMeridian
                block
                value={new Date(field.VALUE)}
                onChange={(value) => handleOnChange(field.FIELD_ID, value)}
              />
            </Grid>
          </Grid>
        );

      case "Text Lookup":
        return (
          <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
            <Autocomplete
              disablePortal
              value={field.VALUE}
              onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
              options={field.OPTIONS.map((option) => option.OPTION_NAME)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field.FIELD_NAME}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        );

      case "Dynamic Lookup":
        return (
          <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
            <Autocomplete
              disablePortal
              value={field.VALUE}
              onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
              options={field.OPTIONS}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field.FIELD_NAME}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        );

      case "Text Lookup Multiple Choice":
        //console.log("TLMC", field);
        return (
          <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
            <Autocomplete
              multiple
              onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
              options={field.OPTIONS.map((option) => option.OPTION_NAME)}
              value={field.VALUE}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field.FIELD_NAME}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        );

      case "Dynamic Lookup Multiple Choice":
        //console.log("DLMC", field);
        return (
          <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
            <Autocomplete
              multiple
              onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
              options={field.OPTIONS}
              value={field.VALUE}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field.FIELD_NAME}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        );
      case "Workflow":
        //  //console.log("DLMC", field);
        return (
          <Grid
            key={field.FIELD_ID}
            xs={12}
            style={{
              padding: 5,
              margin: 5,
              border: "2px dotted blue",
              height: "200px",
            }}
          >
            {workflowListExist === false ? (
              <>
                <TextField
                  variant="outlined"
                  type="Workflow"
                  size="small"
                  label={field.FIELD_NAME}
                  value={field.VALUE}
                  disabled
                  style={{ marginBottom: "1rem" }}
                  fullWidth
                />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                >
                  {WorkflowList.length > 0 &&
                    WorkflowList.map((ele) => {
                      return (
                        <Button
                          key={ele.ACTION_MASTER_ID}
                          id={ele.OPTION_ID}
                          variant="contained"
                          sx={{ marginLeft: "2rem" }}
                          onClick={handleWorkflowState(ele)}
                        >
                          {ele.STEP_NAME}
                        </Button>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <TextField
                  variant="outlined"
                  type="Workflow"
                  size="small"
                  label={field.FIELD_NAME}
                  value={
                    newWorkflowActionList.length > 0
                      ? newWorkflowActionList[0].SOURCE_NAME
                      : backupArr.length > 0
                      ? backupArr[0].TARGET_NAME
                      : field.VALUE
                  }
                  disabled
                  style={{ marginBottom: "1rem" }}
                  fullWidth
                />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                >
                  {newWorkflowActionList.length > 0 &&
                    newWorkflowActionList.map((ele) => {
                      return (
                        <Button
                          key={ele.ACTION_MASTER_ID}
                          id={ele.OPTION_ID}
                          variant="contained"
                          sx={{ marginLeft: "2rem" }}
                          onClick={handlenewWorkflowAcitonList(ele)}
                        >
                          {ele.STEP_NAME}
                        </Button>
                      );
                    })}
                </div>
              </>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

  const generateDefaultLayout = (formData) => {
    return formData.map((field) => generateFieldJSX(field));
  };

  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
      suppressMenu: true,
    };
  }, []);

  const handleprintSubmit = () => {
    let data = [];
    let objectdata = {};
    let OBJECT_NAME = {};

    mainObjectName.forEach((ele) => {
      if (ele.OBJ_ID === OBJ_ID) {
        //console.log(ele, "-------------------------->objecct");
        OBJECT_NAME.OBJECT_NAME = ele.OBJ_NAME;
      }
    });
    data.push(OBJECT_NAME);

    formData.forEach((ele) => {
      //console.log(ele);
      objectdata.FIELD_NAME = ele.FIELD_NAME;
      objectdata.FIELD_VALUE = ele.VALUE;
      //console.log(objectdata, "---------->");

      if (ele.IS_SEARCHABLE === true && ele.IS_PRINTABLE === true) {
        data.push(objectdata);
      }
    });

    handleBackdropOpen();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(
      "https://zvyv8c91jj.execute-api.ap-south-1.amazonaws.com/dev/simptable",
      requestOptions
    )
      .then((response) => response.blob())
      .then((blob) => {
        const fileUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "FLIE.pdf";
        link.click();

        URL.revokeObjectURL(fileUrl);
        handleBackdropClose();
      })
      .catch((error) => {
        // Handle any errors that occurred during the AJAX call
        handleBackdropClose();
      });

    //console.log(data, "------------------->data");

    masterObjArr.forEach((ele) => {
      //console.log(ele, "-------------------->elemarser");
      ele.COLUMN.forEach((eles) => {
        //console.log(eles, "-------------->master");
      });
    });
  };

  return (
    <Container maxWidth="xl" key="container">
      <Header />
      <br />
      <br />

      <Grid container spacing={2} style={{ marginY: 50 }}>
        {formData ? (
          <>
            <div>
              {generateDefaultLayout(formData)}

              {masterObjArr.map((eles) => {
                //console.log(eles);
                return (
                  <div
                    className="ag-theme-alpine"
                    style={{
                      height: 300,
                      margin: "1rem",
                      padding: "2rem",
                    }}
                    key={eles.REFERENCE_OBJ_ID}
                  >
                    <Typography>{eles.REFERENCE_OBJ_NAME}</Typography>
                    <AgGridReact
                      columnDefs={columnDefss(eles.REFERENCE_OBJ_ID)}
                      defaultColDef={defaultColDef}
                      rowData={rowDatas(eles.REFERENCE_OBJ_ID)}
                      onGridReady={onGridReady}
                      rowDragManaged={true}
                      animateRows={true}
                    ></AgGridReact>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        margin: "0.5rem",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handlegetlayoutJSON(eles.REFERENCE_OBJ_ID, OBJ_ID)
                        }
                      >
                        <AddCircleOutlineIcon
                          style={{ color: "blue", fontSize: "30px" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
            <Grid
              item
              xs={12}
              style={{ padding: "3rem", margin: 5 }}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnClick}
              >
                {"Save changes"}
              </Button>
              {"  "}
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
              >
                {"Quit"}
              </Button>{" "}
              {printableLayoutObject.PRINTABLE_LAYOUT === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleprintSubmit}
                >
                  {"Print"}
                </Button>
              ) : (
                ""
              )}
            </Grid>
          </>
        ) : (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>

      <Footer />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default EditData;
