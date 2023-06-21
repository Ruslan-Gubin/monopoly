import { Socket } from './Socket';

describe('Socket', () => {
  let socket: Socket;

  beforeEach(() => {
    socket = new Socket();
  });

  afterEach(() => {
    if (socket.socket) {
      socket.disconnect();
    }
  });

  it('should be able to connect to a WebSocket server', () => {
    socket.connect('test');

    expect(socket.socket).not.toBeNull();
    expect(socket.socket?.readyState).toBe(0);
  });

  it('should be able to disconnect from a WebSocket server', () => {
    socket.connect('test');
    socket.disconnect();

    expect(socket.socket).toBeNull();
  });

});
