import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducers";

export const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers,
});

