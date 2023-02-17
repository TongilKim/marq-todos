import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../stores";
import { getCurrentDate } from "../utils";

test("renders App Test", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const currentDate = getCurrentDate();
  const linkElement = screen.getByText(new RegExp(currentDate, "i"));
  expect(linkElement).toBeInTheDocument();
});
