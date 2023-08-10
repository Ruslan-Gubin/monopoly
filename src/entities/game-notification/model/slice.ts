import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";

export const gameNotificationSlice = createSlice({
  name: "gameNotification",
  initialState,
  reducers,
});

