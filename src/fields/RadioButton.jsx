import React from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

function RadioButtonField({ FIELD_ID, OPTIONS, handleOnChange }) {
  return (
    <FormControl component="fieldset" error={error}>
      <RadioGroup
        id={FIELD_ID}
        aria-label="radio-buttons-group"
        name="radio-buttons-group"
        row
        required
        onChange={(event) => handleOnChange(FIELD_ID, event.target.value)}
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
  );
}

export default RadioButtonField;
