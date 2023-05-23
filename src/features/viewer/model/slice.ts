import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init";
import { reducers } from "./reducer";

export const viewerFeatureSlice = createSlice({
  name: "viewerFeature",
  initialState,
  reducers,
});
