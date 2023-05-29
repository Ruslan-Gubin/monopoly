export type UserHeaderActiveType = {
  joinGame: string | null;
  noSessions: boolean;
  startGame: string | false | null;
  removeGame: string | null;
};

export interface SelectNotificationInitState {
  notification: string
}