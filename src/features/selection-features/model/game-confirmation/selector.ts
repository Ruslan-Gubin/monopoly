import { useAppDispatch, useAppSelector } from "@/shared";
import { gameConfirmationSlice } from "./slice";

const select = (state: RootState) => state.gameConfirmation;
export const gameConfirmationAction = gameConfirmationSlice.actions;
export const gameConfirmationReducer = gameConfirmationSlice.reducer;

export const useGameConfirmation = () => {
  return useAppSelector(select); 
};

export const useGameConfirmationAction = () => {
  const dispatch = useAppDispatch()

  return {
    cancelConfinmPlayer: ({ sessionId }: { sessionId: string }) => dispatch(gameConfirmationAction.cancelConfinmPlayer({ sessionId })),
    setSelectedColor: (color: string) => dispatch(gameConfirmationAction.setSelectedColor(color)),
  }
}



