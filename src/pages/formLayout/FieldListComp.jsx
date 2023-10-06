import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Button, Divider, Grid } from "@mui/material";
import shortid from "shortid";
import _ from "lodash";
import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";
import { isMobile } from "react-device-detect";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  getObjectDetails,
  fetchObjectFieldList,
} from "../../services/objectApi";
import FieldCard from "./FieldCard";
import ReferenceMasterObject from "./ReferenceMasterObject";
import { fetchRelativeObject } from "../../services/MasterDetailsApi/masterDetailsAllApi";

const FieldListComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [listState, setlistState] = useState([]);
  const [objList, setObjList] = useState([]);

  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleObjectClick = () => {
    setOpen1(!open1);
  };

  useEffect(() => {
    const object_id = location.state.object_id;
    // const object_id = "f8c45f0a-66b9-4990-859d-790e02daea25";

    console.log(object_id);
    console.log("-------------------");
    getObjectDetails({ OBJ_ID: object_id })
      .then((res) => {
        let objRes = res.data;
        fetchObjectFieldList({ OBJ_ID: object_id })
          .then((res) => {
            console.log("FIELD LIST 22222222222", res.data);
            let fieldList = res.data;
            let listdata = fieldList.map((list) => {
              return {
                NAME: list.FIELD_NAME,
                FIELD_NAME: list.FIELD_NAME,
                TYPE: list.TYPE,
                DATA_TYPE: list.DATA_TYPE,
                VALUE: list.VALUE,
                REAL_VALUE: list.REAL_VALUE,
                IS_INLINE_EDIT: list.IS_INLINE_EDIT,
                FIELD_ID: list.FIELD_ID,
                DATA_TYPE_ID: list.DATA_TYPE_ID,
                IS_UNIQUE: list.IS_UNIQUE,
                MAPPING_OBJECT_ID: list.MAPPING_OBJECT_ID,
                MAPPING_OBJECT_FIELD_ID: list.MAPPING_OBJECT_FIELD_ID,
                SECTION_ID: "",
                PARENT_SECTION_ID: "",
                WIDTH: 12,
                CHILDREN: [],
                OPTIONS: list.OPTIONS,
              };
            });
            listdata.push({
              NAME: "section",
              TYPE: "section",
              FIELD_ID: "",
              DATA_TYPE_ID: "",
              IS_UNIQUE: false,
              SECTION_ID: shortid.generate(),
              PARENT_SECTION_ID: "",
              WIDTH: 12,
              CHILDREN: [],
              OPTIONS: [],
            });
            setlistState(listdata);
            console.log("List State ---22222222-->", listdata);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        fetchRelativeObject({ LOOKUP_OBJ_ID: object_id })
          .then((respose) => {
            let ObjectList = respose.data;
            console.log(ObjectList, "--------------------->");
            let listdata = ObjectList.map((lists) => {
              return {
                NAME: "masterObject",
                REFERENCE_OBJ_ID: lists.OBJ_ID,
                REFERENCE_OBJ_NAME: lists.OBJ_NAME,

                SECTION_ID: shortid.generate(),

                WIDTH: 12,
              };
            });

            // console.log(listdata);
            setObjList(listdata);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  //   console.log(objList.map((ele) => ele.CHILDREN));

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="fieldNames" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listState.map((ele, index) => {
            return <FieldCard ele={ele} key={index} />;
          })}
        </List>
      </Collapse>

      <Divider sx={{ m: "1rem", width: "100%" }} />

      <ListItemButton onClick={handleObjectClick}>
        <ListItemText primary="ObjectNames" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {objList.map((ele, index) => {
            return <ReferenceMasterObject ele={ele} key={index} />;
          })}
        </List>
      </Collapse>
    </div>
  );
};

export default FieldListComp;
