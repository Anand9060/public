import React, { useEffect, useState, useMemo, useRef } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HubIcon from "@mui/icons-material/Hub";
import { FaTrash, FaEdit } from "react-icons/fa";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import CustomIcons from "../assets/data/CustomIcons.json";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import AddIcon from "@mui/icons-material/Add";

import _ from "lodash";

const Icons = (props) => {
  //   const { color } = props;
  const IconType = "Material";

  const showIcon = (val) => {
    if (IconType == "Material") {
      switch (props.name) {
        case "AddCircleOutlineIcon":
          return <AddCircleOutlineIcon />;
        case "HubIcon":
          return <HubIcon />;
        case "FaTrash":
          return <FaTrash />;
        case "FaEdit":
          return <FaEdit />;
        case "ExpandLess":
          return <ExpandLess />;
        case "ExpandMore":
          return <ExpandMore />;
        case "RepeatIcon":
          return <RepeatIcon />;
        case "AddIcon":
          return <AddIcon />;
        case "AccessTimeIcon":
          return <AccessTimeIcon />;
        case "FeaturedPlayListOutlinedIcon":
          return <FeaturedPlayListOutlinedIcon />;
      }
    } else if (IconType == "Custom") {
      // let Icon = _.find(CustomIcons, function (o) {
      //   return o.key == props.name;
      // });
      console.log("./icons/" + props.name);
      return (
        <img src={"./icons/" + props.name} style={{ width: 20, height: 20 }} />
      );
    }
  };
  return <>{showIcon(props.name)}</>;
};

export default Icons;
