import React, { useState } from "react";
import "./App.css";
import Modal from "./common/Modal";
import TodoContainer from "./components/TodoContainer";
import TodoCreateBtn from "./components/TodoCreateBtn";
import { TodoHeader } from "./components/TodoHeader";
import TodoList from "./components/TodoList";

async function callApi<T = any>({
  url,
  method,
}: {
  url: string;
  method: string;
}) {
  const res = await fetch(url, { method });
  const json = await res?.json();

  if (!res.ok) {
    throw {
      statusText: res.statusText,
      json,
    };
  }

  return json as T;
}

function App() {
  //const [fetchResult, setFetchResult] = useState<string[]>([]);

  return (
    <>
      <div className="App">
        <TodoContainer>
          <TodoHeader />
          <TodoList />
          <TodoCreateBtn />
        </TodoContainer>

        <Modal />
      </div>

      {/* <button
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
