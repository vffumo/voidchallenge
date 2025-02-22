import { configureStore } from "@reduxjs/toolkit";
import analiseInsumoReducer from "./slices/analiseInsumoSlice";
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analiseInsumo: analiseInsumoReducer, 
  },
});

export default store;
