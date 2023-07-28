import { useAppDispatch, useAppSelector } from "@/shared";
import { playerSlice } from "./slice";
import { IPlayerUpdatePosition, SetMoveValueProps } from "./types";

const select = (state: RootState) => state.player;
export const playerAction = playerSlice.actions;
export const playerReducer = playerSlice.reducer;

export const usePlayer = () => {
  return useAppSelector(select);
};

export const usePlayerAction = () => {
  const dispatch = useAppDispatch();

  return {
    playerUpdatePosition: ({ cells, cellSize }: IPlayerUpdatePosition) => dispatch(playerAction.playerUpdatePosition({ cells, cellSize })),
    setMoveValue: ({ dices, isMove, target }: SetMoveValueProps) => dispatch(playerAction.setMoveValue({dices, isMove, target})),
  };
};

