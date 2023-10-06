import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import axios from "axios";
import { isMobile } from "react-device-detect";
import _, { size } from "lodash";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import BlurOnIcon from "@mui/icons-material/BlurOn";
// import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
// // import Drawer from "@mui/material/Drawer";
// import EditSharpIcon from "@mui/icons-material/EditSharp";
// import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import Paper from "@mui/material/Paper";

// import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import StarBorder from "@mui/icons-material/StarBorder";

// import ListItemAvatar from "@mui/material/ListItemAvatar";

// import ImageIcon from "@mui/icons-material/Image";
// import WorkIcon from "@mui/icons-material/Work";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";

// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HubIcon from "@mui/icons-material/Hub";

import { fetchObjectList } from "../services/objectApi";
import ObjectDelete from "../pages/object/ObjectDelete";
// import ObjectEdit from "../pages/object/ObjectEdit";
import { FaTrash, FaEdit } from "react-icons/fa";
import { progressOpen, progressClose } from "../services/hederSlice";
import { useSelector, useDispatch } from "react-redux";
import Icons from "./Icons";
import { labelMessage } from "../assets/lib/function";
import IconButton from "@mui/material/IconButton";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import labels from "../assets/data/label.json";
export default function Header(props) {
  const datalabels = labels.Labels;
  const dispatch = useDispatch();

  const msgRefAvailability = useRef();
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };

  const [open, setOpen] = React.useState(true);
  const renderState = useSelector((state) => state.progressBarState.render);
  const [manageCaseObjectDelete, setmanageCaseObjectDelete] = useState({
    open: false,
    object: {},
  });
  // const [manageCaseObjectEdit, setmanageCaseObjectEdit] = useState({
  //   open: false,
  //   object: {},
  // });

  const handleClick = () => {
    setOpen(!open);
  };

  let navigate = useNavigate();

  const [objectList, setObjectList] = useState([]);
  const handleObjCreate = () => {
    navigate("/create_object");
  };

  const objectCallBackFun = (id) => {
    const list = objectList.filter((e) => e.OBJ_ID != id);
    setObjectList(list);
  };
  // console.log(objectList);

  useEffect(() => {
    dispatch(progressOpen());
    fetchObjectList()
      .then((res) => {
        setObjectList(res.data);
        dispatch(progressClose());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [renderState]);

  const handleOpenObject = (param) => {
    navigate("/object_fields", {
      state: { object_id: param },
    });
  };

  const handleManageCaseOpenObjectDelete = (param) => {
    setmanageCaseObjectDelete({
      ...manageCaseObjectDelete,
      open: true,
      object: param,
    });
  };

  const handleManageCaseCloseObjectDelete = () => {
    setmanageCaseObjectDelete({
      ...manageCaseObjectDelete,
      open: false,
    });
  };
  const handleManageCaseOpenObjectEdit = (param) => {
    // setmanageCaseObjectEdit({
    //   ...manageCaseObjectEdit,
    //   open: true,
    //   object: param,
    // });
    navigate("/edit_object", {
      state: { object_id: param },
    });

    // console.log(param);
  };

  // const handleManageCaseCloseObjectEdit = () => {
  //   setmanageCaseObjectEdit({
  //     ...manageCaseObjectEdit,
  //     open: false,
  //   });
  // };

  return (
    <Paper elevation={3}>
      <List>
        <ListItemButton onClick={handleObjCreate}>
          <ListItemIcon>
            <Icons name={"AddCircleOutlineIcon"} />
          </ListItemIcon>
          <ListItemText primary={funlabel("objectName")} />
          {open ? (
            <IconButton onClick={handleClick}>
              <Icons name={"ExpandLess"} />
            </IconButton>
          ) : (
            <IconButton onClick={handleClick}>
              <Icons name={"ExpandMore"} />
            </IconButton>
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {objectList.map((object, index) => {
              return (
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Icons name={"HubIcon"} />
                  </ListItemIcon>
                  <ListItemText
                    primary={object.OBJ_NAME}
                    onClick={() => handleOpenObject(object.OBJ_ID)}
                  />

                  <IconButton
                    id={`object-FaEdit~${index}`}
                    onClick={() =>
                      handleManageCaseOpenObjectEdit(object.OBJ_ID)
                    }
                    style={{ fontSize: 20 }}
                  >
                    <Icons name={"FaEdit"} />
                  </IconButton>

                  {/* {manageCaseObjectEdit.open && (
                    <ObjectEdit
                      open={manageCaseObjectEdit.open}
                      listObjectFun={objectCallBackFun}
                      objects={manageCaseObjectEdit.object}
                      closeManageCase={() => handleManageCaseCloseObjectEdit()}
                    />
                  )} */}

                  <IconButton
                    id={`object-FaTrash~${index}`}
                    onClick={() => handleManageCaseOpenObjectDelete(object)}
                    style={{ marginLeft: "0.5rem", fontSize: 20 }}
                  >
                    <Icons name={"FaTrash"} />
                  </IconButton>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>

      {manageCaseObjectDelete.open && (
        <ObjectDelete
          // ref={msgRefSkillE}
          open={manageCaseObjectDelete.open}
          objects={manageCaseObjectDelete.object}
          listObjectFun={objectCallBackFun}
          backToObjCreate={handleObjCreate}
          closeManageCase={() => handleManageCaseCloseObjectDelete()}
        />
      )}
    </Paper>
  );
}
