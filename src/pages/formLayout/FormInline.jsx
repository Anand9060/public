import { times } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";

import {
  Paper,
  Grid,
  Backdrop,
  CircularProgress,
  Container,
  Typography,
  TextField,
  Button,
  InputLabel,
  Box,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
var node = null;
var count = 0;

const FormInline = ({
  layout,
  handleChange,
  handleFieldClick,
  handleSaveFieldData,
  handleCloseFieldData,
  handleDateChange,
  handleCheckboxChange,
  handleMultiSelectChange,
}) => {
  // const [layout, setLayout] = useState(layout);
  const showFieldOptionList = (id) => {
    let componenets = [];
    if (layout.child.length !== 0) {
      layout.child.map((element, index) => {
        if (element.type == "Section") {
          return showFieldOptionList(id);
        } else {
          if (element.field_id == id) {
            componenets = element.options.map((ele, indx) => (
              // console.log(ele.OPTION_NAME)
              <MenuItem value={ele.OPTION_NAME} key={ele.OPTION_ID}>
                {ele.OPTION_NAME}
              </MenuItem>
            ));
          }
        }
      });
    }
    return componenets;
  };
  const showFieldMulitOptionList = (id) => {
    let componenets = [];
    if (layout.child.length !== 0) {
      layout.child.map((element, index) => {
        if (element.type == "Section" && element.child > 0) {
          return showFieldMulitOptionList(id);
        } else {
          if (element.field_id == id) {
            element.options.map((ele) => {
              componenets.push(ele.OPTION_NAME);
            });
          }
        }
      });
    }
    // console.log(componenets);
    return componenets;
  };

  const allInlineFieldListFun = () => {
    return (
      <Grid
        item
        xs={layout.width}
        id={layout.section_id}
        style={{ border: "1px", borderStyle: "dotted", borderColor: "green" }}
      >
        <Grid container fullWidth>
          {layout.child.map((ele) => {
            if (ele.type == "Section") {
              return (
                <FormInline
                  layout={ele}
                  handleChange={handleChange}
                  handleFieldClick={handleFieldClick}
                  handleSaveFieldData={handleSaveFieldData}
                  handleCloseFieldData={handleCloseFieldData}
                  handleDateChange={handleDateChange}
                  handleCheckboxChange={handleCheckboxChange}
                  handleMultiSelectChange={handleMultiSelectChange}
                />
              );
            } else if (ele.type == "Text Lookup") {
              return (
                <Grid item xs={12}>
                  {!ele.isInLineEdit ? (
                    <Box
                      sx={{ width: "100%" }}
                      onClick={() => handleFieldClick(ele.field_id)}
                    >
                      {ele.name} : {ele.value}
                    </Box>
                  ) : (
                    <>
                      <InputLabel id="demo-simple-select-label">
                        {ele.name}
                      </InputLabel>
                      <FormControl fullWidth>
                        <Select
                          id={ele.field_id}
                          size="small"
                          name={ele.field_id}
                          value={ele.value}
                          onChange={handleChange(ele.field_id, ele.section_id)}
                        >
                          {showFieldOptionList(ele.field_id)}
                        </Select>
                      </FormControl>

                      <Button
                        variant="text"
                        onClick={() => handleSaveFieldData(ele.field_id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleCloseFieldData(ele.field_id)}
                      >
                        Close
                      </Button>
                    </>
                  )}
                </Grid>
              );
            } else if (ele.type == "Text Lookup Multiple Choice") {
              return (
                <Grid item xs={12}>
                  {!ele.isInLineEdit ? (
                    <Box
                      sx={{ width: "100%" }}
                      onClick={() => handleFieldClick(ele.field_id)}
                    >
                      {ele.name} : {ele.value}
                    </Box>
                  ) : (
                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        limitTags={2}
                        size="small"
                        id="multiple-limit-tags"
                        options={showFieldMulitOptionList(ele.field_id)}
                        value={ele.value}
                        getOptionLabel={(option) => option}
                        onChange={handleMultiSelectChange(
                          ele.field_id,
                          ele.section_id
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select"
                            placeholder="Add"
                          />
                        )}
                        sx={{ width: "500px" }}
                      />

                      <Button
                        variant="text"
                        onClick={() => handleSaveFieldData(ele.field_id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleCloseFieldData(ele.field_id)}
                      >
                        Close
                      </Button>
                    </Grid>
                  )}
                </Grid>
              );
            } else if (ele.type == "Checkbox") {
              return (
                <Grid item xs={12}>
                  {!ele.isInLineEdit ? (
                    <Box
                      sx={{ width: "100%" }}
                      onClick={() => handleFieldClick(ele.field_id)}
                    >
                      {ele.name} : {ele.value}
                    </Box>
                  ) : (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label={ele.name}
                        fullWidth
                        checked={ele.value}
                        onChange={handleCheckboxChange(
                          ele.field_id,
                          ele.section_id
                        )}
                      />

                      <Button
                        variant="text"
                        onClick={() => handleSaveFieldData(ele.field_id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleCloseFieldData(ele.field_id)}
                      >
                        Close
                      </Button>
                    </Grid>
                  )}
                </Grid>
              );
            } else if (ele.type == "Date-Time") {
              return (
                <Grid item xs={12}>
                  {!ele.isInLineEdit ? (
                    <Box
                      sx={{ width: "100%" }}
                      onClick={() => handleFieldClick(ele.field_id)}
                    >
                      {ele.name} : {ele.value}
                    </Box>
                  ) : (
                    <Grid item xs={12}>
                      <InputLabel>{ele.name}</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dayjs(ele.value)}
                          format="MM/DD/YYYY"
                          onChange={handleDateChange(
                            ele.field_id,
                            ele.section_id
                          )}
                        />
                      </LocalizationProvider>

                      <Button
                        variant="text"
                        onClick={() => handleSaveFieldData(ele.field_id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleCloseFieldData(ele.field_id)}
                      >
                        Close
                      </Button>
                    </Grid>
                  )}
                </Grid>
              );
            } else if (
              ele.type == "Password" ||
              ele.type == "Phone Number" ||
              ele.type == "Multiple Line Text" ||
              ele.type == "Single Line Text" ||
              ele.type == "Number" ||
              ele.type == "Email"
            ) {
              return (
                <Grid item xs={12}>
                  {!ele.isInLineEdit ? (
                    <Box
                      sx={{ width: "100%" }}
                      onClick={() => handleFieldClick(ele.field_id)}
                    >
                      {ele.name} : {ele.value}
                    </Box>
                  ) : (
                    <>
                      <TextField
                        margin="normal"
                        required
                        id={ele.field_id}
                        name={ele.field_id}
                        fullWidth
                        autoFocus
                        size="small"
                        value={ele.value}
                        onChange={handleChange(ele.field_id)}
                      />
                      <Button
                        variant="text"
                        onClick={() => handleSaveFieldData(ele.field_id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleCloseFieldData(ele.field_id)}
                      >
                        Close
                      </Button>
                    </>
                  )}
                </Grid>
              );
            } else if (ele.type == "Radio Button") {
              return <>Radio Button</>;
            } else if (ele.type == "Attachment") {
              return <>Attachment</>;
            }
          })}
        </Grid>
      </Grid>
    );
  };

  return <>{allInlineFieldListFun()}</>;
};

export default FormInline;
