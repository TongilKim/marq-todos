import React, { useEffect } from "react";
import { getTodoListApi } from "../api/todo";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { setTodoList } from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError } from "../types";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todoList, addingSubTaskMode, selectedTodo } = useAppSelector(
    (state) => state.todoList
  );

  useEffect(() => {
    if (todoList.length === 0) {
      try {
        getTodoListApi().then((res: Tresponse) => {
          dispatch(setTodoList(res.result));
        });
      } catch (err) {
        const typedError = err as TResponseError;
        dispatch(setSnackBarMsg(typedError.statusText));
      }
    }
  }, []);
  console.log("hi");
  return (
    <div className="todoList_root">
      {addingSubTaskMode
        ? todoList.map(
            (todo) =>
              !todo.done &&
              todo.id !== selectedTodo?.id && (
                <TodoItem key={todo.id} currentTodo={todo} />
              )
          )
        : todoList.map((todo) => <TodoItem key={todo.id} currentTodo={todo} />)}
    </div>
  );
};

export default TodoList;
