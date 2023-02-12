import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const initialTodos = [
    {
      id: 1,
      text: "아침 산책",
      done: true,
    },
    {
      id: 2,
      text: "오늘의 뉴스 읽기",
      done: true,
    },
    { id: 3, text: "샌드위치 사 먹기", done: false },
    { id: 4, text: "리액트 공부하기", done: false },
  ];

  return (
    <div className="todoList_root">
      {initialTodos.map((todo) => (
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
