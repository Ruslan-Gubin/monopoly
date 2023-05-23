import { appConstant } from "../constants/appConstant"


class Socket  {
  socket: WebSocket | null
  patch: string | null
  mainPatch: string
  wsName: string | null

  constructor() {
    this.socket = null
    this.patch = null
    this.mainPatch = appConstant.BASE_WS_URL
    this.wsName = null
  }

  connect() {
    if (!this.socket) {
      const newUrl = new URL(`${this.mainPatch}/${this.patch}`)
      this.socket = new WebSocket(newUrl)
    }
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  send(message: object) {
    if (this.socket ) {
      this.socket.send(JSON.stringify(message))
    }
  }

  on(eventName: string, callback: (e: MessageEvent | any) => void) {
    if (this.socket ) {
      this.socket.addEventListener(eventName, callback)
    }
  }

  getLogName() {
    return console.log('this ws name :', this.wsName)
  }

}

export { Socket }