import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";


export const gameConfirmationSlice = createSlice({
  name: "gameConfirmation",
  initialState,
  reducers,
});