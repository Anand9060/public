import React, { useEffect, useState, useMemo, useRef } from "react";
import {
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

import MsgBox from "../../components/MsgBox.jsx";
import Box from "@mui/material/Box";
import {
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
import { useDispatch } from "react-redux";
import { setauth_token } from "./userSlice.js";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

var is_mobile = isMobile; //true;

export const Login = () => {
	const [errorState, seterrorState] = useState({
		emailErr: "",
		emailVaild: false,
		passwordErr: "",
		passwordVaild: false,
	});
	const dispatch = useDispatch();
	const [loginDetails, setloginDetails] = useState({
		Email: "",
		Password: "",
	});
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

	const [state, setState] = useState({
		email: "",
		password: "",
	});

	let navigate = useNavigate();

	const handleChange = prop => event => {
		setState({ ...state, [prop]: event.target.value });
	};

	const handleLogin = e => {
		let errorMsg = {};
		let valid = true;

		if (isEmpty(loginDetails.Email) || !validateEmail(loginDetails.Email)) {
			if (!validateEmail(loginDetails.Email) && !isEmpty(loginDetails.Email)) {
				errorMsg = {
					emailErr: createMessage(5),
					emailVaild: true,
				};
			} else {
				errorMsg = {
					emailErr: createMessage(1, "Email Id."),
					emailVaild: true,
				};
			}

			valid = false;
		}
		if (isEmpty(loginDetails.Password)) {
			errorMsg = {
				...errorMsg,
				passwordErr: createMessage(1, "Password"),
				passwordVaild: true,
			};
			valid = false;
		}

		seterrorState({
			...errorState,
			...errorMsg,
		});

		const data = {
			email: loginDetails.Email,
			password: loginDetails.Password,
		};

		if (valid) {
			console.log(data);
			// loginApi(data)
			// 	.then(res => {
			// 		console.log(res);
			// 		dispatch(setauth_token(res.data));
			// 		navigate("/master");
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 		navigate("*");
			// 	});
		}
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box>
						<InputLabel>Email Id.</InputLabel>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							name="email"
							autoComplete="email"
							autoFocus
							error={errorState.emailVaild}
							onChange={e =>
								setloginDetails({ ...loginDetails, Email: e.target.value })
							}
							helperText={errorState.emailErr}
						/>

						<InputLabel>Password</InputLabel>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={errorState.passwordVaild}
							onChange={e =>
								setloginDetails({ ...loginDetails, Password: e.target.value })
							}
							helperText={errorState.passwordErr}
						/>
						{/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={() => handleLogin()}
						>
							Sign In
						</Button>
					</Box>
				</Box>
			</Container>

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

			<Backdrop
				sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
				open={backdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
};
