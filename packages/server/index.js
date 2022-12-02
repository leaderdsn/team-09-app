const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const Game = require('./src/Game/Game');

const EventBus = require('./src/Message/EventBus');
const EventMessage = require('./src/Message/EventMessage');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the game server</h1>');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Player connected!', socket.id);

  socket.on(EventMessage.SOCKET.JOIN_GAME, onJoin);
  socket.on(EventMessage.SOCKET.INPUT, onInput);
  socket.on(EventMessage.SOCKET.DISCONNECT, onDisconnect);
});

function onJoin(username) {
  EventBus.emit(EventMessage.PLAYER.JOIN, this, username)
}

function onInput(rotation) {
  EventBus.emit(EventMessage.PLAYER.INPUT, this, rotation)
}

function onDisconnect() {
  EventBus.emit(EventMessage.PLAYER.DISCONNECT, this)
}

httpServer.listen(8080);

const game = new Game();

game.start();
