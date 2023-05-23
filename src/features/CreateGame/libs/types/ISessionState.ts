import { ISessions } from "@/app/types/ISessions";

interface ISessionState {
  sessions: ISessions[];
  isEstablishingConnection: boolean;
  isConnected: boolean;

  owner: string | null;
  joinSession: string | null;
  playersCount: number;
  authId: string | null;
}

export type { ISessionState }