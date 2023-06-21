import { combineReducers } from '@reduxjs/toolkit'
import { viewerReducer, selectionReducer } from '@/entities'
import { viewerFeatureReducer, selectionNotificationReducer, selectionMessageReducer } from '@/features';


export const rootReducer = combineReducers({
  viewer: viewerReducer,
  viewerFeature: viewerFeatureReducer,
  selection: selectionReducer,
  selectionNotification: selectionNotificationReducer,
  selectionMessage: selectionMessageReducer,

  // [baseApi.reducerPath]: baseApi.reducer,
})