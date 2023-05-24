import { Socket2 } from "./Socket2";

interface ISelectionConnectBody {
    id: string;
    fullName: string;
}

class SelectionSocket extends Socket2 {
  id: string
  fullName: string
  patch: string
  data: []

  constructor({id, fullName}: ISelectionConnectBody) {
    super()
    this.patch = 'ws-session'
    this.id = id
    this.fullName = fullName
    this.openConnect = this.openConnect.bind(this)
    this.connectSelection = this.connectSelection.bind(this)
    this.disconectSelection = this.disconectSelection.bind(this)
    this.messageEvent = this.messageEvent.bind(this)
    this.data = []
    
  }
  
  openConnect() {
    this.connect(this.patch)
    if (!this.socket) return;
    this.onEvent('open', this.connectSelection)
    this.onEvent('message', this.messageEvent)
    this.onEvent('close', this.disconectSelection)
    this.onEvent('error', this.messageError)
  }

  connectSelection () {
    this.send({
      fullName: this.fullName, 
      id: this.id, 
      method: 'connection'
    })
  }
  
  disconectSelection() {
    if (this.socket) {
      this.socket.onerror = null
    }
    this.offEvent('open', this.connectSelection)
    this.offEvent('message', this.messageEvent)
    this.offEvent('close', this.disconectSelection)
    this.offEvent('close', this.messageError)
  }

  messageError() {
    console.log('error')
  }

 async messageEvent(e: MessageEvent) {
    const messageEvent = JSON.parse(e.data);
    // console.log(messageEvent);

    switch (messageEvent.method) {
      case "connectData":
        this.data = messageEvent
        this.connectData()
        
        // dispatch(sessionAction.connectData({sessions: messageEvent.data}))
        break;
      // case "connectedUser":
      //   console.log(`user ${messageEvent.title} connected`);
      //   break;
      // case "disconectUser":
      //   dispatch(sessionAction.disconectUpdate(messageEvent))
      //   if (messageEvent.outUserId === store.getState().sessionSlice.authId) {
      //     disconected()
      //   } else {
      //     console.log(` ${messageEvent.title}`);
      //   }
      //   break;
      // case 'createSession':
      //   dispatch(sessionAction.addNewSessions( messageEvent.data ))
      //   break;
      // case 'removeSession':
      //   dispatch(sessionAction.removeSessionsUpdate(messageEvent));
      //   break;
      // case 'joinSession':
      //   dispatch(sessionAction.joinSessionUpdate({
      //     joinUserId: messageEvent.joinUserId, 
      //     sessionId: messageEvent.sessionId, 
      //     sessionUpdate: messageEvent.data 
      //   }));
      //   break;
      // case 'uotSession':
      //   dispatch(sessionAction.outSessionUpdate({
      //     outUserId: messageEvent.outUserId, 
      //     sessionId: messageEvent.sessionId, 
      //     sessionUpdate: messageEvent.data 
      //   }));
      //   break;
    }

  }

 async connectData() {
    console.log(this.data)
    return this.data
  }



}


// export const selectionApi = new SelectionSocket({
//   fullName: 'Ruslan', 
//   id: '645a6863aa6ea6b2fe4c5942'
// })


export { SelectionSocket }