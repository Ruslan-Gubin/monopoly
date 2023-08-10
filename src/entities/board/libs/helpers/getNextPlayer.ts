import { PlayerModel } from "@/entities/player";

export const getNextPlayer = (players: PlayerModel[], id: string): PlayerModel | undefined => {
 return players.find(player => player._id === id)
}