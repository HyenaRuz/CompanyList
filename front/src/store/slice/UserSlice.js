import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  id: null,
  isAuth: false,
  lastName: null,
  firstName: null,
  nickname: null,
  phone: null,
  position: null,
};

export const userSlise = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, actions) {
      state.email = actions.payload.email;
      state.id = actions.payload.id;
      state.isAuth = true;
      state.lastName = actions.payload.lastName;
      state.firstName = actions.payload.firstName;
      state.nickname = actions.payload.nickname;
      state.phone = actions.payload.phone;
      state.position = actions.payload.position;
    },
    logout(state) {
      state.email = null;
      state.id = null;
      state.isAuth = false;
      state.lastName = null;
      state.firstName = null;
      state.nickname = null;
      state.phone = null;
      state.position = null;
    },
  },
});

export const { login, logout } = userSlise.actions;

export default userSlise.reducer;
