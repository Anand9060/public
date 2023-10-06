import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
  RadioGroup,
  Grid,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Autocomplete,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { fetchObjectFieldList } from "../../services/objectApi";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DatePicker } from "rsuite";
import { forEach } from "lodash";
import {
  batchCloneAPI,
  batchDeleteAPI,
  batchEditAPI,
} from "../../services/searchFormSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const CustomCellRenderer = ({ value, props }) => {
  console.log(props);
  return (
    <div>
      <Link
        to="/editData"
        state={{ ID: value, OBJ_ID: props.OBJ_ID, mode: "EDIT" }}
      >
        {value}
      </Link>
    </div>
  );
};

const SearchResultGrid = (props) => {
  console.log(props.data);
  const [gridOptions] = useState({
    rowSelection: "multiple",
  });

  const [columnDefs, setColumnDefs] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fieldList, setFieldList] = useState([]);
  const [defaultFieldList, setDefaultFieldList] = useState([]);

  const [fieldID, setFieldID] = useState("");
  const [editOrClone, setEditOrClone] = useState(null);
  const [showList, setShowList] = useState({});
  const [gridApi, setGridApi] = useState(null);

  const [open, setOpen] = useState(false);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
      suppressMenu: true,
    };
  }, []);

  useEffect(() => {
    setColumnDefs([
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
      },
      {
        headerName: "ID",
        field: "ID",
        cellRendererFramework: (params) =>
          CustomCellRenderer({ value: params.value, props }),
      },
      ...(props.columnDefs || []),
    ]);

    const fetchFieldList = async () => {
      try {
        const res = await fetchObjectFieldList({ OBJ_ID: props.OBJ_ID });
        setFieldList(res.data);
        setDefaultFieldList(res.data);
      } catch (error) {
        console.error("Error fetching field list:", error);
      }
    };

    fetchFieldList();
  }, [props.OBJ_ID, props.columnDefs]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  const onExportClick = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);
  };

  const handleBulkDelete = async () => {
    const batchDelete = async (data) => {
      const res = await batchDeleteAPI(data);
      return res;
    };
    const deleteIDs = selectedRows.map((row) => {
      return {
        ID: row.ID,
      };
    });

    console.log("Req Body -------------->", deleteIDs);
    const res = await batchDelete(deleteIDs);
    console.log("Response -------------->", res);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFieldList(defaultFieldList);
    setShowList({});
    setOpen(false);
  };

  const handleBulkEdit = () => {
    setEditOrClone("EDIT");
    handleOpen();
  };

  const handleBulkClone = () => {
    setEditOrClone("CLONE");
    handleOpen();
  };

  const saveToList = () => {
    const { FIELD_NAME, VALUE } = fieldList.find(
      (ele) => ele.FIELD_ID === fieldID
    );
    console.log(FIELD_NAME, VALUE);
    setShowList({
      ...showList,
      [FIELD_NAME]: VALUE,
    });
  };

  const deleteShowItem = (name) => {
    const updatedShowList = { ...showList };
    delete updatedShowList[name];
    setShowList(updatedShowList);
  };

  const handleOnChange = (fieldID, value, checkboxChecked = null) => {
    setFieldList((prevFieldList) => {
      const updatedFieldList = prevFieldList.map((field) => {
        if (field.FIELD_ID === fieldID) {
          if (checkboxChecked === null) {
            return { ...field, VALUE: value };
          } else {
            const updatedValue = Array.isArray(field.VALUE)
              ? [...field.VALUE]
              : [];
            if (checkboxChecked) {
              updatedValue.push(value);
            } else {
              const index = updatedValue.indexOf(value);
              if (index !== -1) {
                updatedValue.splice(index, 1);
              }
            }
            return { ...field, VALUE: updatedValue };
          }
        }
        return field;
      });

      return updatedFieldList;
    });
    console.log(fieldList);
  };

  const hadleEditOrClone = async () => {
    const batchEdit = async (data) => {
      const res = await batchEditAPI(data);
      return res;
    };
    const batchClone = async (data) => {
      const res = await batchCloneAPI(data);
      return res;
    };
    const deleteIDs = selectedRows.map((row) => row.ID);
    const DATA = [];
    fieldList.forEach((field) => {
      if (
        field?.VALUE &&
        ((Array.isArray(field?.VALUE) && field?.VALUE.length !== 0) ||
          field.VALUE !== "")
      ) {
        DATA.push({ FIELD_ID: field.FIELD_ID, VALUE: field.VALUE });
      }
    });
    const req = {
      IDS: deleteIDs,
      DATA,
    };
    if (editOrClone === "EDIT") {
      const res = await batchEdit(req);
      console.log("Response ------------->", res);
    }

    if (editOrClone === "CLONE") {
      console.log("CLONE");
      console.log("Request --------------->", req);
      const res = await batchClone(req);
      console.log("Response ------------->", res);
    }

    handleClose();
  };

  const generateFieldJSX = (fieldID) => {
    const field = fieldList.find((ele) => ele.FIELD_ID === fieldID);
    if (!field) return null;

    switch (field.DATA_TYPE) {
      case "Single Line Text":
      case "Multiple Line Text":
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
              value={field.VALUE || ""}
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
              value={field.VALUE || ""}
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
              value={field.VALUE || ""}
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
                  value={field.VALUE || ""}
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
              value={field.VALUE || ""}
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
              value={field.VALUE || ""}
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
        return (
          <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
            <Autocomplete
              multiple
              onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
              options={field.OPTIONS.map((option) => option.OPTION_NAME)}
              value={field.VALUE || []}
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
        return (
          <Grid key={field.FIELD_ID} xs={12} style={{ padding: 5, margin: 5 }}>
            <Autocomplete
              multiple
              onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
              options={field.OPTIONS}
              value={field.VALUE || []}
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

      case "Checkbox":
        return (
          <div key={field.FIELD_ID}>
            <Grid container spacing={2}>
              <Grid item>
                <InputLabel>{field.FIELD_NAME}</InputLabel>
              </Grid>
              <Grid item>
                <FormGroup id={field.FIELD_ID} row required={true}>
                  {field.OPTIONS.map((option) => (
                    <FormControlLabel
                      label={option.OPTION_NAME}
                      key={option.OPTION_NAME}
                      control={
                        <Checkbox
                          checked={(field.VALUE || []).includes(
                            option.OPTION_NAME
                          )}
                          onChange={(event) =>
                            handleOnChange(
                              field.FIELD_ID,
                              option.OPTION_NAME,
                              event.target.checked
                            )
                          }
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ width: "100vw", marginBottom: "1rem" }}>
        <div
          className="ag-theme-alpine"
          style={{ height: 400, margin: "0 3rem" }}
        >
          <AgGridReact
            rowData={props.data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={35}
            onGridReady={(params) => onGridReady(params)}
            gridOptions={gridOptions}
            onSelectionChanged={(event) => onSelectionChanged(event)}
          ></AgGridReact>
        </div>
        <div>
          <div style={{ marginLeft: 50, marginTop: 25 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBulkDelete()}
              style={{
                padding: "12px 16px",
                fontSize: "19px",
                margin: 5,
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBulkEdit()}
              style={{
                padding: "12px 16px",
                fontSize: "19px",
                margin: 5,
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBulkClone()}
              style={{
                padding: "12px 16px",
                fontSize: "19px",
                margin: 5,
              }}
            >
              Clone
            </Button>
          </div>
          <span style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onExportClick()}
              style={{
                padding: "12px 16px",
                margin: "25px 55px",
                fontSize: "19px",
              }}
            >
              File Export
            </Button>
          </span>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Field Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fieldID}
              label="Field Name"
              onChange={(event) => setFieldID(event.target.value)}
            >
              {fieldList.map((field) => (
                <MenuItem key={field.FIELD_ID} value={field.FIELD_ID}>
                  {field.FIELD_NAME}
                </MenuItem>
              ))}
            </Select>

            {fieldID !== "" && generateFieldJSX(fieldID)}
            <Box style={{ marginLeft: 10, marginTop: 10 }}>
              {showList && Object.keys(showList).length > 0 ? (
                <ul>
                  {Object.keys(showList).map((FIELD_NAME) => (
                    <Box
                      key={FIELD_NAME}
                      style={{ marginTop: 10 }}
                      component="li"
                    >
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography>{FIELD_NAME}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>{showList[FIELD_NAME]}</Typography>
                        </Grid>
                        <Grid item>
                          <CancelIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteShowItem(FIELD_NAME)}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </ul>
              ) : (
                <Typography>No items to display</Typography>
              )}
            </Box>
          </FormControl>
          <Box style={{ display: "flex", justifyContent: "end" }}>
            <Button sx={{ padding: 2 }} onClick={() => saveToList()}>
              {"Save"}
            </Button>
            <Button sx={{ padding: 2 }} onClick={() => hadleEditOrClone()}>
              {editOrClone}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SearchResultGrid;
