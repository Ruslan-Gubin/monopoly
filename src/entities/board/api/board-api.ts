import { PlayerConfirmation } from "@/features";
import { config, fetchPost, GameSocket } from "@/shared";

const createBoard = <T>(body: PlayerConfirmation[]): Promise<T> => {
    return fetchPost('create-board', body)
}

const boardWS = new GameSocket({ patch: config.GAME_BOARD_URL })

export const BoardApi = {
  createBoard,
  boardWS,
}