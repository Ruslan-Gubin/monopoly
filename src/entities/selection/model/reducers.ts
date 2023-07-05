import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { DisconectUpdateRes, JoinSelectionRes, OutSelectionRes, SelectInitState, SelectionModel } from './types'
import { selectionEmptyArray, selectionFindViewer, updateCountPlayers, updateSessions } from '../libs/helpers';

export const reducers = { 
  
  connectData(state: SelectInitState, action: PayloadAction<{ sessions: SelectionModel[] }>) {
    state.selectioGames = action.payload.sessions;
    const checkEmpty = selectionEmptyArray(action.payload.sessions, state)
    
    if (checkEmpty)  return;
    
    selectionFindViewer(action.payload.sessions, state)
  },
  
  disconectUpdate(state: SelectInitState, action: PayloadAction<DisconectUpdateRes>) {
   const outSelection = action.payload.outSession
   const removeSelection = action.payload.removeSessionId      

   if (outSelection) {
    const prevSelection = state.selectioGames.find(selection => selection._id === outSelection._id)

    if (prevSelection) {
      prevSelection.players = outSelection.players
    }

    updateCountPlayers({
      id: outSelection._id,
      state: state,
      length: outSelection.players.length
    })
   }
  
   if (removeSelection) {
        state.selectioGames = state.selectioGames.filter(session => session._id !== removeSelection._id)
        if (removeSelection._id === state.joinSession) {
          state.joinSession = null
        } 
    }
  },

  addNewSessions(state: SelectInitState, action: PayloadAction<SelectionModel>) {
    if (state.authId === action.payload.owner) {
      state.owner = action.payload._id
      state.playersCount = 1   
    }

    state.selectioGames.unshift(action.payload)  
  },
  
  removeSessionsUpdate(state: SelectInitState, action: PayloadAction<{ method: string, id: string }>) {
    if (state.owner && state.owner === action.payload.id) {
      state.owner = null;
      state.playersCount = 0;
    }

    if (state.joinSession && state.joinSession === action.payload.id) {
      state.joinSession = null;
    }

    state.selectioGames = state.selectioGames.filter(selection => selection._id !== action.payload.id) 
  },

  joinSessionUpdate(state: SelectInitState, action: PayloadAction<JoinSelectionRes>) {
    if (action.payload.joinUserId === state.authId) {
      state.joinSession = action.payload.sessionUpdate._id
    }

    updateCountPlayers({
      id: action.payload.sessionId,
      state: state,
      length: action.payload.sessionUpdate.players.length
    })
    
    state.selectioGames = updateSessions(state.selectioGames, action.payload.sessionId, action.payload.sessionUpdate)  
  },

  outSessionUpdate(state: SelectInitState, action: PayloadAction<OutSelectionRes>) {
    if (state.authId === action.payload.outUserId) {
      state.joinSession = null
    }

    updateCountPlayers({ 
      id: action.payload.sessionId,
      state: state,
      length: action.payload.sessionUpdate.players.length
    })

    state.selectioGames = updateSessions(state.selectioGames, action.payload.sessionId, action.payload.sessionUpdate)
  },

  setSelections(state: SelectInitState, action: PayloadAction<{ sessions: SelectionModel[] }>) {
    state.selectioGames = action.payload.sessions;
  },

  clear(state: SelectInitState) {
    state.selectioGames = [];
    state.isConnected = false
    state.isEstablishingConnection = false
    state.joinSession = null
    state.owner = null
    state.playersCount = 0
  },

}