import {
  gameConfirmationAction,
  selectionMessageAction,
  selectionNotificationAction,
} from "../../../features";

import { SelectionSocket } from "../api";
import { selectionAction } from "./selector";
import { IConnectSelection } from "./types";
import { createAppThunk } from "../../../shared";
import { handleDisconnectSelection } from "../libs/helpers/handleDisconnectSelection";

const selectionApi = new SelectionSocket();

export const connectSelection = createAppThunk(
  "sessionSlice/connectSelection",
  async (
    viewer: IConnectSelection,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      if (viewer.method === "disconect") {
        
        const { owner, joinSession } = getState().selection;
        
        await handleDisconnectSelection(selectionApi,viewer, owner, joinSession);

        dispatch(selectionAction.clear());
        dispatch(selectionMessageAction.clearMessages());
        return { type: "disconect", viewerId: "" };
      }

      const socketMessage = (e: MessageEvent) =>
        dispatch(selectionSocketMessage(e));
      const socketSend = () => dispatch(selectionSockedSend);

      selectionApi.openConnect({
        fullName: viewer.body.fullName,
        id: viewer.body.id,
        messageEvent: socketMessage,
        sendEvent: socketSend,
      });

      if (!selectionApi.socket) {
        rejectWithValue("Error connecting to socket");
      }

      return { type: "connect", viewerId: viewer.body.id };
    } catch (error) {
      console.error("Failed to connect WebSocket id selection:", error);
      return rejectWithValue(
        `Failed to connect WebSocket id selection: ${error}`
      );
    }
  }
);

export const selectionSockedSend = createAppThunk(
  "sessionSlice/selectionSockedSend",
  async (event: object, { rejectWithValue }) => {
    try {
      selectionApi.send(event);
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      return rejectWithValue(`Failed to send message ${error}`);
    }
  }
);

export const selectionSocketMessage = createAppThunk(
  "sessionSlice/selectionSocketMessage",
  async (e: MessageEvent, { rejectWithValue, dispatch, getState }) => {
    try {
      const messageEvent = JSON.parse(e.data);
      const authId = getState().viewer.authId;

      switch (messageEvent.method) {
        case "connectData":
          dispatch(
            selectionAction.connectData({ sessions: messageEvent.data })
          );
          break;
        case "connectedUser":
          dispatch(
            selectionNotificationAction.setNotification(messageEvent.title)
          );
          dispatch(selectionMessageAction.setMessages(messageEvent.messages));
          break;
        case "disconectUser":
          dispatch(selectionAction.disconectUpdate(messageEvent));
          dispatch(
            selectionNotificationAction.setNotification(messageEvent.title)
          );
          break;
        case "createSession":
          dispatch(
            selectionNotificationAction.setNotification(
              `${messageEvent.data.players[0].fullName} создает игру`
            )
          );
          dispatch(selectionAction.addNewSessions(messageEvent.data));
          break;
        case "removeSession":
          dispatch(
            selectionNotificationAction.setNotification(
              `${messageEvent.fullName} удаляет игру`
            )
          );
          dispatch(selectionAction.removeSessionsUpdate(messageEvent));
          break;
        case "joinSession":
          dispatch(
            selectionAction.joinSessionUpdate({
              joinUserId: messageEvent.joinUserId,
              sessionId: messageEvent.sessionId,
              sessionUpdate: messageEvent.data,
            })
          );
          break;
        case "uotSession":
          dispatch(
            selectionAction.outSessionUpdate({
              outUserId: messageEvent.outUserId,
              sessionId: messageEvent.sessionId,
              sessionUpdate: messageEvent.data,
            })
          );
          break;
        case "createMessage":
          dispatch(
            selectionMessageAction.addNewMessage(messageEvent.newMessage)
          );
          break;
        case "sessionStartConfirmation":
          if (!authId) return;
          dispatch(
            selectionAction.setSelections({ sessions: messageEvent.sessions })
          );
          dispatch(
            gameConfirmationAction.setStartConfirmation({
              players: messageEvent.players,
              authId,
              sessionId: messageEvent.sessionId,
            })
          );
          break;

        case "confirmParticipationGame":
          dispatch(
            gameConfirmationAction.setConfinmPlayer({
              player: messageEvent.player,
              sessionId: messageEvent.sessionId,
            })
          );
          break;
        case "cancelParticipationGame":
          dispatch(
            selectionAction.setSelections({ sessions: messageEvent.sessions })
          );
          dispatch(
            selectionNotificationAction.setNotification(
              `${messageEvent.authName} отменяет игру`
            )
          );
          dispatch(
            gameConfirmationAction.cancelConfinmPlayer({
              sessionId: messageEvent.sessionId,
            })
          );
          break;
      }
    } catch (error) {
      console.error("Failed to get message in WebSocket selection:", error);
      return rejectWithValue(
        `Failed to get message in WebSocket selection: ${error}`
      );
    }
  }
);
