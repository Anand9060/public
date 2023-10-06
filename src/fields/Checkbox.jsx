import React from "react";
import validationLibrary from "./validationLibrary";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function Checkbox({ FIELD_ID, NAME, handleOnChange, OPTIONS }) {
  const validateInput = (value) => {
    for (const validationType of RULES) {
      if (
        !validationLibrary(
          validationType.VALIDATION_TYPE,
          value,
          FIELD_CONSTANT_1,
          FIELD_CONSTANT_2
        )
      ) {
        return validationType.USER_MESSAGE;
      }
    }
    return ""; // No validation error
  };

  const handleInputChange = (event, inputValue) => {
    const validationMessage = validateInput(inputValue);
    inputRef.current.setCustomValidity(validationMessage);
    handleOnChange(FIELD_ID, inputValue, true);
    setHelperText(validationMessage);
  };

  return (
    <FormGroup id={FIELD_ID} row required={true} error={error}>
      {OPTIONS.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={
            <Checkbox
              onChange={(event) =>
                handleInputChange(FIELD_ID, event.target.value)
              }
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  );
}

export default React.memo(Checkbox);
