import React from "react";
import { createRoot } from 'react-dom/client'; 
import { StrictMode } from 'react'
import store from "./redux/store";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppWrapper from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
     <AppWrapper />
    </Provider>
  </StrictMode>
);