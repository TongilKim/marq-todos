import React from "react";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import App from "../App";
import { store } from "../stores";
import { getCurrentDate } from "../utils";
import TodoList from "../components/TodoList";

describe("TodoList Test", () => {
  test("TodoList component Render Test", () => {
    const { container } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    if (container) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(container.firstChild.classList.contains("todoList_root")).toBe(
        true
      );
    }
  });

  //   test("todoList item rendered Test", async () => {
  //     render(
  //       <Provider store={store}>
  //         <TodoList />
  //       </Provider>
  //     );
  //     const items = await screen.findAllByRole("listitem");
  //     expect(items).toHaveLength(5);
  //   });
});
