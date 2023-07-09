import { config } from "@/shared/lib";

class Socket {
  socket: WebSocket | null;
  private mainPatch: string;

  constructor() {
    this.socket = null;
    this.mainPatch = config.BASE_WS_URL;
  }

  connect(patch: string) {
    if (!this.socket) {
      const newUrl = new URL(`${this.mainPatch}/${patch}`);
      this.socket = new WebSocket(newUrl);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(message: object) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  onEvent(eventName: string, callback: (e: MessageEvent | any) => void) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }

  offEvent(eventName: string, callback: (e: MessageEvent | any) => void) {
    if (this.socket) {
      this.socket.removeEventListener(eventName, callback);
    }
  }
}

export { Socket };
