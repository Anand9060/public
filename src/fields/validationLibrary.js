const validationLibrary = (validationType, value, constant1, constant2) => {
  switch (validationType) {
    /*---------- SLT Validations Start ----------*/

    /* String should be a name. It cannot contain digits and special characters except period (.), apostrophe (') and blank space ( ) */
    case "SLT-001": {
      const pattern = /^[a-zA-Z\s'.']+$/;
      return pattern.test(value) && !/\d/.test(value); //If 'true' string is valid name, if 'false' then its not
    }

    /* String does not start with a special character for example star(*), hash(#), at(@), etc.) or number */
    case "SLT-002": {
      const pattern = /^[a-zA-Z]/;
      return pattern.test(value.charAt(0));
    }

    /*---------- SLT Validations End ----------*/

    /*---------- MLT Validations Start ----------*/
    /*---------- MLT Validations End ----------*/

    /*---------- Email Validations Start ----------*/

    /* Entered email address doamain name should match a given domain name for example simpsoft.in, cadence.com, omnicell.co.uk etc. */
    case "EML-001": {
      const pattern = /@(.+)$/;
      const match = value.match(pattern);

      if (match) {
        const extractedDomain = match[1];
        return extractedDomain === constant1;
      } else {
        return false;
      }
    }

    /* Email domain must not be equal to the given domain name */
    case "EML-002": {
      const pattern = /@(.+)$/;
      const match = value.match(pattern);

      if (match) {
        const extractedDomain = match[1];
        return extractedDomain === constant1 ? false : true;
      } else {
        return false;
      }
    }

    /*---------- Email Validations End ----------*/

    /*---------- Phone Number Validations Start ----------*/

    /* Phone number starts with the given country code */
    case "PHN-001": {
      const cleanedPhoneNumber = value.replace(/\D/g, "");
      return cleanedPhoneNumber.startsWith(constant1);
    }

    /* Phone number is an Indian Phone Number */
    case "PHN-002": {
      console.log("000")
      const cleanedPhoneNumber = value.replace(/\D/g, "");

      if (cleanedPhoneNumber.length === 10)
        return /^[789]\d{9}$/.test(cleanedPhoneNumber);
      else if (cleanedPhoneNumber.length === 11)
        return /^0\d{10}$/.test(cleanedPhoneNumber);
      else if (cleanedPhoneNumber.length === 12)
        return /^91\d{10}$/.test(cleanedPhoneNumber);
      else return false;
    }

    /*---------- Phone Number Validations End ----------*/

    /*---------- Number Validations Start ----------*/

    /* Number should be in a range  */
    case "NUM-001": {
      const number = parseFloat(value.replace(/\s/g, ""));
      return number >= constant1 && number <= constant2;
    }

    /* Number should be greater than */
    case "NUM-002": {
      const number = parseFloat(value.replace(/\s/g, ""));
      return number >= constant1;
    }

    /* Number should be less than */
    case "NUM-003": {
      const number = parseFloat(value.replace(/\s/g, ""));
      return number <= constant1;
    }

    /* Number should be a AADHAAR CARD Number */
    case "NUM-004": {
      const aadhaarPattern = /^\d{12}$/;
      return aadhaarPattern.test(value);
    }

    /*---------- Number Validations End ----------*/

    /*---------- Date Time Validations Start ----------*/

    /* Date must be after a particular given date */
    case "DTM-001": {
      const dateVal = new Date(value);
      const dateConstant1 = new Date(constant1);
      return dateVal >= dateConstant1;
    }

    /* Date must be before a particular given date */
    case "DTM-002": {
      const dateVal = new Date(value);
      const dateConstant1 = new Date(constant1);
      return dateVal <= dateConstant1;
    }

    /*---------- Date Time Validations End ----------*/

    default:
      return null;
  }
};

export default validationLibrary;
