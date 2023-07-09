import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";


export const selectionMessageSlice = createSlice({
  name: "selectionMessage",
  initialState,
  reducers,
});