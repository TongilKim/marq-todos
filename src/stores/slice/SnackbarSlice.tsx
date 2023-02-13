/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  snackbar 메시지에 대한 state를 관리하는 slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  openSnackBar: boolean;
  snackbarMsg: string;
};

const initialState: TinitialState = {
  openSnackBar: false,
  snackbarMsg: "",
};

const snackbarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    // setOpenSnackBar(state: TinitialState, action: PayloadAction<boolean>) {
    //   state.openSnackBar = action.payload;
    // },
    setSnackBarMsg(state: TinitialState, action: PayloadAction<string>) {
      state.snackbarMsg = action.payload;
      state.openSnackBar = action.payload.length > 0;
    },
  },
});

export const { setSnackBarMsg } = snackbarSlice.actions;
export default snackbarSlice.reducer;
