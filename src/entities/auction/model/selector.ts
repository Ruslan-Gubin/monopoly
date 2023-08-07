import { useAppSelector } from "@/shared";
import { auctionSlice } from "./slice";

const select = (state: RootState) => state.auction;
export const auctionAction = auctionSlice.actions;
export const auctionReducer = auctionSlice.reducer;

export const useAuction = () => {
  return useAppSelector(select);
};



