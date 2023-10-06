import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
const MasterDataEntry = ({
  open,
  closeManageCase,
  object,
  handleTextChange,
}) => {
  //   console.log(object);
  return (
    <Dialog
      open={open}
      keepMounted
      fullWidth={true}
      onClose={closeManageCase}
      //   key={eles.fieldId}
    >
      <DialogTitle id="alert-dialog-slide-title">{object.OBJ_NAME}</DialogTitle>
      <Divider variant="middle" mt={0} />

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {object.ITEMS.map((field, index) => {
            switch (field.DATA_TYPE) {
              case "Single Line Text":
              case "Multiple Line Text":
              case "Password":
              case "Action":
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
                      value={field.FIELD_VALUE}
                      onChange={handleTextChange(object.OBJ_ID, field.FIELD_ID)}
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
                      //   value={field.VALUE}
                      variant="outlined"
                      size="small"
                      fullWidth
                      style={{ marginBottom: "1rem" }}
                      type="number"
                      //   onChange={(event) =>
                      //     handleOnChange(field.FIELD_ID, event.target.value)
                      //   }
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
                      //   label={field.FIELD_NAME}
                      //   value={field.VALUE}
                      //   onChange={(event) =>
                      //     handleOnChange(field.FIELD_ID, event.target.value)
                      //   }
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
                          //   value={field.VALUE}
                          //   onChange={(event) =>
                          //     handleOnChange(field.FIELD_ID, event.target.value)
                          //   }
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
                        // value={new Date(field.VALUE)}
                        // onChange={(value) => handleOnChange(field.FIELD_ID, value)}
                      />
                    </Grid>
                  </Grid>
                );

              case "Text Lookup":
                return (
                  <Grid
                    key={field.FIELD_ID}
                    xs={12}
                    style={{ padding: 5, margin: 5 }}
                  >
                    <Autocomplete
                      disablePortal
                      //   value={field.VALUE}
                      //   onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
                      //   options={field.OPTIONS.map((option) => option.OPTION_NAME)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          //   label={field.FIELD_NAME}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                );

              case "Dynamic Lookup":
                return (
                  <Grid
                    key={field.FIELD_ID}
                    xs={12}
                    style={{ padding: 5, margin: 5 }}
                  >
                    <Autocomplete
                      disablePortal
                      //   value={field.VALUE}
                      //   onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
                      //   options={field.OPTIONS}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          //   label={field.FIELD_NAME}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                );

              case "Text Lookup Multiple Choice":
                console.log("TLMC", field);
                return (
                  <Grid
                    key={field.FIELD_ID}
                    xs={12}
                    style={{ padding: 5, margin: 5 }}
                  >
                    <Autocomplete
                      multiple
                      //   onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
                      //   options={field.OPTIONS.map((option) => option.OPTION_NAME)}
                      //   value={field.VALUE}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          //   label={field.FIELD_NAME}
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
                  <Grid
                    key={field.FIELD_ID}
                    xs={12}
                    style={{ padding: 5, margin: 5 }}
                  >
                    <Autocomplete
                      multiple
                      // onChange={(event, value) => handleOnChange(field.FIELD_ID, value)}
                      // options={field.OPTIONS}
                      // value={field.VALUE}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label={field.FIELD_NAME}
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
          })}
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
          <Button color="primary" onClick={() => closeManageCase()}>
            Cancel
          </Button>

          <Button color="primary">Save</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default MasterDataEntry;
