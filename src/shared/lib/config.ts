import { z } from "zod";
import {
  DEVELOPMENT_API_ENDPOINT,
  DEVELOPMENT_BASE_WS_URL,
  PRODUCTION_API_ENDPOINT,
  PRODUCTION_BASE_WS_URL,
} from "../constants/base-api-urls";

const envVariables = z.object({
  API_ENDPOINT: z.string().url(),
  BASE_WS_URL: z.string().url(),
});

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? DEVELOPMENT_API_ENDPOINT
    : PRODUCTION_API_ENDPOINT;

const BASE_WS_URL =
  process.env.NODE_ENV === "development"
    ? DEVELOPMENT_BASE_WS_URL
    : PRODUCTION_BASE_WS_URL;

export const config = {
  API_ENDPOINT,
  BASE_WS_URL,
  SELECTION_URL: "ws-session",
  GAME_BOARD_URL: "ws-board",
} as const;
