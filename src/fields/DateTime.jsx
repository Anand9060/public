import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import validationLibrary from "./validationLibrary";

function DateTime({ RULES, FIELD_ID, NAME, handleOnChange, REQUIRED = false }) {
  const [value, setValue] = useState(null);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    console.log("Helper Text Updated:", helperText);
  }, [helperText]);

  const validateInput = (value) => {
    for (const validationType of RULES) {
      if (
        !validationLibrary(
          validationType.VALIDATION_TYPE,
          value,
          validationType.FIELD_CONSTANT_1,
          validationType.FIELD_CONSTANT_2
        )
      ) {
        return validationType.USER_MESSAGE;
      }
    }
    return "";
  };

  const handleDateChange = (date) => {
    setValue(date);
    const validationMessage = validateInput(date);
    setHelperText(validationMessage);
    handleOnChange(FIELD_ID, date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={NAME}
        value={value}
        onChange={handleDateChange}
        slotProps={{
          textField: {
            error: Boolean(helperText),
            helperText: helperText,
          },
        }}
      
      />
    </LocalizationProvider>
  );
}

export default React.memo(DateTime);
