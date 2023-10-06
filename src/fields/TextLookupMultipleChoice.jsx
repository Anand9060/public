import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import validationLibrary from "./validationLibrary";

function TextLookupMultipleChoice({ FIELD_ID, NAME, handleOnChange, OPTIONS }) {
  const validateInput = (value) => {
    for (const validationType of RULES) {
      if (!validationLibrary(validationType.VALIDATION_TYPE, value, FIELD_CONSTANT_1, FIELD_CONSTANT_2)) {
        return validationType.USER_MESSAGE;
      }
    }
    return ""; // No validation error
  };

  const handleInputChange = (event, inputValue) => {
    const validationMessage = validateInput(inputValue);
    inputRef.current.setCustomValidity(validationMessage);
    handleOnChange(FIELD_ID, inputValue);
    setHelperText(validationMessage);
  };

  return (
    <Autocomplete
      disablePortal
      multiple
      onChange={handleInputChange}
      options={OPTIONS}
      renderInput={(params) => (
        <TextField
          {...params}
          label={NAME}
          variant="outlined"
          fullWidth
          error={Boolean(validateInput(params?.inputProps?.value))}
          helperText={validateInput(params?.inputProps?.value)}
        />
      )}
    />
  );
}

export default React.memo(TextLookupMultipleChoice);
