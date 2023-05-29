import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from "@/shared/api";
import { viewerReducer, selectionReducer } from '@/entities'
import { viewerFeatureReducer, selectionNotificationReducer } from '@/features';


export const rootReducer = combineReducers({
  viewer: viewerReducer,
  viewerFeature: viewerFeatureReducer,
  selection: selectionReducer,
  selectionNotification: selectionNotificationReducer,

  [baseApi.reducerPath]: baseApi.reducer,
})