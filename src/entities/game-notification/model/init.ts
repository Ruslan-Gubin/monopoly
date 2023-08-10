import { initGameNotification } from "@/shared";
import { GameNotificationInitState } from "./types";

const initialState: GameNotificationInitState = {
  gameNotification: [...initGameNotification],
}

export { initialState }