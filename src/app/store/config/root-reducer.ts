import { combineReducers } from "@reduxjs/toolkit";
import { viewerReducer, selectionReducer, cellsReducer, boardReducer, playerReducer, diceReducer, propertyReducer } from "@/entities";
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
  player: playerReducer,
  dice: diceReducer,
  property: propertyReducer,

  // [baseApi.reducerPath]: baseApi.reducer,
});
