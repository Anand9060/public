import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Grid, Button, Autocomplete } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "rsuite";
import SearchResultGrid from "./SearchResultGrid";
import { getsearchResult } from "../../services/searchFormSlice";
import { getLookUpOptionList } from "../../services/objectApi";
import { fetchTableHeaders } from "../../services/PageLayoutApi";

const fieldGen = (ele) => {
  const [reRender, setReRender] = useState(false);

  const forceUpdate = () => {
    setReRender(!reRender);
  };

  useEffect(() => {}, [reRender]);

  switch (ele.DATA_TYPE) {
    case "AutoID":
      return (
        <div style={{ padding: "0 1rem" }}>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Enter Value"
            fullWidth
          />
        </div>
      );

    case "Phone Number":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              padding: "0 1rem",
            }}
          >
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              inputProps={{
                pattern: "[0-9]{10}",
              }}
              onChange={(event) => (ele.SEARCHVALUE = event.target.value)}
            />
          </div>
        </>
      );

    case "Number":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              padding: "0 1rem",
            }}
          >
            {["LESS", "GREATER", "EQUALS"].map((prop) => {
              const isEquals = prop === "EQUALS";
              const isGreaterOrLesser = prop === "GREATER" || prop === "LESS";

              const disabled =
                (isEquals && (ele.GREATER || ele.LESS)) ||
                (isGreaterOrLesser && ele.EQUALS);

              return (
                <TextField
                  key={prop}
                  id={prop}
                  variant="outlined"
                  size="small"
                  label={prop === "LESS" ? "<" : prop === "GREATER" ? ">" : "="}
                  fullWidth
                  disabled={disabled ? true : false}
                  onChange={(event) => {
                    if (prop === "EQUALS") {
                      delete ele.LESS;
                      delete ele.GREATER;
                    } else if (prop === "GREATER" || prop === "LESS") {
                      delete ele.EQUALS;
                    }

                    ele[prop] = event.target.value;
                    forceUpdate();
                  }}
                />
              );
            })}
          </div>
        </>
      );

    case "Email":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={(event) => (ele.SEARCHEDVALUE = event.target.value)}
          />
        </>
      );

    case "Single Line Text":
    case "Multiple Line Text":
    case "Action":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              padding: "0 1rem",
            }}
          >
            {["STARTSWITH", "ENDSWITH", "CONTAINS"].map((prop) => {
              const disabled =
                (prop === "STARTSWITH" && (ele.ENDSWITH || ele.CONTAINS)) ||
                (prop === "ENDSWITH" && (ele.STARTSWITH || ele.CONTAINS)) ||
                (prop === "CONTAINS" && (ele.STARTSWITH || ele.ENDSWITH));

              return (
                <TextField
                  key={prop}
                  id={prop}
                  variant="outlined"
                  size="small"
                  label={
                    prop === "STARTSWITH"
                      ? "Starts with"
                      : prop === "ENDSWITH"
                      ? "Ends with"
                      : "Contains"
                  }
                  fullWidth
                  disabled={disabled ? true : false}
                  onChange={(event) => {
                    if (prop === "STARTSWITH") {
                      delete ele.ENDSWITH;
                      delete ele.CONTAINS;
                    } else if (prop === "ENDSWITH") {
                      delete ele.STARTSWITH;
                      delete ele.CONTAINS;
                    } else if (prop === "CONTAINS") {
                      delete ele.STARTSWITH;
                      delete ele.ENDSWITH;
                    }

                    ele[prop] = event.target.value;
                    forceUpdate();
                  }}
                  onClean={() => {
                    delete ele[prop];
                    forceUpdate();
                  }}
                />
              );
            })}
          </div>
        </>
      );

    case "Dynamic Lookup":
      return (
        <>
          <Autocomplete
            onChange={(event, newValue) => {
              ele.SEARCHEDVALUE = newValue;
            }}
            options={ele?.OPTIONS}
            renderInput={(params) => (
              <TextField
                {...params}
                label={ele.FIELD_NAME}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </>
      );

    case "Dynamic Lookup Multiple Choice":
      return (
        <>
          <Autocomplete
            multiple
            onChange={(event, newValue) => {
              ele.SEARCHEDVALUES = newValue;
            }}
            options={ele?.OPTIONS}
            renderInput={(params) => (
              <TextField
                {...params}
                label={ele.FIELD_NAME}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </>
      );

    case "Checkbox":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <FormGroup row={true}>
            {ele.OPTIONS?.map((option, index) => {
              return (
                <FormControlLabel
                  key={option.OPTION_ID}
                  control={
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        if (!ele.SEARCHEDVALUES) ele.SEARCHEDVALUES = [];
                        if (e.target?.checked) {
                          if (
                            !ele.SEARCHEDVALUES?.includes(option?.OPTION_NAME)
                          ) {
                            ele.SEARCHEDVALUES?.push(option?.OPTION_NAME);
                          }
                        } else {
                          ele.SEARCHEDVALUES = ele.SEARCHEDVALUES?.filter(
                            (selectedOption) =>
                              selectedOption !== option?.OPTION_NAME
                          );
                        }
                        if (ele.SEARCHEDVALUES.length === 0)
                          delete ele.SEARCHEDVALUES;
                      }}
                    />
                  }
                  label={option?.OPTION_NAME}
                />
              );
            })}
          </FormGroup>
        </>
      );

    case "Date-Time":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <div style={{ paddingRight: "1rem" }}>
            {["Before", "After", "Actual"].map((label) => {
              const isActual = label === "Actual";
              const isBeforeOrAfter = label === "Before" || label === "After";

              const disabled =
                (isActual && (ele.BEFORE || ele.AFTER)) ||
                (isBeforeOrAfter && ele.ACTUAL)
                  ? true
                  : false;

              return (
                <DatePicker
                  key={label}
                  label={label}
                  size="md"
                  block
                  disabled={disabled}
                  value={ele[label.toUpperCase()]}
                  onChange={(event) => {
                    if (event !== null) {
                      if (label === "Actual") {
                        delete ele.ACTUAL;
                        delete ele.BEFORE;
                      } else if (label === "Before" || label === "After") {
                        delete ele.ACTUAL;
                      }
                      ele[label.toUpperCase()] = event;
                      forceUpdate();
                    }
                  }}
                  onClean={() => {
                    delete ele[label.toUpperCase()];
                    forceUpdate();
                  }}
                />
              );
            })}
          </div>
        </>
      );

    case "Radio Button":
      return (
        <>
          <InputLabel>{ele.FIELD_NAME}</InputLabel>
          <RadioGroup row>
            {ele.OPTIONS?.map((option) => (
              <FormControlLabel
                key={option?.OPTION_ID}
                value={option?.OPTION_NAME}
                control={
                  <Radio
                    size="small"
                    onChange={(event) => {
                      if (event.target.checked) {
                        ele.SEARCHEDVALUE = event.target.value;
                        forceUpdate();
                      } else {
                        delete ele.SEARCHEDVALUE;
                        forceUpdate();
                      }
                    }}
                    onClean={() => {
                      delete ele.SEARCHEDVALUE;
                      forceUpdate();
                    }}
                  />
                }
                label={option.OPTION_NAME}
              />
            ))}
          </RadioGroup>
        </>
      );

    case "Text Lookup":
      return (
        <>
          <Autocomplete
            onChange={(event, newValue) => {
              ele.SEARCHEDVALUE = newValue;
            }}
            options={ele.OPTIONS.map((opt) => opt.OPTION_NAME)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={ele.FIELD_NAME}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </>
      );

    case "Text Lookup Multiple Choice":
      return (
        <>
          <Autocomplete
            multiple
            onChange={(event, newValue) => {
              ele.SEARCHEDVALUES = newValue;
            }}
            options={ele.OPTIONS.map((opt) => opt.OPTION_NAME)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={ele.FIELD_NAME}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </>
      );

    default:
      return null;
  }
};

