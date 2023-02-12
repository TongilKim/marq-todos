import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./slice/SnackbarSlice";
import todoListReducer from "./slice/TodoSlice";
export const store = configureStore({
  reducer: {
    snackBar: snackBarReducer,
    todoList: todoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
