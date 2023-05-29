import { PlayerModel } from "@/entities/player/model";

export interface SelectionModel {
  owner: string;
  createdAt: string;
  players: PlayerModel[];
  updatedAt: string;
  __v: 0;
  _id: string;
  id?: string;
}

export interface SelectInitState {
  selectioGames: SelectionModel[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
  error: string | null;
  owner: string | null;
  joinSession: string | null;
  playersCount: number;
  authId: string | null;
  notification: string[]
}

export interface IConnectSelection {
  method: string;
  body: {
    fullName: string;
    id: string;
  };
}

export interface DisconectUpdateRes {
  method: string;
  outSession: SelectionModel | null;
  removeSessionId: SelectionModel | null;
}

export interface OutSelectionRes {
  outUserId: string;
  sessionId: string;
  sessionUpdate: SelectionModel;
}

export interface JoinSelectionRes {
  joinUserId: string;
  sessionId: string;
  sessionUpdate: SelectionModel;
}
