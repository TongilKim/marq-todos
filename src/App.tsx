import React, { useEffect } from "react";

import "./App.css";
import Snackbar from "./common/Snackbar";
import TodoContainer from "./components/TodoContainer";
import TodoCreateBtn from "./components/TodoCreateBtn";
import { TodoHeader } from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import { RootState } from "./stores";
import { useAppSelector } from "./stores/hooks";

import { getCurrentDate, populateNewId, populateRandomDate } from "./utils";

export const initializeData = async () => {
  localStorage.setItem(
    "todoList",
    JSON.stringify([
      {
        id: populateNewId(),
        text: "아침 산책",
        done: true,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "오늘의 뉴스 읽기",
        done: true,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "샌드위치 사 먹기",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "리액트 공부",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 1",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 2",
        done: true,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 3",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 4",
        done: true,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 5",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 6",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
      {
        id: populateNewId(),
        text: "Todo 7",
        done: true,
        created: populateRandomDate(),
        updated: getCurrentDate(),
        todoWith: [],
      },
    ])
  );
};
function App() {
  const { openSnackBar } = useAppSelector((state: RootState) => state.snackBar);

  useEffect(() => {
    if (!localStorage.getItem("todoList")) initializeData();
  }, []);

  return (
    <>
      <div className="App">
        <TodoContainer>
          <TodoHeader />
          <TodoList />
          <TodoCreateBtn />
        </TodoContainer>

        {openSnackBar ? <Snackbar /> : null}
      </div>
    </>
  );
}

export default App;
