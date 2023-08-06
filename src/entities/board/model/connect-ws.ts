import { actionCells } from "@/entities/cell";
import { actionDice } from "@/entities/dice";
import { playerAction } from "@/entities/player";
import { actionProperty } from "@/entities/property";
import { createAppThunk } from "@/shared";
import { BoardApi } from "../api";
import { handleDisconnectBoard } from "../libs";
import { boardAction } from "./selector";
import { IConnectBoard } from "./types";


export const connectBoard = createAppThunk("sessionSlice/connectBoard", async (viewer: IConnectBoard, { rejectWithValue, dispatch, getState }) => {
    try {
      if (viewer.method === "disconect") {
        await handleDisconnectBoard({
          boardSocket: BoardApi.boardWS,
          boardId: viewer.body.boardId,
          fullName: viewer.body.fullName,
          playerId: viewer.body.id
        }
        );
        return { type: "disconect" };
      }

      const socketMessage = (e: MessageEvent) => dispatch(boardSocketMessage(e));
      const socketSend = () => dispatch(boardSockedSend);
      BoardApi.boardWS.setBoardId = viewer.body.boardId

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
      return rejectWithValue(`Failed to send message game board WebSocket: ${error}`);
    }
  }
);

export const boardSocketMessage = createAppThunk(
  "sessionSlice/boardSocketMessage",
  async (e: MessageEvent, { rejectWithValue, dispatch, getState }) => {
    try {
      const messageEvent = JSON.parse(e.data);
      const { authId } = getState().viewer;
      const { cells, smallSize } = getState().cells
      const { board } = getState().board

      // console.log(messageEvent)
      
      switch (messageEvent.method) {
        case "connectData":
          dispatch(actionCells.getAllCells({cells: messageEvent.data.cells}));
          dispatch(playerAction.initAllPlayers({ players: messageEvent.data.players, authId }))
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }))
          dispatch(actionDice.setDice({ dice: messageEvent.data.dice }))
          dispatch(actionProperty.initProperty({ propertys: messageEvent.data.propertys }))
          break;
        case "roolDice":
          dispatch(actionDice.setDice({ dice: messageEvent.data.dice }));
          if (!messageEvent.data.boardUpdate) {
            dispatch(playerAction.moveActive({ cells, diceValue: messageEvent.data.dice.value, board }));
          }
          dispatch(boardAction.updateBoard({ board: messageEvent.data.boardUpdate }))
          dispatch(playerAction.updatePlayer({ player: messageEvent.data.playerUpdate }))
          
          break;
        case "finishedMove":
          if (!cells) return;
          dispatch(playerAction.finishedMoveUpdatePosition({ 
            player: messageEvent.data.player,
            cellSize: smallSize, 
            cells, 
          }))
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }))
          dispatch(playerAction.updatePlayer({ player: messageEvent.data.player }))
          break;
        case "buyProperty":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }))
          dispatch(playerAction.updatePlayer({ player: messageEvent.data.player }))
          dispatch(actionProperty.updatePropertys({ property: messageEvent.data.property, manyProperty: messageEvent.data.manyProperty }))
          break;
        case "pay":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }))
          dispatch(playerAction.updatePlayer({ player: messageEvent.data.player }))
          if (messageEvent.data.propertyOwner) {
            dispatch(playerAction.updatePlayer({ player: messageEvent.data.propertyOwner }))
          }
          break;
        case "updateProperty":
          dispatch(playerAction.updatePlayer({ player: messageEvent.data.player }))
          dispatch(actionProperty.updateProperty({ property: messageEvent.data.property }))
          break;
        case "mortgageProperty":
          console.log(messageEvent)
          dispatch(playerAction.updatePlayer({ player: messageEvent.data.player }))
          dispatch(actionProperty.updateProperty({ property: messageEvent.data.property }))
          break;
       
      }
    } catch (error) {
      console.error("Failed to get message in WebSocket game board:", error);
      return rejectWithValue(
        `Failed to get message in WebSocket game board: ${error}`
      );
    }
  }
);