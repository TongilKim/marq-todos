/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Todo 리스트 state를 관리하는 slice
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ttodo } from "../../types";
import { populateNewId } from "../../utils";

type TinitialState = {
  todoList: Ttodo[];
  openEditModal: boolean;
  addingSubTaskMode: boolean;
};

const initialState: TinitialState = {
  openEditModal: false,
  addingSubTaskMode: false,
  todoList: [
    {
      id: populateNewId(),
      text: "아침 산책",
      done: true,
    },
    {
      id: populateNewId(),
      text: "오늘의 뉴스 읽기",
      done: true,
    },
    { id: populateNewId(), text: "샌드위치 사 먹기", done: false },
    { id: populateNewId(), text: "리액트 공부하기", done: false },
  ],
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
      console.log(action.payload);
      state.todoList = action.payload;
    },
  },
});

export const { setOpenEditModal, setAddingSubTaskMode, setTodoList } =
  todoSlice.actions;
export default todoSlice.reducer;
