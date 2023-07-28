import { useAppDispatch, useAppSelector } from "@/shared";
import { diceSlice } from "./slice";

const select = (state: RootState) => state.dice;
export const actionDice = diceSlice.actions;
export const diceReducer = diceSlice.reducer;

export const useDice = () => {
  return useAppSelector(select);
};

// export const useDiceAction = () => {
//   const dispatch = useAppDispatch();

//   return {

//   };
// };

