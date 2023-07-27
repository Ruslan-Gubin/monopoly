import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { gameConfirmationInit, PlayerConfirmation } from './types'

export const reducers = { 

  setStartConfirmation(state: gameConfirmationInit, action: PayloadAction<{ players: PlayerConfirmation[], authId: string, sessionId: string }>) {
    const { authId, players, sessionId } = action.payload

    const checkPlayer = players.some((player: {id: string}) => player.id === authId)
    if (!checkPlayer) return;
    
    state.players = players.map(player => {
      return {...player, confirmation: false, color: null}
    })
    
    state.isModalActive = true;
    state.sessionId = sessionId;
    state.playerColor = ['red', 'blue', 'green', 'yellow', 'pink', 'black'];
  },

  setConfinmPlayer(state: gameConfirmationInit, action: PayloadAction<{ playerId: string,  sessionId: string, color: string }>) {
    const { color, playerId, sessionId } = action.payload

    if (sessionId !== state.sessionId) {
      return;
    }

    if (state.selectedColor === color) {
      state.selectedColor = null;
    }

    state.playerColor = state.playerColor.filter(c => c !== color)
    state.players = state.players.map(player => {
      if (player.id === playerId) {
        return { ...player, confirmation: true, color }
      } else {
        return player
      }
    })
  },

  cancelConfinmPlayer(state: gameConfirmationInit, action: PayloadAction<{ sessionId: string }>) {
    const sessionId = action.payload.sessionId

    if (sessionId !== state.sessionId) {
      return;
    }
    
    state.players = []
    state.isModalActive = false
    state.sessionId = null
    state.selectedColor = null
  },

  setSelectedColor(state: gameConfirmationInit, action: PayloadAction<string>) {
    state.selectedColor = action.payload
  },
 
}