import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./Reducers/app";

export const  store = configureStore(
    {reducer:{appReducer},devTools:true}
);