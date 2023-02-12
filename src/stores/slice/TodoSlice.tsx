/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Todo 리스트 state를 관리하는 slice
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Ttodo = {
  id: number;
  text: string;
  done: boolean;
};

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
      id: 1,
      text: "아침 산책",
      done: true,
    },
    {
      id: 2,
      text: "오늘의 뉴스 읽기",
      done: true,
    },
    { id: 3, text: "샌드위치 사 먹기", done: false },
    { id: 4, text: "리액트 공부하기", done: false },
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
      state.todoList = action.payload;
    },
  },
});

export const { setOpenEditModal, setAddingSubTaskMode, setTodoList } =
  todoSlice.actions;
export default todoSlice.reducer;
