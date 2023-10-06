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
import GLOBAL from "../Global.js";
import _ from "lodash";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import labels from "../assets/data/label.json";
import { IconAvator } from "./IconAvatar.jsx";
import { loginDomain } from "../services/api.js";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logoutApi,loginApi } from "../services/login.js";
import { Backdrop, CircularProgress } from "@mui/material";
const pages = [
  {
    label: "SEARCH FORM",
    link: "/",
  },
  {
    label: "LINK 2",
    link: "/",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
export default function Header(props) {
  const datalabels = labels.Labels;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const toggleProgress = useSelector(
    (state) => state.progressBarState.openProgress
  );
  const textLabel = useSelector((state) => state.labelTextState.message);
  // console.log(textLabel);
  const funlabel = (name) => {
    for (let i = 0; i < textLabel.length; i++) {
      if (textLabel[i].Key == name) {
        return textLabel[i].Value;
      }
    }
  };
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  let Navigate = useNavigate();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, right: open });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleBackdropOpen();
    console.log(sessionStorage.getItem("token"));
    setAnchorEl(null);
   
    logoutApi().then((isLogout) => {
      console.log("scasc");
      if (isLogout) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        // navigate("/");
        window.location.reload();
        // window.reload();
      }
      handleBackdropClose();
    });
    // await postCall("/logout")
    // sessionStorage.removeItem("token")
  };

  const [backdrop, setBackdrop] = useState(false); const handleBackdropClose = () => {
    setBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setBackdrop(true);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      let url = window.location.href;
      url = url.replace(/^(https?:\/\/)?(www\.)?/i, "").split("/")[0];
      console.log("http://" + url);
      url = "http://" + url + "/";
      window.location.href = `${loginDomain}?consumer=${url}auth`;
    }
    let userEmail = sessionStorage.getItem("email");
    let name1 = userEmail.split("@")[0];
    console.log(name1.split("."));
    if (name1.split(".")[1] === undefined) {
      setName(name1.toUpperCase());
    } else {
      setName(
        name1.split(".")[0].toUpperCase() +
          " " +
          name1.split(".")[1].toUpperCase()
      );
    }
    setEmail(userEmail);

    const data = {

      USER_EMAIL:sessionStorage.getItem("email"),
      USER_TOKEN:sessionStorage.getItem("token")
    }
    loginApi(data).then((res)=>{

      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    
  }, []);
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconAvator name="sss.png" isString={false} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {funlabel("simpTable")}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <ChangeHistoryIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {funlabel("simpTable")}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  component={Link}
                  to={page.link}
                  key={page.label}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={toggleDrawer(true)}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <React.Fragment key={"left"}>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer(false)}
                  width="600"
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 460,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LogoutOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <IconButton onClick={handleLogout}>Logout</IconButton>
                    </ListItem>
                  </List>
                </Drawer>
              </React.Fragment>
            </Box>
          </Toolbar>
          <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </Container>
      </AppBar>
      {toggleProgress && <LinearProgress />}
    </>
  );
}