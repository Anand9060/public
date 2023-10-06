import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
  name: "toggleProgress",
  initialState: {
    openProgress: false,
    render: false,
    snackBarState: false,
    snackBarMsg: "",
  },
  reducers: {
    progressOpen: (state) => {
      state.openProgress = true;
    },
    progressClose: (state) => {
      state.openProgress = false;
    },
    renderState: (state) => {
      state.render = !state.render;
    },
    snackbarOpen: (state) => {
      state.snackBarState = true;
    },
    snackbarClose: (state) => {
      state.snackBarState = false;
    },
    setsnackBarMsg: (state, action) => {
      state.snackBarMsg = action.payload;
    },
  },
});

export const {
  progressOpen,
  progressClose,
  renderState,
  snackbarOpen,
  snackbarClose,
  setsnackBarMsg,
} = progressSlice.actions;
export default progressSlice.reducer;
