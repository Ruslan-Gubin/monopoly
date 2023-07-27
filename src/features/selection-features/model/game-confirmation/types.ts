export interface PlayerConfirmation {
  id: string;
  img: string;
  fullName: string;
  confirmation: boolean;
  color: string | null;
}


export interface gameConfirmationInit {
  isModalActive: boolean;
  players: PlayerConfirmation[];
  sessionId: string | null;
  playerColor: string[];
  selectedColor: string | null;
}
