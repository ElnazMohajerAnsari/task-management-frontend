import { configureStore } from "@reduxjs/toolkit";

import combineReducers from "../reducer/combined-reducers";

const store = configureStore({
  reducer: combineReducers,
});

export default store;
