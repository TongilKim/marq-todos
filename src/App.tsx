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
      },
      {
        id: populateNewId(),
        text: "오늘의 뉴스 읽기",
        done: true,
        created: populateRandomDate(),
        updated: getCurrentDate(),
      },
      {
        id: populateNewId(),
        text: "샌드위치 사 먹기",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
      },
      {
        id: populateNewId(),
        text: "리액트 공부하기",
        done: false,
        created: populateRandomDate(),
        updated: getCurrentDate(),
      },
    ])
  );
};
function App() {
  const { openSnackBar } = useAppSelector((state: RootState) => state.snackBar);

  useEffect(() => {
    initializeData();
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
      {/* 
      <button
        className="button-with-margin"
        onClick={async () => {
          try {
            const json = await callApi<{ messages: string }>({
              url: "/test",
              method: "post",
            });

            setFetchResult([...fetchResult, JSON.stringify(json.messages)]);
          } catch (e) {
            console.log("e", e);
          }
        }}
      >
        post test
      </button>
      <button
        className="button-with-margin"
        onClick={async () => {
          try {
            const json = await callApi<{ messages: string }>({
              url: "/test",
              method: "get",
            });

            setFetchResult([...fetchResult, JSON.stringify(json.messages)]);
          } catch (e) {
            console.log("e", e);
          }
        }}
      >
        get test
      </button>
      <button
        className="button-with-margin"
        onClick={async () => {
          try {
            const json = await callApi<{ messages: string }>({
              url: "/test",
              method: "put",
            });

            setFetchResult([...fetchResult, JSON.stringify(json.messages)]);
          } catch (e) {
            console.log("e", e);
          }
        }}
      >
        put test
      </button>
      <button
        className="button-with-margin"
        onClick={async () => {
          try {
            const json = await callApi<{ messages: string }>({
              url: "/test",
              method: "delete",
            });

            setFetchResult([...fetchResult, JSON.stringify(json.messages)]);
          } catch (e) {
            console.log("e", e);
          }
        }}
      >
        delete test
      </button>
      <button
        className="button-with-margin clear"
        onClick={() => setFetchResult([])}
      >
        Clear!
      </button>
      <br />
      <br />
      {fetchResult?.length > 0 && (
        <ul className="fetch-result">
          {[...fetchResult].reverse().map((v, i) => (
            <li key={`${v}-${i}`}>{v}</li>
          ))}
        </ul>
      )} */}
    </>
  );
}

export default App;
