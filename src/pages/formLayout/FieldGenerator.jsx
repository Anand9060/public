import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Input, InputLabel } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, DatePicker, Grid } from "rsuite";

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
import Divider from "@mui/material/Divider";

const FieldGenerator = ({ ele, handleFieldDelete }) => {
  const [state, setState] = useState(ele.name);
  //   console.log(ele);

  const [expanded, setExpanded] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let all_list = () => {
    if (ele.DATA_TYPE === "Date-Time") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>

            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>

              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                fullWidth
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />

              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Radio Button") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                fullWidth
              />
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
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Number") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Password") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Dynamic Lookup") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Checkbox") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Label"
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Multiple Line Text") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Text Lookup Multiple Choice") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Text Lookup") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />
              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Attachment") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              {/* <Upload
                defaultFiles={[]}
                withCredentials={false}
                saveUrl={saveUrl}
                removeUrl={removeUrl}
              /> */}
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (
      ele.DATA_TYPE === "Single Line Text" ||
      ele.DATA_TYPE === "Action"
    ) {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Email") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Dynamic Lookup Multiple Choice") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Phone Number") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (ele.DATA_TYPE === "Workflow") {
      return (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {expanded !== "panel1" ? (
                <Typography sx={{ color: "text.secondary" }}>
                  {ele.name}
                </Typography>
              ) : (
                ""
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Divider
                variant="middle"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => handleFieldDelete(ele)}>Delete</Button>
              </div>
              <Input
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                placeholder={ele.DATA_TYPE}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            </AccordionDetails>
          </Accordion>
        </>
      );
    }
  };
  return (
    <div>
      <Typography>{ele.NAME}</Typography>
      {all_list()}
    </div>
  );
};

export default FieldGenerator;
