import { Button, Paper, TextField, Grid, InputLabel } from "@mui/material";
// import { Grid } from "ag-grid-community";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FieldGenerator from "./FieldGenerator";

var mainLayout = [];

const previewLayout = (layout) => {
  console.log(layout);
};

function UserView({ layoutchild }) {
  const pageLayoutData = useSelector((state) => state.layoutJsonState.savedata);
  //   console.log(pageLayoutData.child);
  const layout_page = pageLayoutData.child;
  console.log(layout_page);
  useEffect(() => {
    previewLayout(layout_page);
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Paper sx={{ minHeight: "30rem" }}>
            {/* {layout_page > 0
              ? */}
            {layout_page &&
              layout_page.map((ele, index) => {
                console.log("This section ");
                if (ele.type == "section" && ele.child > 0) {
                  layout_page = layoutchild;
                  return (
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "1rem",
                        backgroundColor: "red",
                      }}
                    >
                      {/* <UserView key={index} layoutchild={ele.child} /> */}
                      {ele.type}
                    </div>
                  );
                  // return <UserView key={index} layoutchild={ele.child} />;
                }

                if (ele.type == "Number") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Password") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Dynamic Lookup") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Checkbox") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Multiple Line Text") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Text Lookup Multiple Choice") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Text Lookup") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Radio Button") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Attachment") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Date-Time") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Single Line Text") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Email") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Dynamic Lookup Multiple Choice") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                } else if (ele.type == "Phone Number") {
                  return (
                    <div key={index}>
                      <InputLabel>{ele.name}</InputLabel>
                      <FieldGenerator key={index} ele={ele} />
                    </div>
                  );
                }
              })}

            <Button
              sx={{
                display: "flex",
                textAlign: "end",
                justifyContent: "flex-end",
              }}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}

export default UserView;
