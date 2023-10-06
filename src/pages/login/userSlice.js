import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	jwt_token:
		JSON.parse(localStorage.getItem("Auth_Token")) != null
			? JSON.parse(localStorage.getItem("Auth_Token"))
			: "",

	isLoggedIn: false,
};

export const userSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		setauth_token: (state, action) => {
			if (action.payload != state.jwt_token) {
				state.jwt_token = action.payload;
				console.log(action.payload);
				state.isLoggedIn = true;
				localStorage.setItem("Auth_Token", JSON.stringify(action.payload));
			}
		},
		removeauth_token: state => {
			state.jwt_token = "";
			state.isLoggedIn = false;
			localStorage.removeItem("Auth_Token");
		},
		setuserLoggedIn: state => {
			state.isLoggedIn = true;
		},
	},
});

// this is for dispatch
export const { setauth_token, removeauth_token, setuserLoggedIn } =
	userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
