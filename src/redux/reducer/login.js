import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action/action-types";

const initialState = [];

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
        console.log("inja loginReducer ast");
      switch (action.type) {
        case actions.ADMIN_LOGIN:
          return { ...state, enteredPerson: action.payload.enteredPerson };
        default:
          return state;
      }
    },
  },
});

export const reducer = loginReducer.reducer;
