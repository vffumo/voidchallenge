import { configureStore } from "@reduxjs/toolkit";
import analiseInsumoSlice from "./slices/analiseInsumoSlice";
import authSlice from "../features/authSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer, 
    analiseInsumo: analiseInsumoSlice.reducer, 
  },
});

export default store;
