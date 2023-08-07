import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { AuctionInitState, AuctionModel } from "./types";

export const reducers = {

  updateAuction(state: AuctionInitState, action: PayloadAction<{ auction: AuctionModel }>) {
    if (!action.payload.auction) return;
    state.auction = action.payload.auction
  },

  cancelAuction(state: AuctionInitState) {
    state.auction = null;
  },

};
