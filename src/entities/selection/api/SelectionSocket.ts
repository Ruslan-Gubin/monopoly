import { config, GameSocket } from "@/shared";

export const selectionWS = new GameSocket({ patch: config.SELECTION_URL });
