import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Input, InputLabel, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker } from "rsuite";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FileUpload } from "@mui/icons-material";
// import { Upload } from "@progress/kendo-react-upload";
// const saveUrl = "https://demos.telerik.com/kendo-ui/service-v4/upload/save";
// const removeUrl = "https://demos.telerik.com/kendo-ui/service-v4/upload/remove";
// import "@progress/kendo-theme-default/dist/all.css";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import MenuItem from "@mui/material/MenuItem";
const UserFieldGenerator = ({ ele }) => {
  const [state, setState] = useState({
    Date_Time: new Date(),
    Radio_Button: "",
    Number: "",
    Dynamic_Lookup: "",
    Checkbox: false,
    Password: "",
    Multiple_Line_Text: "",
    Text_Lookup_Multiple_Choice: "",
    Text_Lookup: "",
    Attachment: "",
    Single_Line_Text: "",
    Email: "",
    Dynamic_Lookup_Multiple_Choice: "",
    Phone_Number: "",
  });

  const [expanded, setExpanded] = React.useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  const [editAttr1, seteditAttr1] = useState(false);

  const handleChangePhoneNumber = (e) => {
    setState({
      ...state,
      Phone_Number: e.target.value,
    });
  };

  const handleLabelClick = () => {
    seteditAttr1(true);
  };
  const handleSavelClick = () => {
    seteditAttr1(false);
  };

  const handleCloseClick = () => {
    seteditAttr1(false);
  };

  const data = {
    DATA_TIME: state.Date_Time,
    NUMBER: state.Number,
    CHECKBOX: state.Checkbox,
    PASSWORD: state.Password,
    MULTIPLE_LINE_TEXT: state.Multiple_Line_Text,
    SINGLE_LINE_TEXT: state.Single_Line_Text,
    EMAIL: state.Email,
    PHONE_NUMBER: state.Phone_Number,
  };
  console.log(state.Date_Time);

  let all_list = () => {
    if (ele.type === "Date-Time") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <DatePicker
                  selected={state.Date_Time}
                  onChange={(date) =>
                    setState({
                      ...state,
                      Date_Time: date,
                    })
                  }
                />
                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Radio Button") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Number") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <TextField
                  id="outlined-basic"
                  placeholder={ele.type}
                  variant="outlined"
                  size="small"
                  value={state.Number}
                  onChange={(e) => {
                    setState({
                      ...state,
                      Number: e.target.value,
                    });
                  }}
                  fullWidth
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Password") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <TextField
                  id="outlined-basic"
                  placeholder={ele.type}
                  variant="outlined"
                  size="small"
                  value={state.Password}
                  onChange={(e) => {
                    setState({
                      ...state,
                      Password: e.target.value,
                    });
                  }}
                  fullWidth
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Dynamic Lookup") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Checkbox") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div fullWidth>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                  fullWidth
                  checked={state.Checkbox}
                  onChange={(e) => {
                    setState({
                      ...state,
                      Checkbox: e.target.checked,
                    });
                  }}
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Multiple Line Text") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <TextField
                  id="outlined-basic"
                  placeholder={ele.type}
                  variant="outlined"
                  size="small"
                  value={state.Multiple_Line_Text}
                  onChange={(e) => {
                    setState({
                      ...state,
                      Multiple_Line_Text: e.target.value,
                    });
                  }}
                  fullWidth
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Text Lookup Multiple Choice") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Text Lookup") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Attachment") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                {/* <Upload
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={saveUrl}
                  removeUrl={removeUrl}
                /> */}

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Single Line Text") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <TextField
                  id="outlined-basic"
                  placeholder={ele.type}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={state.Single_Line_Text}
                  onChange={(e) => {
                    setState({
                      ...state,
                      Single_Line_Text: e.target.value,
                    });
                  }}
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Email") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <TextField
                  id="outlined-basic"
                  placeholder={ele.type}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={state.Email}
                  onChange={(e) => {
                    setState({
                      ...state,
                      Email: e.target.value,
                    });
                    console.log(state.Email);
                  }}
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Dynamic Lookup Multiple Choice") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    } else if (ele.type === "Phone Number") {
      return (
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{ border: "1px solid #eee " }}
          >
            {!editAttr1 ? (
              <Typography onClick={handleLabelClick}>{ele.name}</Typography>
            ) : (
              <div>
                <TextField
                  id="outlined-basic"
                  placeholder={ele.type}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={state.Phone_Number}
                  onChange={(e) => {
                    handleChangePhoneNumber(e);
                  }}
                />

                <Button onClick={handleSavelClick}>
                  <CheckIcon />
                </Button>

                <Button onClick={handleCloseClick}>
                  <ClearIcon />
                </Button>
              </div>
            )}
          </AccordionSummary>
        </>
      );
    }
  };

  return <>{all_list()}</>;
};

export default UserFieldGenerator;
