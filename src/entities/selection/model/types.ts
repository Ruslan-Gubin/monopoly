import { PlayerModel } from "@/entities/player";

export interface SelectionModel {
  owner: string;
  createdAt: string;
  players: PlayerModel[];
  updatedAt: string;
  __v: 0;
  _id: string;
  id?: string;
}