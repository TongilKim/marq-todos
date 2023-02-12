/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Todo 리스트 state를 관리하는 slice
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  openEditModal: boolean;
};

const initialState: TinitialState = {
  openEditModal: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setOpenEditModal(state, action: PayloadAction<boolean>) {
      state.openEditModal = action.payload;
    },
  },
});

export const { setOpenEditModal } = todoSlice.actions;
export default todoSlice.reducer;
