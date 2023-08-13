import { BoardApi } from "../api";
import { createAppThunk } from "@/shared";
import {  handleDisconnectBoard } from "../libs";
import { IConnectBoard } from "./types";
import { boardSocketMessage, resetBoardState } from "./thunk-massage";

export const connectBoard = createAppThunk(
  "sessionSlice/connectBoard",
  async (viewer: IConnectBoard, { rejectWithValue, dispatch, getState }) => {
    try {
      if (viewer.method === "disconect") {
        await handleDisconnectBoard({
          boardSocket: BoardApi.boardWS,
          boardId: viewer.body.boardId,
          fullName: viewer.body.fullName,
          playerId: viewer.body.id,
        });

        resetBoardState(dispatch)

        return { type: "disconect" };
      }

      const socketMessage = (e: MessageEvent) =>
        dispatch(boardSocketMessage(e));
      const socketSend = () => dispatch(boardSockedSend);
      BoardApi.boardWS.setBoardId = viewer.body.boardId;

      BoardApi.boardWS.openConnect({
        fullName: viewer.body.fullName,
        id: viewer.body.id,
        messageEvent: socketMessage,
        sendEvent: socketSend,
      });

      if (!BoardApi.boardWS.socket) {
        rejectWithValue("Error connecting to socket");
      }
      return { type: "connect" };
    } catch (error) {
      console.error("Failed to connect game board WebSocket:", error);
      return rejectWithValue(
        `Failed to connect game board WebSocket: ${error}`
      );
    }
  }
);

export const boardSockedSend = createAppThunk(
  "sessionSlice/boardSockedSend",
  async (event: object, { rejectWithValue }) => {
    try {
      BoardApi.boardWS.send(event);
    } catch (error) {
      console.error("Failed to send message game board WebSocket:", error);
      return rejectWithValue(
        `Failed to send message game board WebSocket: ${error}`
      );
    }
  }
);
