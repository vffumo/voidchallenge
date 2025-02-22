import React from "react";
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppWrapper from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
     <AppWrapper />
    </Provider>
  </StrictMode>
);
