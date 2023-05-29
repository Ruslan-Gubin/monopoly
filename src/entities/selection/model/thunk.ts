import {  selectionNotificationAction } from '@/features'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SelectionSocket } from '../api'
import { selectionAction } from './selector'
import { IConnectSelection } from './types'


const selectionApi = new SelectionSocket()


export const connectSelection = createAsyncThunk<{ type: string, viewerId: string }, IConnectSelection, { rejectValue: string,  state: RootState } >('sessionSlice/connectSelection', async(viewer, { rejectWithValue, dispatch, getState }) => {
  
  if (viewer.method === 'disconect') {
    const owner = getState().selection.owner;
    const joinSession = getState().selection.joinSession;
    selectionApi.send({
      method: viewer.method,
      body: {
      fullName: viewer.body.fullName,
      id: viewer.body.id,
      joinSession: joinSession ? joinSession : '',
      owner: owner ? owner : '',
      }
    })
    selectionApi.disconectSelection()
    return { type: 'disconect', viewerId: '' }
  }

  const socketMessage = (e: MessageEvent) => dispatch(selectionSocketMessage(e))
  const socketSend = () => dispatch(selectionSockedSend) 

   
  selectionApi.openConnect({ 
    fullName: viewer.body.fullName, 
    id: viewer.body.id,
    messageEvent: socketMessage,
    sendEvent: socketSend, 
  })

  if (!selectionApi.socket) {
    rejectWithValue('Errro')
  }
  
  return { type: 'connect', viewerId: viewer.body.id }
})

export const selectionSockedSend = createAsyncThunk<unknown, object>('sessionSlice/selectionSockedSend', async(event) => {
  selectionApi.send(event)
})


export const selectionSocketMessage = createAsyncThunk<any, MessageEvent>('sessionSlice/selectionSocketMessage', async(e:MessageEvent, { dispatch }) => {
  const messageEvent = JSON.parse(e.data);



  switch (messageEvent.method) {
    case "connectData":
      dispatch(selectionAction.connectData({ sessions: messageEvent.data }))
      break;
      case "connectedUser":
        dispatch(selectionNotificationAction.setNotification(messageEvent.title))
      break;
    case "disconectUser":
      dispatch(selectionAction.disconectUpdate(messageEvent))
      dispatch(selectionNotificationAction.setNotification(messageEvent.title))
      break;
    case 'createSession':
      dispatch(selectionAction.addNewSessions( messageEvent.data ))
      break;
      case 'removeSession':
        dispatch(selectionAction.removeSessionsUpdate( messageEvent ))
      break;
      case 'joinSession': 
      dispatch(selectionAction.joinSessionUpdate({
        joinUserId: messageEvent.joinUserId, 
        sessionId: messageEvent.sessionId, 
        sessionUpdate: messageEvent.data 
      }));
      break;
    case 'uotSession':
      dispatch(selectionAction.outSessionUpdate({
        outUserId: messageEvent.outUserId, 
        sessionId: messageEvent.sessionId, 
        sessionUpdate: messageEvent.data 
      }));
      break;
  }

})


 



 




