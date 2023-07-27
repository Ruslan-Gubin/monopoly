import { HandleDisconnectBoardProps } from "../../model";

export async function handleDisconnectBoard({
  boardSocket,
  fullName,
  boardId,
  playerId,
}: HandleDisconnectBoardProps) {
  // const body = {
  //   fullName,
  //   playerId,
  //   boardId,
  // };

  // boardSocket.send({
  //   method: "disconect",
  //   body,
  // });

  boardSocket.disconectSelection();
}
