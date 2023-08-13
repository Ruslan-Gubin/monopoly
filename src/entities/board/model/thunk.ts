import { PlayerConfirmation } from "@/features";
import { createAppThunk } from "@/shared";
import { BoardApi } from "../api";
import { AllBoardGames } from "./types";

export const createBoard = createAppThunk(
  "board/createBoard",
  async (body: PlayerConfirmation[], { rejectWithValue }) => {
    const response = await BoardApi.createBoard<string>(body);

    if (!response) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const getAllBoards = createAppThunk(
  "board/getAllBoards",
  async (_: void, { rejectWithValue }) => {
    const response = await BoardApi.getAllBoards<AllBoardGames[] | string>();

    if (typeof response === "string") {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const removeBoard = createAppThunk(
  "board/removeBoard",
  async (board_id: string, { rejectWithValue }) => {
    const response = await BoardApi.removeBoard<AllBoardGames[] | string>(board_id);

    if (typeof response === "string") {
      return rejectWithValue(response);
    }

    return response;
  }
);
