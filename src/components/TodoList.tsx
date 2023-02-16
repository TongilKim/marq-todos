import React, { useEffect } from "react";
import { getTodoListApi } from "../api/todo";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { setTodoList } from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError, Ttodo } from "../types";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todoList, addingSubTaskMode, selectedTodo } = useAppSelector(
    (state) => state.todoList
  );

  const renderTodoWithList = (todo: Ttodo) => {
    if (
      !todo.done && // 완료되지 않은 Todo
      todo.id !== selectedTodo?.id && // 초기 목록에서 선택된 todo를 제외한 나머지 Todo
      !selectedTodo?.todoWith?.find((todoId) => todoId === todo.id) // 현 Todo에 '함께 해야 할 일(todoWith property)'에 추가가 안된 Todo
    ) {
      return <TodoItem key={todo.id} currentTodo={todo} />;
    }
  };

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
        ? todoList.map((todo) => renderTodoWithList(todo))
        : todoList.map((todo) => <TodoItem key={todo.id} currentTodo={todo} />)}
    </div>
  );
};

export default TodoList;
