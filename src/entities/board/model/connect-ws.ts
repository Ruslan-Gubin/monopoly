import { createAppThunk } from "@/shared";
import { BoardApi } from "../api";
import { handleDisconnectBoard } from "../libs";
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
        return; 
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
      console.log(BoardApi.boardWS)
    } catch (error) {
      console.error("Failed to connect WebSocket id selection:", error);
      return rejectWithValue(
        `Failed to connect WebSocket id selection: ${error}`
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
      console.error("Failed to connect WebSocket:", error);
      return rejectWithValue(`Failed to send message ${error}`);
    }
  }
);

export const boardSocketMessage = createAppThunk(
  "sessionSlice/boardSocketMessage",
  async (e: MessageEvent, { rejectWithValue, dispatch, getState }) => {
    try {
      const messageEvent = JSON.parse(e.data);
      const authId = getState().viewer.authId;

      console.log(messageEvent)

      switch (messageEvent.method) {
        // case "connectData":
        //   dispatch(
        //     selectionAction.connectData({ sessions: messageEvent.data })
        //   );
        //   break;
        // case "connectedUser":
        //   dispatch(
        //     selectionNotificationAction.setNotification(messageEvent.title)
        //   );
        //   dispatch(selectionMessageAction.setMessages(messageEvent.messages));
        //   break;
        // case "disconectUser":
        //   dispatch(selectionAction.disconectUpdate(messageEvent));
        //   dispatch(
        //     selectionNotificationAction.setNotification(messageEvent.title)
        //   );
        //   break;
        // case "createSession":
        //   dispatch(
        //     selectionNotificationAction.setNotification(
        //       `${messageEvent.data.players[0].fullName} создает игру`
        //     )
        //   );
        //   dispatch(selectionAction.addNewSessions(messageEvent.data));
        //   break;
        // case "removeSession":
        //   dispatch(
        //     selectionNotificationAction.setNotification(
        //       `${messageEvent.fullName} удаляет игру`
        //     )
        //   );
        //   dispatch(selectionAction.removeSessionsUpdate(messageEvent));
        //   break;
        // case "joinSession":
        //   dispatch(
        //     selectionAction.joinSessionUpdate({
        //       joinUserId: messageEvent.joinUserId,
        //       sessionId: messageEvent.sessionId,
        //       sessionUpdate: messageEvent.data,
        //     })
        //   );
        //   break;
        // case "uotSession":
        //   dispatch(
        //     selectionAction.outSessionUpdate({
        //       outUserId: messageEvent.outUserId,
        //       sessionId: messageEvent.sessionId,
        //       sessionUpdate: messageEvent.data,
        //     })
        //   );
        //   break;
        // case "createMessage":
        //   dispatch(
        //     selectionMessageAction.addNewMessage(messageEvent.newMessage)
        //   );
        //   break;
        // case "sessionStartConfirmation":
        //   if (!authId) return;
        //   dispatch(
        //     selectionAction.setSelections({ sessions: messageEvent.sessions })
        //   );
        //   dispatch(
        //     gameConfirmationAction.setStartConfirmation({
        //       players: messageEvent.players,
        //       authId,
        //       sessionId: messageEvent.sessionId,
        //     })
        //   );
        //   break;

        // case "confirmParticipationGame":
        //   dispatch(gameConfirmationAction.setConfinmPlayer(messageEvent.body));
        //   break;
        // case "cancelParticipationGame":
        //   dispatch( selectionAction.setSelections({ sessions: messageEvent.sessions }));
        //   dispatch( selectionNotificationAction.setNotification(`${messageEvent.authName} отменяет игру`));
        //   dispatch(gameConfirmationAction.cancelConfinmPlayer({ sessionId: messageEvent.sessionId}));
        //   break;
        // case "createGameBoard":
        //   dispatch(selectionNotificationAction.setNotification(messageEvent.title));

        //   if (authId && messageEvent.user_id.includes(authId)) {
        //     dispatch(boardAction.getStartBoardId(messageEvent.board_id))
        //   }
        //   break;
      }
    } catch (error) {
      console.error("Failed to get message in WebSocket selection:", error);
      return rejectWithValue(
        `Failed to get message in WebSocket selection: ${error}`
      );
    }
  }
);