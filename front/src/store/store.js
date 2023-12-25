import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slice/UserSlice";
import selectDataReducer from "./slice/selectDataSlice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    selectData: selectDataReducer,
  },
});
