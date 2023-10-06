import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: " ",
};
export const LabelText = createSlice({
  name: "label",
  initialState,
  reducers: {
    getTextData(state, action) {
      state.message = action.payload;
    },
  },
});

export const { getTextData } = LabelText.actions;
export default LabelText.reducer;
