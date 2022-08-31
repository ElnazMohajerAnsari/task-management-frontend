import { combineReducers } from "redux";
import { addTaskReducer } from "./app";

const combined = combineReducers({
  addTaskReducer: addTaskReducer.reducer,
});

export default combined;
