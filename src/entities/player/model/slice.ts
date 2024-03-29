import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";


export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers,
});

