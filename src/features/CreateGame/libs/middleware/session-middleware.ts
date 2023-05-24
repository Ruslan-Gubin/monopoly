import { Socket } from "@/shared";
import { Middleware } from "redux";
import { sessionConstant } from "../../constants/sessionConstant";
import { sessionAction } from "../slice/sessionsSlice";
import { connectResponse, selectionApi } from "../slice/sessionThunk";


const sessionMiddleware: Middleware = (store) => {
  const { dispatch } = store;
  // const socket = new Socket();
  // socket.patch = sessionConstant.SESSION_URL;
  // socket.wsName = 'sessionMiddleware';

  return (next) => (action) => {
    // const { owner, authId, joinSession } = store.getState().sessionSlice

    // const isConnection =
    //   socket.socket?.readyState === 1 &&
    //   store.getState().sessionSlice.isConnected;
      
    
    // let connectAuthData: {
    //   method: string;
    //   id: string;
    //   fullName: string;
    // } | null = null;

    // if (sessionAction.startConnecting.match(action)) {
    //   connectAuthData = action.payload.auth;
    //   socket.connect();

    //   socket.on("open", openConnect);
    //   socket.on("message", messageEvent);
    //   socket.on('close', disconected) 
    // }

    // function openConnect() {
    //   if (!connectAuthData ) return;
    //   console.log(connectAuthData)
    //   socket.send(connectAuthData);
    //   dispatch(sessionAction.connectionEstablished());
    // }

    // function messageEvent(e: MessageEvent) {
    //   const messageEvent = JSON.parse(e.data);
    //   console.log(messageEvent);

    //   switch (messageEvent.method) {
    //     case "connectData":
    //       dispatch(connectResponse(messageEvent))
    //       dispatch(sessionAction.connectData({ sessions: messageEvent.data }))
    //       break;
    //     case "connectedUser":
    //       console.log(`user ${messageEvent.title} connected`);
    //       break;
    //     case "disconectUser":
    //       dispatch(sessionAction.disconectUpdate(messageEvent))
    //       if (messageEvent.outUserId === store.getState().sessionSlice.authId) {
    //         disconected()
    //       } else {
    //         console.log(` ${messageEvent.title}`);
    //       }
    //       break;
    //     case 'createSession':
    //       dispatch(sessionAction.addNewSessions( messageEvent.data ))
    //       break;
    //     case 'removeSession':
    //       dispatch(sessionAction.removeSessionsUpdate(messageEvent));
    //       break;
    //     case 'joinSession':
    //       dispatch(sessionAction.joinSessionUpdate({
    //         joinUserId: messageEvent.joinUserId, 
    //         sessionId: messageEvent.sessionId, 
    //         sessionUpdate: messageEvent.data 
    //       }));
    //       break;
    //     case 'uotSession':
    //       dispatch(sessionAction.outSessionUpdate({
    //         outUserId: messageEvent.outUserId, 
    //         sessionId: messageEvent.sessionId, 
    //         sessionUpdate: messageEvent.data 
    //       }));
    //       break;
    //   }
    // }

    // function disconected() {
    //   if (!socket.socket) return;
    //   socket.socket.removeEventListener("open", openConnect);
    //   socket.socket.removeEventListener("message", messageEvent);
    //   socket.socket.removeEventListener("close", disconected);
    //   socket.disconnect()
    // }

    // if (sessionAction.createSession.match(action) && isConnection) {
    //   socket.send(action.payload);
    // }

    // if (sessionAction.removeSession.match(action) && isConnection) {
    //   socket.send(action.payload);
    // }

    // if (sessionAction.joinSession.match(action) && isConnection) {
    //   socket.send(action.payload);
    // }

    // if (sessionAction.outSession.match(action) && isConnection) {
    //   socket.send(action.payload);
    // }

    // if (sessionAction.disconect.match(action) && isConnection) {
    //   console.log(action.payload.body.owner)
    //   socket.send({
    //     method: 'disconect',
    //       body: {
    //         fullName: action.payload.body.fullName,
    //         id: authId,
    //         owner: owner ? owner : '',
    //         joinSession: joinSession ? joinSession : '',
    //       },
    //   })
    // }

    next(action);
  };
};

export { sessionMiddleware };
