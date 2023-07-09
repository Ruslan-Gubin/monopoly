import { Socket } from "@/shared";


interface ISelectionConnectBody {
    id: string;
    fullName: string;
    messageEvent: (e: MessageEvent) => void
    sendEvent: () => void
}

class SelectionSocket extends Socket {
  patch='ws-session'
  id: string | null
  fullName: string | null
  messageEvent: ((e: MessageEvent) => void) | null
  sendEvent: (() => void) | null

  constructor() {
    super()
    this.id = null
    this.fullName = null
    this.messageEvent = null
    this.sendEvent = null
    this.connectSelection = this.connectSelection.bind(this)
    this.disconectSelection = this.disconectSelection.bind(this)
  }
  
  openConnect({id, fullName, messageEvent, sendEvent}: ISelectionConnectBody) {
    this.connect(this.patch)
    this.id = id
    this.fullName = fullName
    this.messageEvent = messageEvent
    this.sendEvent = sendEvent
    
    this.onEvent('send', this.sendEvent)
    this.onEvent('message', this.messageEvent)
    this.onEvent('open', this.connectSelection)
    this.onEvent('close', this.disconectSelection)
  }
  
  connectSelection () {
    this.send({
      fullName: this.fullName, 
      id: this.id, 
      method: 'connection'
    })
  }
  
  disconectSelection() {
    if (this.messageEvent) {
      this.offEvent('open', this.messageEvent)
    }
    if (this.sendEvent) {
      this.offEvent('open', this.sendEvent)
    }
    this.offEvent('open', this.connectSelection)
    this.offEvent('open', this.disconectSelection)
    this.disconnect()
    
  }
  
  
}

export { SelectionSocket }
