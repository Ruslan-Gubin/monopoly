
const  id =  String(Date.now() + Math.random())

const sessionConstant = {
   SESSION_URL: 'ws-session',
   addPlayerObj: {id: id, fullName: 'Join', img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1683549176/Hits/icons8-plus-64_dwmkhj.png' },
   sessionEvents: {
      SendMessage: 'send_message',
      RequestAllMessages: 'request_all_messages',
      SendAllMessages: 'send_all_messages',
      ReceiveMessage: 'receive_message'
   }
}

export { sessionConstant }