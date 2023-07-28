import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers,
});

