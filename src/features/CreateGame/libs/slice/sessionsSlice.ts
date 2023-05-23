import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as types from "../types";
import { ISessions } from "@/app/types/ISessions";
import { updateSessions } from "../helpers/updateSessions";
import { DisconectUpdateRes } from "../types/DisconectUpdateRes";


const initialState: types.ISessionState = {
  sessions: [],
  isEstablishingConnection: false,
  isConnected: false,

  owner: null,
  joinSession: null,
  playersCount: 0,
  authId: null,
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {

    startConnecting(state, action: PayloadAction<{auth: {method: string, id: string, fullName: string}}>) {
      state.isEstablishingConnection = true;
      state.authId = action.payload.auth.id
    },
    
    connectionEstablished(state) {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },

    connectData(state, action: PayloadAction<{ sessions: ISessions[] }>) {
      state.sessions = action.payload.sessions;
      sessionSlice.caseReducers.findUserSessions(state, action)
    },
    
    disconect(state, action: PayloadAction<types.IDisconectBody>) {
      console.log(state.owner)
      return;
    },
    
    disconectUpdate(state, action: PayloadAction<DisconectUpdateRes>) {
      console.log(action.payload.outUserId)
      if (action.payload.outUserId === state.authId) {
        state.isEstablishingConnection = false;
        state.isConnected = false;
        // state.sessions = [];
        // state.joinSession = null;
        // state.authId = null;
        // state.owner = null;
      } 
        if (action.payload.removeSession) {
          console.log(action.payload.removeSession._id)
          state.sessions = state.sessions.filter(session => session._id !== action?.payload?.removeSession?._id) 
        }
      

    },

    findUserSessions(state, action: PayloadAction<{ sessions: ISessions[] }>) {
      if (action.payload.sessions.length === 0) {
        state.joinSession = null
        state.owner = null
        return;
      }

      action.payload.sessions.forEach(session => {
       if (session.owner === state.authId) {
        state.owner = session._id
        state.playersCount = session.players.length
        state.joinSession = null
       }

        session.players.forEach( (player, ind) => {
          if (player.id === state.authId && ind >= 1 ) {
              state.owner = null
              state.playersCount = 0
              state.joinSession = session._id
          }

        })
      })

    },

    createSession(state, action: PayloadAction<types.CreateSessionBody>) {
      return;
    },

    addNewSessions(state, action: PayloadAction<ISessions>) {
      if (state.authId === action.payload.owner) {
        state.owner = action.payload._id
        state.playersCount = 1  
        console.log(state.owner) 
      }

      state.sessions.unshift(action.payload)  

    },
    
    removeSession: (state, action: PayloadAction<{ method: string, id: string }>) => {
      return;
    },
    
    removeSessionsUpdate(state, action: PayloadAction<{ method: string, id: string }>) {
      if (state.owner && state.owner === action.payload.id) {
        state.owner = null;
        state.playersCount = 0;
      }

      if (state.joinSession && state.joinSession === action.payload.id) {
        state.joinSession = null;
      }

      state.sessions = state.sessions.filter(session => session._id !== action.payload.id) 
    },

    joinSession(state, action: PayloadAction<types.IJoinSessionBody>) {
      return;
    },

    joinSessionUpdate(state, action: PayloadAction<{joinUserId: string, sessionId: string, sessionUpdate: ISessions}>) {
      if (action.payload.joinUserId === state.authId) {
        state.joinSession = action.payload.sessionUpdate._id
      }

      if (action.payload.sessionId === state.owner) {
        state.playersCount = state.playersCount + 1
      } 
      
      state.sessions = updateSessions(state.sessions, action.payload.sessionId, action.payload.sessionUpdate)  
    },

    outSession(state, action: PayloadAction<{method: string, body: { sessionId: string, playerId: string }}>) {
      return;
    },

    outSessionUpdate(state, action: PayloadAction<{ outUserId: string, sessionId: string, sessionUpdate: ISessions }>) {
      if (state.authId === action.payload.outUserId) {
        state.joinSession = null
      }

      if (action.payload.sessionId === state.owner) {
        state.playersCount = state.playersCount - 1
      }

      state.sessions = updateSessions(state.sessions, action.payload.sessionId, action.payload.sessionUpdate)
    },

  },
});

export const selectSession = (state: RootState) => state.sessionSlice;

export const sessionAction = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
