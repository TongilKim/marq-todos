import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../stores";

import TodoItem from "../components/TodoItem";
import { getCurrentDate, populateNewId, populateRandomDate } from "../utils";

describe("TodoHeader Test", () => {
  test("TodoHeader component Render Test", () => {
    const mockData = {
      id: populateNewId(),
      text: "아침 산책",
      done: true,
      created: populateRandomDate(),
      updated: getCurrentDate(),
      todoWith: [],
    };
    const { container } = render(
      <Provider store={store}>
        <TodoItem currentTodo={mockData} lastElementRef={null} />
      </Provider>
    );
    if (container) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(container.firstChild.classList.contains("todoItem_root")).toBe(
        true
      );
    }
  });
});
