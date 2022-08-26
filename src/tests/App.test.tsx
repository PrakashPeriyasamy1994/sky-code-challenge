import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import App from "../App";

const mockStore = configureStore([]);

describe("Testing TO DO component", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
      tasks: [],
    });
    store.dispatch = jest.fn();
    window.scrollTo = jest.fn();
  });

  it("Render without any error", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it("To Do action triggerd", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId("add-button"));
    expect(store.dispatch).toBeCalledTimes(1);
  });
});
