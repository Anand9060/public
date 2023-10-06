import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/login/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import layoutJsonReducer from "../pages/formLayout/LayoutJsonSlice";

import progressReducer from "../services/hederSlice";
import LabelTextReducer from "../services/labelSlice";

export const store = configureStore({
  reducer: {
    reducer: {},
    userState: userReducer,
    progressBarState: progressReducer,
    layoutJsonState: layoutJsonReducer,
    labelTextState: LabelTextReducer,
  },
});

setupListeners(store.dispatch);
