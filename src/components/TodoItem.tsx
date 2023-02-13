import React from "react";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { deleteTodoApi } from "../api";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import {
  setOpenEditModal,
  setSelectedTodo,
  setTodoList,
} from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError, Ttodo } from "../types";
import "./TodoItem.scss";

type Tprops = {
  id: Ttodo["id"];
  text: Ttodo["text"];
  done: Ttodo["done"];
};
const TodoItem = ({ id, done, text }: Tprops) => {
  const dispatch = useAppDispatch();
  const { addingSubTaskMode, todoList } = useAppSelector(
    (state) => state.todoList
  );

  const onClickCompleteTask = () => {
    if (addingSubTaskMode) {
    } else {
      const newTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      dispatch(setTodoList(newTodoList));
    }
  };

  const onClickRemove = async () => {
    try {
      await deleteTodoApi(id).then((res: Tresponse) => {
        if (res.resultCode === 200) {
          const deletedList = todoList.filter((todo) => todo.id !== id);
          dispatch(setTodoList(deletedList));
          dispatch(setSnackBarMsg(res.resultMessage));
        }
      });
    } catch (err) {
      const typedError = err as TResponseError;
      dispatch(setSnackBarMsg(typedError.statusText));
    }
  };

  const onClickTodoText = () => {
    if (addingSubTaskMode) {
    } else {
      dispatch(setSelectedTodo(id));
      dispatch(setOpenEditModal(true));
    }
  };

  return (
    <div className="todoItem_root">
      <div
        className={`checkCircle_${done ? "completed" : "uncompleted"}`}
        onClick={onClickCompleteTask}
      >
        {done ? <MdDone /> : addingSubTaskMode ? <MdAdd /> : null}
      </div>
      <div
        className={`todoText_${done ? "completed" : "uncompleted"}`}
        onClick={onClickTodoText}
      >
        {text}
      </div>
      <div className="removeBtn" onClick={onClickRemove}>
        {!addingSubTaskMode && <MdDelete />}
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
