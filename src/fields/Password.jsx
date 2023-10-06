import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import validationLibrary from "./validationLibrary";

function Password({ RULES, FIELD_ID, NAME, handleOnChange }) {
  const inputRef = useRef(null);
  const [helperText, setHelperText] = useState("");

  const validateInput = (value) => {
    for (const validationType of RULES) {
      if (!validationLibrary(validationType.VALIDATION_TYPE, value, FIELD_CONSTANT_1, FIELD_CONSTANT_2)) {
        return validationType.USER_MESSAGE;
      }
    }
    return ""; // No validation error
  };

  const handleInputChange = () => {
    const inputValue = inputRef.current.value;
    const validationMessage = validateInput(inputValue);
    inputRef.current.setCustomValidity(validationMessage);
    handleOnChange(FIELD_ID, inputValue);
    setHelperText(validationMessage);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      label={NAME}
      type="password" // Change the input type to "password"
      inputRef={inputRef}
      onChange={handleInputChange}
      error={Boolean(inputRef?.current?.validationMessage)}
      helperText={helperText}
    />
  );
}

export default React.memo(Password);
