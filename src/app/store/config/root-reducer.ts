import { combineReducers } from "@reduxjs/toolkit";
import * as entities from "@/entities";
import {
  viewerFeatureReducer,
  selectionNotificationReducer,
  selectionMessageReducer,
  gameConfirmationReducer,
} from "@/features";

export const rootReducer = combineReducers({
  viewer: entities.viewerReducer,
  viewerFeature: viewerFeatureReducer,
  selection: entities.selectionReducer,
  selectionNotification: selectionNotificationReducer,
  selectionMessage: selectionMessageReducer,
  gameConfirmation: gameConfirmationReducer,
  cells: entities.cellsReducer,
  board: entities.boardReducer,
  player: entities.playerReducer,
  dice: entities.diceReducer,
  property: entities.propertyReducer,
  auction: entities.auctionReducer,
  gameNotification: entities.gameNotificationReducer,

  // [baseApi.reducerPath]: baseApi.reducer,
});
