import React from "react";
import "./TodoHeader.scss";
import { getCurrentDate, getCurrentDayName } from "../utils";
import { useAppSelector } from "../stores/hooks";

export const TodoHeader = () => {
  const { todoList } = useAppSelector((state) => state.todoList);
  const availableTodoCount = todoList.filter(
    (todo) => todo.done === false
  ).length;
  return (
    <div className="todoHeader_root">
      <h1>{getCurrentDate()}</h1>
      <div className="day">{getCurrentDayName()}</div>
      <div className="task_left">할 일 {availableTodoCount}개 남음</div>
    </div>
  );
};
