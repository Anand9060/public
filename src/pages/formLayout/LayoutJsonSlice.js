import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const initialState = {
	currentSection: {
		width: 12,
	},
	savedata: {},
};

export const layoutJsonSlice = createSlice({
	name: "layoutJsonSlice",
	initialState,
	reducers: {
		setcurrentConfig: (state, action) => {
			// console.log(action.payload);
			state.currentSection = action.payload;
		},
		setSectionWidth: (state, action) => {
			state.currentSection.width = action.payload;
		},

		setPageLayoutSave: (state, action) => {
			state.savedata = action.payload;
			console.log(state.savedata);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setcurrentConfig, setSectionWidth, setPageLayoutSave } =
	layoutJsonSlice.actions;

export default layoutJsonSlice.reducer;