const getRequestArray = (fieldList) => {
  const objectsToBeModified = [
    "Phone Number",
    "Dynamic Lookup",
    "Radio Button",
    "Email",
    "Text Lookup",
  ];
  const requestArray = fieldList.map((field) => {
    if (!objectsToBeModified.includes(field.DATA_TYPE)) return field;
    else {
      switch (field.DATA_TYPE) {
        case "Phone Number":
          return {
            ...field,
            VALUE: field.SEARCHVALUE,
          };
        case "Checkbox":
          return {
            ...field,
            SEARCHEDVALUES: field.SEARCHEDVALUE,
          };
        case "Dynamic Lookup":
        case "Radio Button":
        case "Email":
        case "Text Lookup":
          return {
            ...field,
            VALUE: field.SEARCHEDVALUE,
          };
        default:
          return null;
      }
    }
  });
  return requestArray;
};

const SearchFieldGen = (props) => {
  const { fieldList, OBJ_ID } = props;
  const [gridDataState, setgridDataState] = useState({
    data: [],
    colDef: null,
  });

  const handleClickSearch = async (fieldList) => {
    console.log("------>>>>>>", fieldList);
    const requestArray = getRequestArray(fieldList);
    const data = await getsearchResult(requestArray);
    const headers = await fetchTableHeaders({ OBJ_ID });

    if (data.length !== 0) {
      setgridDataState({
        data: [...data],
        colDef: headers,
      });
    } else {
      setgridDataState({
        data: [],
        colDef: headers,
      });
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        rowSpacing={3}
        sx={{ margin: "1rem", padding: "1rem", backgroundColor: "#eee" }}
      >
        {fieldList &&
          fieldList.map((ele) =>
            ele.IS_SEARCHABLE === true ? (
              <Grid item xs={3} key={ele.FIELD_NAME}>
                {fieldGen(ele)}
              </Grid>
            ) : null
          )}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickSearch(fieldList)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {gridDataState.colDef !== null && (
        <SearchResultGrid
          data={gridDataState.data}
          columnDefs={gridDataState.colDef}
          OBJ_ID={OBJ_ID}
        />
      )}
    </>
  );
};

export default SearchFieldGen;
