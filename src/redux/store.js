import { configureStore } from "@reduxjs/toolkit";
import analiseReducer from "./slices/analiseSlice";

export const store = configureStore({
  reducer: {   analise: analiseReducer,  },
});

export default store;
