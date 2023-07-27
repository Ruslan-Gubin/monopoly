import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers,
});

