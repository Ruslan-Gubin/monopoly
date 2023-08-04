import { HandleDisconnectBoardProps } from "../../model";

export async function handleDisconnectBoard({
  boardSocket,
  fullName,
  boardId,
  playerId,
}: HandleDisconnectBoardProps) {

  boardSocket.send({
    method: "disconect",
    body: { 
      fullName,
      boardId,
      id: playerId,
    },
  });

  boardSocket.disconectSelection();
}
