
interface SelectionPlayers {
  id: string;
  fullName: string;
  img: string;
}

export interface SelectionModel {
  owner: string;
  createdAt: string;
  players: SelectionPlayers[];
  updatedAt: string;
  __v: 0;
  _id: string;
  id?: string;
  isConfirm: boolean;
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
