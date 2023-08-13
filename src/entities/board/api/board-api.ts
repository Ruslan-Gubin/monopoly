import { PlayerConfirmation } from "@/features";
import { config, fetchPost, GameSocket, fetchGet, fetchDelete } from "@/shared";

const createBoard = <T>(body: PlayerConfirmation[]): Promise<T> => {
  return fetchPost("create-board", body);
};

const getAllBoards = <T>(): Promise<T> => {
  return fetchGet("all-boards");
};

const removeBoard = <T>(board_id: string): Promise<T> => {
  return fetchDelete("remove-board", { board_id }, undefined);
};

const boardWS = new GameSocket({ patch: config.GAME_BOARD_URL });

export const BoardApi = {
  createBoard,
  getAllBoards,
  removeBoard,
  boardWS,
};
