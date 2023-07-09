import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";


export const selectionNotificationSlice = createSlice({
  name: "selectionNotification",
  initialState,
  reducers,
});