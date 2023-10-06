import React, { useEffect, useState, useMemo, useRef } from "react";
import {
	Link,
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";

import _ from "lodash";
import { isMobile } from "react-device-detect";
import { loginApi } from "../../services/login";
import {
	validateEmail,
	createMessage,
	truncate,
	isEmpty,
} from "../../assets/lib/function";
import { Outlet } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import ObjectPageLayout from "../objectlayouts/ObjectPageLayout.jsx";
import MsgBox from "../../components/MsgBox.jsx";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
//import { setauth_token } from "../login/userSlice";
import Box from "@mui/material/Box";

import {
	List,
	Grid,
	Backdrop,
	CircularProgress,
	Container,
	CssBaseline,
	Avatar,
	Typography,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
	InputLabel,
} from "@mui/material";

var is_mobile = false; //true;

export const Home = () => {
	const [backdrop, setBackdrop] = useState(false);
	const [msgBox, setMsgBox] = useState({
		open: false,
		action: "",
		alertTitle: "",
		alertBody: "",
		isAlertConfirm: false,
		alertConfirmTxt: "Ok",
		alertCloseTxt: "Close",
	});

	const handleBackdropClose = () => {
		setBackdrop(false);
	};
	const handleBackdropOpen = () => {
		setBackdrop(true);
	};

	const handleAlertClose = () => {
		setMsgBox({
			...msgBox,
			open: false,
			action: "",
			alertTitle: "",
			alertBody: "",
			isAlertConfirm: false,
			alertConfirmTxt: "Ok",
			alertCloseTxt: "Close",
		});
	};
	const handleAlertOpen = msgbody => {
		setMsgBox({
			...msgBox,
			open: true,
			action: "",
			alertTitle: "",
			alertBody: msgbody,
			isAlertConfirm: false,
			alertConfirmTxt: "Ok",
			alertCloseTxt: "Close",
		});
	};

	const handleAlertConfirm = () => {
		setMsgBox({
			...msgBox,
			open: false,
			action: "",
			alertTitle: "",
			alertBody: "",
			isAlertConfirm: false,
			alertConfirmTxt: "Ok",
			alertCloseTxt: "Close",
		});
	};
	const msgRef = useRef();
	/******************************** */

	return (
		<Container maxWidth={"xl"}>
			<Header></Header>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<Menu></Menu>
				</Grid>
				<Grid item xs={9}>
					<Outlet />
				</Grid>
			</Grid>
			<Footer></Footer>
		</Container>
	);
};
