  import { boardAction } from "@/entities";
import { gameConfirmationAction, selectionMessageAction, selectionNotificationAction } from "@/features";
import { createAppThunk } from "@/shared";
import { selectionAction } from "./selector";


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
          dispatch(boardAction.checkActiveGame({ boardId: messageEvent.boardId, }))
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
          dispatch(gameConfirmationAction.setConfinmPlayer(messageEvent.body));
          break;
        case "cancelParticipationGame":
          dispatch( selectionAction.setSelections({ sessions: messageEvent.sessions }));
          dispatch( selectionNotificationAction.setNotification(`${messageEvent.authName} отменяет игру`));
          dispatch(gameConfirmationAction.cancelConfinmPlayer({ sessionId: messageEvent.sessionId}));
          break;
        case "createGameBoard":
          if (authId && messageEvent.user_id.includes(authId)) {
            dispatch(boardAction.getStartBoardId(messageEvent.board_id))
          }
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