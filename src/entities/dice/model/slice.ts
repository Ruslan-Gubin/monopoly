import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";

export const diceSlice = createSlice({
  name: "dice",
  initialState,
  reducers,
});

