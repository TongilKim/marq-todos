/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Todo 리스트 state를 관리하는 slice
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ttodo } from "../../types";

type TinitialState = {
  todoList: Ttodo[];
  openEditModal: boolean;
  addingSubTaskMode: boolean;
  selectedTodo: Ttodo | null;
};

const initialState: TinitialState = {
  openEditModal: false,
  addingSubTaskMode: false,
  todoList: [],
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setOpenEditModal(state, action: PayloadAction<boolean>) {
      state.openEditModal = action.payload;
    },
    setAddingSubTaskMode(state, action: PayloadAction<boolean>) {
      state.addingSubTaskMode = action.payload;
    },
    setTodoList(state, action: PayloadAction<Ttodo[]>) {
      console.log("setting todoList: ", action.payload);
      state.todoList = action.payload;
    },
    setSelectedTodo(state, action: PayloadAction<Ttodo["id"]>) {
      state.selectedTodo =
        state.todoList.find((todo) => todo.id === action.payload) ?? null;
    },
  },
});

export const {
  setOpenEditModal,
  setAddingSubTaskMode,
  setTodoList,
  setSelectedTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
