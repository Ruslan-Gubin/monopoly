import { useAppDispatch, useAppSelector } from "@/shared";
import { playerSlice } from "./slice";
import { IPlayerUpdatePosition, SetMoveValueProps } from "./types";

const select = (state: RootState) => state.player;
const action = playerSlice.actions;
export const playerReducer = playerSlice.reducer;

export const usePlayer = () => {
  return useAppSelector(select);
};

export const usePlayerAction = () => {
  const dispatch = useAppDispatch();

  return {
    playerUpdatePosition: ({ cells, cellSize, players }: IPlayerUpdatePosition) => dispatch(action.playerUpdatePosition({ cells, cellSize, players })),
    setMoveValue: ({ dices, isMove, target }: SetMoveValueProps) => dispatch(action.setMoveValue({dices, isMove, target})),
  };
};

