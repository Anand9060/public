import React from "react";
import SingleLineText from "../../fields/SingleLineText";
import Number from "../../fields/Number";
import PhoneNumber from "../../fields/PhoneNumber";
import DateTime from "../../fields/DateTime";
const useGetField = (DATA_TYPE_ID, FIELD_ID, NAME, handleOnChange) => {
  const getField = () => {
    const name = `Enter value for ${NAME}`;
    const required = true;
    switch (DATA_TYPE_ID) {
      case "1": {
        return (
          <SingleLineText
            RULES={[]}
            FIELD_ID={FIELD_ID}
            NAME={name}
            handleOnChange={handleOnChange}
            REQUIRED={required}
          />
        );
      }
      case "8": {
        return (
          <PhoneNumber
            RULES={[]}
            FIELD_ID={FIELD_ID}
            NAME={name}
            handleOnChange={handleOnChange}
            REQUIRED={required}
          />
        );
      }
      case "10": {
        return (
          <SingleLineText
            RULES={[]}
            FIELD_ID={FIELD_ID}
            NAME={name}
            handleOnChange={handleOnChange}
            REQUIRED={required}
          />
        );
      }
      case "11": {
        return (
          <DateTime
            RULES={[]}
            FIELD_ID={FIELD_ID}
            NAME={name}
            handleOnChange={handleOnChange}
            REQUIRED={required}
          />
        );
      }
      case "12": {
        return (
          <Number
            RULES={[]}
            FIELD_ID={FIELD_ID}
            NAME={name}
            handleOnChange={handleOnChange}
            REQUIRED={required}
          />
        );
      }
    }
  };
  return getField();
};
export default useGetField;
