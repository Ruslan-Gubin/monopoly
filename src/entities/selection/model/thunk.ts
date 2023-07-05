import {  gameConfirmationAction, selectionMessageAction, selectionNotificationAction } from '@/features'
import { SelectionSocket } from '../api'
import { selectionAction } from './selector'
import { IConnectSelection } from './types'
import { createAppThunk } from '@/shared';

const selectionApi = new SelectionSocket()


export const connectSelection = createAppThunk('sessionSlice/connectSelection', async(viewer: IConnectSelection, { rejectWithValue, dispatch, getState }) => {
  
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
    dispatch(selectionMessageAction.clearMessages())
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

export const selectionSockedSend = createAppThunk('sessionSlice/selectionSockedSend', async(event: object) => {
  selectionApi.send(event)
})


export const selectionSocketMessage = createAppThunk('sessionSlice/selectionSocketMessage', async(e:MessageEvent, { dispatch, getState }) => {
  const messageEvent = JSON.parse(e.data);
  const authId = getState().viewer.authId

  switch (messageEvent.method) {
    case "connectData":
      dispatch(selectionAction.connectData({ sessions: messageEvent.data }))
      break;
      case "connectedUser":
        dispatch(selectionNotificationAction.setNotification(messageEvent.title))
        dispatch(selectionMessageAction.setMessages(messageEvent.messages))
      break;
    case "disconectUser":
      dispatch(selectionAction.disconectUpdate(messageEvent))
      dispatch(selectionNotificationAction.setNotification(messageEvent.title))
      break;
    case 'createSession':
      dispatch(selectionNotificationAction.setNotification(`${messageEvent.data.players[0].fullName} создает игру`))
      dispatch(selectionAction.addNewSessions( messageEvent.data ))
      break;
      case 'removeSession':
        dispatch(selectionNotificationAction.setNotification(`${messageEvent.fullName} удаляет игру`))
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
    case 'createMessage':
      dispatch(selectionMessageAction.addNewMessage(messageEvent.newMessage))
      break;
    case 'sessionStartConfirmation':
      if (!authId) return;
      dispatch(selectionAction.setSelections({ sessions: messageEvent.sessions }))
      dispatch(gameConfirmationAction.setStartConfirmation({ players: messageEvent.players, authId, sessionId: messageEvent.sessionId }))
      break;
      
      case 'confirmParticipationGame':
        dispatch(gameConfirmationAction.setConfinmPlayer({ player: messageEvent.player, sessionId: messageEvent.sessionId }))
        break;
      case 'cancelParticipationGame':
      dispatch(selectionAction.setSelections({ sessions: messageEvent.sessions }))
      dispatch(selectionNotificationAction.setNotification(`${messageEvent.authName} отменяет игру`))
      dispatch(gameConfirmationAction.cancelConfinmPlayer({ sessionId: messageEvent.sessionId }))
      break;
  }

})


 



 




