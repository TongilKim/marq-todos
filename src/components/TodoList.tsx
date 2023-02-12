import React from "react";
import { useAppSelector } from "../stores/hooks";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const { todoList, addingSubTaskMode } = useAppSelector(
    (state) => state.todoList
  );

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
