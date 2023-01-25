const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Game = require('./src/Game/Game');
const EventBus = require('./src/Message/EventBus');
const EventMessage = require('./src/Message/EventMessage');
const usersRouter = require('./src/routes/users');
const forumRouter = require('./src/routes/forum');
const cors = require("cors");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});
app.use(cors());


app.get('/', (req, res) => {
  res.send('<h1>Welcome to the game server</h1>');
});


app.use(express.static('public'));
app.use(express.json());

/** Routers */
app.use('/users', usersRouter)
app.use('/forum', forumRouter)

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

let port = process.env.PORT || 8080;

httpServer.listen(port);

const game = new Game();

game.start();
