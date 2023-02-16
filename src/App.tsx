import React, { useEffect } from "react";

import "./App.css";
import Loader from "./common/Loader";
import Snackbar from "./common/Snackbar";
import TodoContainer from "./components/TodoContainer";
import TodoCreateBtn from "./components/TodoCreateBtn";
import { TodoHeader } from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import { RootState } from "./stores";
import { useAppSelector } from "./stores/hooks";

import { getCurrentDate, populateNewId, populateRandomDate } from "./utils";

const initializeData = async () => {
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
        text: "리액트 공부하기",
        done: false,
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

  if (!localStorage.getItem("todoList")) {
    return <Loader />;
  }
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
