/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Todo 리스트 state를 관리하는 slice
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  openEditModal: boolean;
  addingSubTaskMode: boolean;
};

const initialState: TinitialState = {
  openEditModal: false,
  addingSubTaskMode: false,
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
  },
});

export const { setOpenEditModal, setAddingSubTaskMode } = todoSlice.actions;
export default todoSlice.reducer;
