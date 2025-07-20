import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

// Once we have a connection stablished with websockets
// Then we will be listening to this socket
wss.on('connection', (socket) => {
  // Inside this socket we are listening for a message and do something with it
  socket.on('message', (message) => {
    // The message will be received as a buffer. Ex: <Buffer 5a 65 79 61 64>
    console.log(message);

    const messageText = message.toString('utf-8');
    console.log(messageText);

    socket.send(`${message}`);
  });
});
