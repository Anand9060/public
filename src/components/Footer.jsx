import React, { Component } from "react";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";
import GLOBAL from "../Global.js";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

var is_mobile = isMobile;

export default function Footer(props) {
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };

  return (
    <>
      <Divider variant="middle" mt={3} style={{ marginTop: 30 }} />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>{funlabel("simpsoftSolutionsPvtLtd")}</Typography>
      </Box>
    </>
  );
}
