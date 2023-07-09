export interface PlayerConfirmation {
  id: string;
  img: string;
  fullName: string;
  confirmation: boolean;
}


export interface gameConfirmationInit {
  isModalActive: boolean;
  players: PlayerConfirmation[];
  sessionId: string | null;
}
