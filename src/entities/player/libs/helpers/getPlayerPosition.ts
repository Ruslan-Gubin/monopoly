import { CellModel } from "@/entities/cell";
import { PlayerCanvasType, PlayerModel } from "../../model";
import { distributionPlayer } from "./distributionPlayer";

const getPlayerCount = (players: PlayerModel[]): Map<number, string[]> => {
  return players.reduce((acc, player) => {
    const countPlayersArr = acc.get(player.position) || [];
    countPlayersArr.push(player._id);
    acc.set(player.position, countPlayersArr);
    return acc;
  }, new Map());
}

export const getPlayerPosition = (cells: CellModel[], cellSize: number, players: PlayerModel[]): PlayerCanvasType[] | undefined => {
  const result = []

  const playerCountCell = getPlayerCount(players);

  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    const cellPosition = cells.find(cell => cell.position === player.position) 
    if (!cellPosition) return;

    const countPlayersCell = playerCountCell.get(player.position)
    if (!countPlayersCell) {
      continue
    }

    const distribution = distributionPlayer(cellPosition, countPlayersCell, player.color, player._id, cellSize) 
    
    result.push(distribution)
  }

  return result
}