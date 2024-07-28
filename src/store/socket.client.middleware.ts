import { Middleware } from 'redux';
import { socketActions } from './reducers/socketReducer';
import { io, Socket } from 'socket.io-client';
import config from '../config';
// import { Message } from '../db/schemas/message.model';
// import { Conversation } from '../db/schemas/conversation.model';
const socket: Socket = io(config.socketUrl, {
  withCredentials: true,
  rejectUnauthorized: false,
  autoConnect: false,
});
const socketClientMiddleware: Middleware = store => {
  return next => action => {
    const isConnectionEstablished = store.getState().socket.isConnected;
    if (socketActions.startConnecting.match(action)) {
      if (
        isConnectionEstablished === false &&
        store.getState().socket.isEstablishingConnection === false
      ) {
        socket.on('connect', () => {
          console.log('@@@@@@@@@@@@@@@@');
          console.log('Socket connected : ', socket.id);
          console.log('@@@@@@@@@@@@@@@@');
        });
        socket.on('connect_error', err => {
          console.log(`connect_error due to ${err.message}`);
        });

        socket.on('disconnect', () => {
          console.log('@@@@@@@@@@@@@@@@');
          console.log('Socket Disconnected : ', socket.id);
          console.log('@@@@@@@@@@@@@@@@');
        });
        socket.on('connect_error', () => {
          console.log('@@@@@@@@@@@@@@@@');
          console.log('Socket Disconnected : ', socket.id);
          console.log('@@@@@@@@@@@@@@@@');
        });
        socket.on('pong', () => {
          console.log('@@@@@@@@@@@@@@@@');
          console.log('pong', socket.id);
          console.log('@@@@@@@@@@@@@@@@');
        });

        socket.connect();
        // setInterval(() => {
        //   console.log(socket.connected);
        // }, 2000);
        socket.emit('ping');
      }
      // if (store.getState().auth.userData !== null) {
      if (!socket.hasListeners('message-received')) {
        socket.on(`message-received`, async (arg: any) => {
          console.log('---------------message-received', arg);
          // const newMessage = (await Message.create(
          //   arg,
          //   globalThis.realm,
          // )) as Message;

          // await Conversation.updateLastMessage(
          //   { id: newMessage.conversation, lastMessage: newMessage },
          //   globalThis.realm,
          // );
        });
      }
      if (!socket.hasListeners('message-delivered')) {
        socket.on(`message-delivered`, (arg: any) => {
          console.log('---------------message-delivered', arg);
        });
      }
      if (!socket.hasListeners('message-seen')) {
        socket.on(`message-seen`, (arg: any) => {
          console.log('---------------message-seen', arg);
        });
      }
    } else if (socketActions.disconnect.match(action)) {
      socket.disconnect();
      socket.removeAllListeners();
    } else if (socketActions.sendMessage.match(action)) {
      socket
        .emitWithAck('send-message', action.payload)
        .then(async (arg: any) => {
          console.log('--------------send-message', arg);
          // const newMessage = (await Message.create(
          //   arg,
          //   globalThis.realm,
          // )) as Message;

          // await Conversation.updateLastMessage(
          //   { id: newMessage.conversation, lastMessage: newMessage },
          //   globalThis.realm,
          // );
        });
    }
    next(action);
  };
};

export default socketClientMiddleware;
