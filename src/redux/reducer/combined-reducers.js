import { combineReducers } from "redux";
import { taskReducer } from "./app";

const combined = combineReducers({
  taskReducer: taskReducer.reducer,
});

export default combined;
