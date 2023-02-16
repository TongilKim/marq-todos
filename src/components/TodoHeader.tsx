import React from "react";
import "./TodoHeader.scss";
import { getCurrentDate, getCurrentDayName } from "../utils";
import { useAppSelector } from "../stores/hooks";

export const TodoHeader = () => {
  const { todoList, addingSubTaskMode, selectedTodo } = useAppSelector(
    (state) => state.todoList
  );
  const getAvailableTodoCount = () => {
    let availableTodoCount = 0;
    if (addingSubTaskMode) {
      availableTodoCount = todoList.filter(
        (todo) =>
          todo.id !== selectedTodo?.id &&
          !todo.done &&
          !selectedTodo?.todoWith?.find((todoId) => todoId === todo.id)
      ).length;
    } else {
      availableTodoCount = todoList.filter(
        (todo) => todo.done === false
      ).length;
    }

    return availableTodoCount;
  };

  return (
    <div className="todoHeader_root">
      <h1>{getCurrentDate()}</h1>
      <div className="day">{getCurrentDayName()}</div>
      <div className="task_left">
        {addingSubTaskMode ? "함께 할 수 있는 일" : "할 일"}{" "}
        {getAvailableTodoCount()}개
      </div>
    </div>
  );
};
