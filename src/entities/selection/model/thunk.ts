import { selectionMessageAction } from "@/features";
import { selectionAction } from "./selector";
import { IConnectSelection } from "./types";
import { createAppThunk } from "@/shared";
import { handleDisconnectSelection } from "../libs/helpers/handleDisconnectSelection";
import { selectionWS } from "../api";
import { selectionSocketMessage } from "./thunk-message";

export const connectSelection = createAppThunk(
  "sessionSlice/connectSelection",
  async (
    viewer: IConnectSelection,
    { rejectWithValue, dispatch, getState } 
  ) => {
    try {
      if (viewer.method === "disconect") {
        const { owner, joinSession } = getState().selection;

        await handleDisconnectSelection(
          selectionWS,
          viewer,
          owner,
          joinSession
        );

        dispatch(selectionAction.clear());
        dispatch(selectionMessageAction.clearMessages());
        return { type: "disconect", viewerId: "" };
      }

      const socketMessage = (e: MessageEvent) =>
        dispatch(selectionSocketMessage(e));
      const socketSend = () => dispatch(selectionSockedSend);

      selectionWS.openConnect({
        fullName: viewer.body.fullName,
        id: viewer.body.id,
        messageEvent: socketMessage,
        sendEvent: socketSend,
      });

      if (!selectionWS.socket) {
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
      selectionWS.send(event);
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      return rejectWithValue(`Failed to send message ${error}`);
    }
  }
);
