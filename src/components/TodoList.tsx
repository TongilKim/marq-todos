import React, { useEffect } from "react";
import { getTodoListApi } from "../api";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { setTodoList } from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError } from "../types";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todoList, addingSubTaskMode } = useAppSelector(
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
  return (
    <div className="todoList_root">
      {addingSubTaskMode
        ? todoList.map(
            (todo) =>
              !todo.done && (
                <TodoItem
                  id={todo.id}
                  text={todo.text}
                  done={todo.done}
                  key={todo.id}
                />
              )
          )
        : todoList.map((todo) => (
            <TodoItem
              id={todo.id}
              text={todo.text}
              done={todo.done}
              key={todo.id}
            />
          ))}
    </div>
  );
};

export default TodoList;
