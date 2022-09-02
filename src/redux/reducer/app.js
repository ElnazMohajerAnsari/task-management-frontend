import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskReducer = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    addTasks: (state, action) => {
      state.push(action.payload);
      return state;
    },

    deleteTasks: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTasks, deleteTasks} = taskReducer.actions;
export const reducer = taskReducer.reducer;
