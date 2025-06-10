import { createSlice } from "@reduxjs/toolkit";

// Optionally retrieve user info from localStorage
const savedUser = JSON.parse(localStorage.getItem("user")) || {};
const isLoggedIn = Boolean(localStorage.getItem("loggedIn"));

let userSlice = createSlice({
  name: "user",
  initialState: {
    user: savedUser,
    loggedIn: isLoggedIn,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = {};
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
