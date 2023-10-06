import React, { useEffect, useState } from "react";
import { fetchLayoutJSON, saveFromDataApi } from "../../services/PageLayoutApi";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Grid, Button, Box, Autocomplete } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Typography } from "@mui/material";
import { getLookUpOptionList } from "../../services/objectApi";
import SingleLineText from "../../fields/SingleLineText";
import Number from "../../fields/Number";
import PhoneNumber from "../../fields/PhoneNumber";
import Email from "../../fields/Email";
import DateTime from "../../fields/DateTime";

const DataEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let tempArr = [];
  const StatusData = {
    FIELD_ID: null,
    VALUE: null,
  };

  const [layoutJSON, setLayoutJSON] = useState(null);
  const [requestBody, setRequestBody] = useState({
    OBJ_ID: "",
    LAYOUT_ID: "",
    DATA: [],
    REFERENCE_OBJ_LIST: [],
  });
  const [formErrors, setFormErrors] = useState({});

  const { object_id, layout_id } = location.state;

  const getOptions = (fieldId) => {
    const getOptionsFromAPI = async (fieldId) => {
      try {
        const res = await getLookUpOptionList({ FIELD_ID: fieldId });
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    };

    return getOptionsFromAPI(fieldId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRequestBody({
          ...requestBody,
          OBJ_ID: object_id,
          LAYOUT_ID: layout_id,
        });

        const res = await fetchLayoutJSON({
          OBJ_ID: object_id,
          LAYOUT_ID: layout_id,
        });

        console.log(res.data, "------------->");

        setLayoutJSON(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [object_id, layout_id]);

  const filterCheckBoxArray = (array, val) => {
    if (array.includes(val)) {
      return array.filter((ele) => ele !== val);
    }
    array.push(val);
    return array;
  };

  const handleOnChange = (field_id, value, checkbox = false) => {
    let flag = false;
    const updatedData = requestBody.DATA.map((obj) => {
      if (obj.FIELD_ID === field_id) {
        flag = true;
        if (!checkbox) {
          return { ...obj, VALUE: value };
        } else {
          const filteredArray = filterCheckBoxArray(obj.VALUE, value);
          return { ...obj, VALUE: filteredArray };
        }
      }
      return obj;
    });

    if (!flag) {
      const newData = checkbox ? [value] : value;

      updatedData.push({
        FIELD_ID: field_id,
        VALUE: newData,
      });
    }

    setRequestBody({
      ...requestBody,
      DATA: updatedData,
    });
  };

  const handleOnClick = async (event) => {
    const StatusData = {};
    event.preventDefault();
    const errors = {};
    let hasError = false;
    const extractStatusData = (jsonData) => {
      if (jsonData.TYPE === "Field" && jsonData.NAME === "Status") {
        StatusData.FIELD_ID = jsonData.FIELD_ID;
        StatusData.VALUE = jsonData.TARGET_VALUE;
        requestBody.DATA.push(StatusData);
      } else if (jsonData.CHILDREN) {
        jsonData.CHILDREN.forEach((child) => {
          extractStatusData(child);
        });
      }
    };

    extractStatusData(layoutJSON);
    const mappingObjectIDFun = (jsonData) => {
      console.log();
      if (jsonData.TYPE === "Field") {
        requestBody.DATA.map((ele) => {
          if (ele.FIELD_ID === jsonData.FIELD_ID) {
            (ele.MAPPING_OBJECT_FIELD_ID = jsonData.MAPPING_OBJECT_FIELD_ID),
              (ele.MAPPING_OBJECT_ID = jsonData.MAPPING_OBJECT_ID);
          }
        });
      } else if (jsonData.CHILDREN) {
        jsonData.CHILDREN.forEach((child) => {
          mappingObjectIDFun(child);
        });
      }
    };

    mappingObjectIDFun(layoutJSON);

    layoutJSON.CHILDREN.forEach((section) => {
      if (section.REFERENCE_OBJ_NAME) {
        requestBody.REFERENCE_OBJ_LIST.push(section);
      }
      if (section.TYPE == "section") {
        section.CHILDREN.forEach((child) => {
          if (child.TYPE === "Field") {
            const field_id = child.FIELD_ID;
            const value = requestBody.DATA.find(
              (obj) => obj.FIELD_ID === field_id
            )?.VALUE;
            if (!value) {
              errors[field_id] = true;
              hasError = true;
            }
          }
        });
      }
    });

    if (hasError) {
      setFormErrors(errors);
    } else {
      // layoutJSON.CHILDREN.forEach((ele) => {
      //   if (ele.REFERENCE_OBJ_NAME) {
      //     requestBody.REFERENCE_OBJ_LIST.push(ele);
      //   }
      // });

      try {
        console.log(tempArr);

        const data = [requestBody];

        console.log("DATA SUBMITTED", requestBody);
        const res = await saveFromDataApi(data);
        alert("Form saved successfully");
        console.log("Response", res);
        setRequestBody({
          ...requestBody,
          DATA: [],
        });
        navigate(-1);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const generateFieldJSX = (fieldJSON) => {
    const {
      DATA_TYPE,
      FIELD_ID,
      NAME,
      RULES,
      OPTIONS,
      DOPTIONS,
      TARGET_VALUE,
    } = fieldJSON;
    const error = formErrors[FIELD_ID] || false;

    switch (DATA_TYPE) {
      case "Single Line Text":
      case "Multiple Line Text":
      case "Password":
      case "Action":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <SingleLineText
              FIELD_ID={FIELD_ID}
              NAME={NAME}
              RULES={RULES}
              handleOnChange={handleOnChange}
              REQUIRED={true}
            />
          </div>
        );

      case "Number":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Number
              FIELD_ID={FIELD_ID}
              NAME={NAME}
              RULES={RULES}
              handleOnChange={handleOnChange}
              REQUIRED={true}
            />
          </div>
        );

      case "Phone Number":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <PhoneNumber
              FIELD_ID={FIELD_ID}
              NAME={NAME}
              RULES={RULES}
              handleOnChange={handleOnChange}
              REQUIRED={true}
            />
          </div>
        );

      case "Email":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Email
              FIELD_ID={FIELD_ID}
              NAME={NAME}
              RULES={RULES}
              handleOnChange={handleOnChange}
              REQUIRED={true}
            />
          </div>
        );

      case "Radio Button":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <InputLabel>{NAME}</InputLabel>
              </Grid>
              <Grid item>
                <FormControl component="fieldset" error={error}>
                  <RadioGroup
                    id={FIELD_ID}
                    aria-label="radio-buttons-group"
                    name="radio-buttons-group"
                    row
                    required
                    onChange={(event) =>
                      handleOnChange(FIELD_ID, event.target.value)
                    }
                  >
                    {OPTIONS.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        );

      case "Date-Time":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <DateTime
              FIELD_ID={FIELD_ID}
              NAME={NAME}
              RULES={RULES}
              handleOnChange={handleOnChange}
              REQUIRED={true}
            />
          </div>
        );

      case "Dropdown":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <FormControl fullWidth required error={error}>
              <InputLabel>{NAME}</InputLabel>
              <Select
                id={FIELD_ID}
                onChange={(event) =>
                  handleOnChange(FIELD_ID, event.target.value)
                }
              >
                {OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );

      case "Checkbox":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Grid container spacing={2}>
              <Grid item>
                <InputLabel>{NAME}</InputLabel>
              </Grid>
              <Grid item>
                <FormGroup id={FIELD_ID} row required={true} error={error}>
                  {OPTIONS.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={
                        <Checkbox
                          onChange={(event) =>
                            handleOnChange(FIELD_ID, event.target.value, true)
                          }
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </div>
        );

      case "Text Lookup":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Autocomplete
              disablePortal
              onChange={(event, value) => handleOnChange(FIELD_ID, value)}
              options={OPTIONS}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={NAME}
                  variant="outlined"
                  required
                  error={error}
                  helperText={error && "This field is required"}
                />
              )}
            />
          </div>
        );

      case "Text Lookup Multiple Choice":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Autocomplete
              disablePortal
              multiple
              onChange={(event, value) => handleOnChange(FIELD_ID, value)}
              options={OPTIONS}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={NAME}
                  variant="outlined"
                  required
                  error={error}
                  helperText={error && "This field is required"}
                />
              )}
            />
          </div>
        );

      case "Dynamic Lookup":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Autocomplete
              onChange={(event, value) => handleOnChange(FIELD_ID, value)}
              options={DOPTIONS}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={NAME}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        );

      case "Dynamic Lookup Multiple Choice":
        return (
          <div key={FIELD_ID} id={FIELD_ID}>
            <Autocomplete
              disablePortal
              multiple
              onChange={(event, value) => handleOnChange(FIELD_ID, value)}
              options={DOPTIONS}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={NAME}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        );
      case "Workflow":
        return (
          <div
            key={FIELD_ID}
            id={FIELD_ID}
            style={{
              width: "40%",
              height: "200%",
            }}
          >
            {NAME}

            <div
              style={{
                border: "2px solid black",
                width: "40%",
                height: "40%",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {TARGET_VALUE}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const generateSectionJSX = (sectionJSON) => {
    return (
      <div
        key={sectionJSON.SECTION_ID}
        style={{
          padding: "20px",
          backgroundColor: "#e8e6e6",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={2}>
          {sectionJSON.CHILDREN.map((child, index) => {
            if (child.TYPE === "Field") {
              return (
                <Grid item xs={6} key={index}>
                  {generateFieldJSX(child)}
                </Grid>
              );
            } else if (
              child.TYPE === "section" &&
              child.CHILDREN.length !== 0
            ) {
              return (
                <Grid item xs={12} key={index}>
                  {generateSectionJSX(child)}
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </div>
    );
  };

  const generateLayoutJSX = () => {
    return (
      <>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#e8e6e6",
            marginBottom: "5px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h3" component="h3" style={{ margin: "20px" }}>
            {layoutJSON.LAYOUT_NAME}
          </Typography>
          <hr
            style={{
              marginTop: "10px",
              marginInline: "20px",
              border: "none",
              borderBottom: "3px solid grey",
              borderRadius: "20%",
            }}
          />
        </div>
        {generateSectionJSX(layoutJSON)}
      </>
    );
  };

  const isFormValid = () => {
    return Object.values(formErrors).every((value) => value === false);
  };

  return (
    <>
      <Header />
      <div style={{ marginInline: "100px" }}>
        <form onSubmit={handleOnClick}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ margin: "20px" }}>
              {layoutJSON ? generateLayoutJSX() : "Loading..."}
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="flex-end"
            marginTop="2rem"
            marginRight="2rem"
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isFormValid()}
            >
              Save
            </Button>
          </Box>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DataEntry;
