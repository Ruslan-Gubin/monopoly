import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { getPlayerPosition, getTargetPosition } from "../libs";
import { IfinishedMoveUpdatePosition, IMoveActiveProps, IPlayerUpdatePosition, PlayerInitState, PlayerModel } from "./types";

export const reducers = {

  playerUpdatePosition(state: PlayerInitState, action: PayloadAction<IPlayerUpdatePosition>) {
  const { cells, cellSize } = action.payload
  const position = getPlayerPosition(cells, cellSize, state.players)
  if (!position) return;
  state.playersPosition = position
  },

  initAllPlayers(state: PlayerInitState, action: PayloadAction<{ players: PlayerModel[], authId: string | null }>) {
    const { authId, players } = action.payload
    state.players = players

    if (authId) {
      const findAuthPlayer = players.find(player => player.user_id === authId)
      if (!findAuthPlayer) return;
      
      state.player = findAuthPlayer
    }
  },

  moveActive(state: PlayerInitState, action: PayloadAction<IMoveActiveProps>){
    if (!action.payload.cells || !action.payload.board) return;
    const { board, cells, diceValue } = action.payload

    const target = getTargetPosition({
      board,
      cells,
      diceValue,
      players: state.players
    }) 
    if (!target) return;
    state.target = { x: target.targetX, y: target.targetY, id: target.cellTargetId };
    state.newPosition = target.newPosition;
    state.isMove = true;
  },

  finishedMoveUpdatePosition(state: PlayerInitState, action: PayloadAction<IfinishedMoveUpdatePosition>){
    const { cells, cellSize, player } = action.payload

    const playerId = state.players.findIndex(p => p._id === player._id)
    state.players[playerId] = player
    const position = getPlayerPosition(cells, cellSize, state.players)
    if (!position) return;
    state.playersPosition = position
  },

  moveFinished(state: PlayerInitState, action: PayloadAction<{ x: number, y: number, color: string }>) {
    const { color, x, y } = action.payload

    state.playersPosition.forEach(player => {
      if (player.color === color) {
        player.x = x
        player.y = y
      }
    })
    state.isMove = false;
  },

  updatePlayer(state: PlayerInitState, action: PayloadAction<{ player: PlayerModel }>) {
    if (!action.payload.player) return;
    const { player } = action.payload

    const playerId = state.players.findIndex(p => p._id === player._id)
    state.players[playerId] = player

    if (player._id === state.player?._id) {
      state.player = player
    }
  },

};
