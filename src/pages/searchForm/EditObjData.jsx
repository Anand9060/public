import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchObjectFieldList } from "../../services/objectApi";

import {
  editFromData,
  fetchFormData,
  getLookUpOptionList,
  saveFromDataApi,
} from "../../services/PageLayoutApi";
import { Container, DatePicker, Footer, Grid } from "rsuite";
import { generate } from "shortid";
import { Button } from "@mui/material";
import {
  Autocomplete,
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

// import EditObjData from "./EditObjData";

import Icons from "../../components/Icons";

const EditObjData = () => {
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const { ID, OBJ_ID } = location.state;

  // console.log(ID, OBJ_ID,"----------------->id");

  useEffect(() => {
    console.log("useEffect");
    const getOptions = async (data) => {
      const res = await getLookUpOptionList(data);

      console.log(res.data);
      return res.data;
    };

    const setup = async () => {
      let newList = [];

      const fList = (await fetchObjectFieldList({ OBJ_ID })).data;
      console.log("Field List", fList);

      console.log(ID);

      const fData = await fetchFormData({ ID });
      console.log("Form Data", fData);
      // masterObjArr.push(fData.MASTER_OBJECT);

      for (const field of fData.DATA) {
        const FIELD = fList.find((ele) => ele.FIELD_ID === field.FIELD_ID);
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

      console.log(newList);
    };

    setup();
  }, []);

  const handleOnChange = (fieldId, value) => {
    let index = -1;
    formData.forEach((ele, i) => {
      if (ele.FIELD_ID === fieldId) index = i;
    });
    const newFormData = JSON.parse(JSON.stringify(formData));
    if (index !== -1) {
      newFormData[index].VALUE = value;
    }
    setFormData(newFormData);
    console.log(formData);
  };

  const handleOnClick = () => {
    console.log("----");
    console.log(formData);
    const data = [
      {
        ID,
        DATA: formData,
        REFERENCE_OBJ_LIST: [],
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

  // console.log(masterObjArr, "-------------------->");

  const generateFieldJSX = (field) => {
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
        console.log("TLMC", field);
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
        console.log("DLMC", field);
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

      default:
        return null;
    }
  };

  const generateDefaultLayout = (formData) => {
    return formData.map((field) => generateFieldJSX(field));
  };

  return (
    <Container maxWidth="xl" key="container">
      <Header />
      <br />
      <br />

      <Grid container spacing={2} style={{ marginY: 50 }}>
        {formData ? (
          <>
            <div>{generateDefaultLayout(formData)}</div>
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
              </Button>
            </Grid>
          </>
        ) : (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>

      <Footer />
    </Container>
  );
};

export default EditObjData;
