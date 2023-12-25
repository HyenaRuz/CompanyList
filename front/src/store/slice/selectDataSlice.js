import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyTypes: [],
};

export const selectData = createSlice({
  name: "selectData",
  initialState,
  reducers: {
    companyTypes(state, { payload }) {
      state.companyTypes = payload;
    },
  },
});

export const { companyTypes } = selectData.actions;

export default selectData.reducer;
