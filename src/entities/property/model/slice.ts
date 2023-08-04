import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers,
});

