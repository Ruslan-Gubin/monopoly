import { useAppDispatch, useAppSelector } from "@/shared";
import { playerSlice } from "./slice";
import { IPlayerUpdatePosition } from "./types";

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
    moveFinished: ({ x, y, color }: { x: number, y: number, color: string }) => dispatch(playerAction.moveFinished({ x, y, color })),
  };
};

