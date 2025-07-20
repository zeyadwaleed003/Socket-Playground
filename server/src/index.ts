import path from 'path';
import express from 'express';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

const expressServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// I don't need the `cors` option anymore because the frontend & backend are hosted on the same server now by express
const io = new Server(expressServer);

// Listen for a new client connection
io.on('connection', (socket) => {
  // When a client connects, log their unique socket.id
  console.log(`User ${socket.id} connected`);

  // Listen for 'message' events from the connected client
  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });
});
