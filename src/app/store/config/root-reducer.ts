import { combineReducers } from "@reduxjs/toolkit";
import { viewerReducer, selectionReducer, cellsReducer, boardReducer } from "@/entities";
import {
  viewerFeatureReducer,
  selectionNotificationReducer,
  selectionMessageReducer,
  gameConfirmationReducer,
} from "@/features";

export const rootReducer = combineReducers({
  viewer: viewerReducer,
  viewerFeature: viewerFeatureReducer,
  selection: selectionReducer,
  selectionNotification: selectionNotificationReducer,
  selectionMessage: selectionMessageReducer,
  gameConfirmation: gameConfirmationReducer,
  cells: cellsReducer,
  board: boardReducer,

  // [baseApi.reducerPath]: baseApi.reducer,
});
