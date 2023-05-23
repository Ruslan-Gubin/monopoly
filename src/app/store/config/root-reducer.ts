import { combineReducers } from '@reduxjs/toolkit'
import * as reducers from "@/features";
import { baseApi } from "@/shared/api";
import { viewerReducer } from '@/entities/viewer'
import { viewerFeatureReducer } from '@/features';

export const rootReducer = combineReducers({
  viewer: viewerReducer,
  viewerFeature: viewerFeatureReducer,

  sessionSlice: reducers.sessionReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})