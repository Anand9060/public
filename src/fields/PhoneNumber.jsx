import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import validationLibrary from "./validationLibrary";

function PhoneNumber({ RULES, FIELD_ID, NAME, handleOnChange, REQUIRED = false }) {
  const inputRef = useRef(null);
  const [helperText, setHelperText] = useState("");

  const validateInput = (value) => {
    for (const validationType of RULES) {
      if (!validationLibrary(validationType.VALIDATION_TYPE, value, validationType.FIELD_CONSTANT_1, validationType.FIELD_CONSTANT_2)) {
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
    required={REQUIRED}
      label={NAME}
      variant="outlined"
      fullWidth
      type="number"
      inputRef={inputRef}
      onChange={handleInputChange}
      error={Boolean(inputRef?.current?.validationMessage)}
      helperText={helperText}
    />
  );
}

export default React.memo(PhoneNumber);
