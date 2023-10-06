import React, { useEffect, useState, useMemo, useRef } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
	Link,
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";

import _ from "lodash";
import { isMobile } from "react-device-detect";
import {
	validateEmail,
	createMessage,
	truncate,
	isEmpty,
} from "../../assets/lib/function";

import MsgBox from "../../components/MsgBox.jsx";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";

import { createObjectApi } from "../../services/objectApi";
import {
	Paper,
	Grid,
	Backdrop,
	CircularProgress,
	Container,
	Typography,
	TextField,
	Button,
	InputLabel,
} from "@mui/material";

import {
	getObjectDetails,
	fetchObjectFieldList,
} from "../../services/objectApi";
import ObjectFieldsLayout from "./ObjectFieldsLayout";
import FormCreateLayout from "./FormCreateLayout";

var is_mobile = isMobile; //true;

const ObjectPageLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	/** Common State and function for all pages */
	/** Developer only need to append some code in handleAlertClose or handleAlertConfirm function  */

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
		let action = msgBox.action;
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

		// Custom action
		if (action == "redirectManageFileds") {
			navigate("/object_fields", {
				state: { object_id: state.object_id },
			});
		}
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

	/** Custom State and function for this page */

	const [state, setState] = useState({
		object_id: "",
		objectName: "",
		ErrobjectName: "",
	});

	useEffect(() => {
		const object_id = location.state.object_id;
		console.log(object_id);

		getObjectDetails({ OBJ_ID: object_id })
			.then(res => {
				let objRes = res.data;
				fetchObjectFieldList({ OBJ_ID: object_id })
					.then(res => {
						let fieldList = res.data;
						const obj = {
							DATA_TYPE: "section",
							FIELD_ID: 1677511459781,
							FIELD_NAME: "Section",
							IS_UNIQUE: "false",
							OBJ_ID: object_id,
							OBJ_ID_FIELD_NAME: `${object_id}~Section`,
						};
						fieldList.push(obj)
						setState({
							...state,
							object_id: object_id,
							objectName: objRes.OBJ_NAME,
							fieldList,
						});
					})
					.catch(err => console.log(err));
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	/******************** */

	return (
		<Container maxWidth={"xl"}>
			<Header></Header>
			<Grid container spacing={2} sx={{ mt: 1 }}>
				<Grid item xs={3}>
					<Menu></Menu>
				</Grid>
				<Grid item xs={9}>
					<Paper elevation={3} pt={10}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography component="h1" variant="h5">
									{`Page Layout - ${state.objectName}`}
								</Typography>
							</Grid>
						</Grid>
						<DndProvider backend={HTML5Backend}>
							<Grid container spacing={2} sx={{ mt: 2 }}>
								<Grid item xs={3}>
									<ObjectFieldsLayout fieldList={state.fieldList} />
								</Grid>
								<Grid item xs={9}>
									<FormCreateLayout />
								</Grid>
							</Grid>
						</DndProvider>
					</Paper>
				</Grid>
			</Grid>

			<Backdrop
				sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
				open={backdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			{msgBox.open && (
				<MsgBox
					ref={msgRef}
					open={msgBox.open}
					alertTitle={msgBox.alertTitle}
					alertBody={msgBox.alertBody}
					isAlertConfirm={msgBox.isAlertConfirm}
					alertConfirmTxt={msgBox.alertConfirmTxt}
					alertCloseTxt={msgBox.alertCloseTxt}
					alertConfirmBtn={() => handleAlertConfirm()}
					alertCloseBtn={() => handleAlertClose()}
				/>
			)}

			<Footer></Footer>
		</Container>
	);
};

export default ObjectPageLayout;
