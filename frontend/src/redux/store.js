import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./companiesSlice";

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // enable Redux DevTools only in development
});

export default store;
