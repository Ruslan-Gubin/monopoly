import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { gameConfirmationInit, PlayerConfirmation } from './types'


export const reducers = { 

  setStartConfirmation(state: gameConfirmationInit, action: PayloadAction<{ players: PlayerConfirmation[], authId: string, sessionId: string }>) {
    const checkPlayer = action.payload.players.some((player: {id: string}) => player.id === action.payload.authId)
    if (!checkPlayer) return;
    
    state.players = action.payload.players.map(player => {
      return {...player, confirmation: false}
    })
    state.isModalActive = true
    state.sessionId = action.payload.sessionId
  },

  setConfinmPlayer(state: gameConfirmationInit, action: PayloadAction<{ player: string,  sessionId: string }>) {
    const playerId = action.payload.player
    const sessionId = action.payload.sessionId

    if (sessionId !== state.sessionId) {
      return;
    }

    state.players = state.players.map(player => {
      if (player.id === playerId) {
        return { ...player, confirmation: true }
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
  },
 
}