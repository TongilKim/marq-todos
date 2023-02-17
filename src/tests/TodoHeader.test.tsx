import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../stores";
import { TodoHeader } from "../components/TodoHeader";

describe("TodoHeader Test", () => {
  test("TodoHeader component Render Test", () => {
    const { container } = render(
      <Provider store={store}>
        <TodoHeader />
      </Provider>
    );
    if (container) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(container.firstChild.classList.contains("todoHeader_root")).toBe(
        true
      );
    }
  });
});
