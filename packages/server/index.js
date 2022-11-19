import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import settings from './src/config/state'
import Game from './src/game/game'

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

  socket.on(settings.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(settings.MSG_TYPES.INPUT, handleInput);
  socket.on(settings.MSG_TYPES.DISCONNECT, onDisconnect);
});

httpServer.listen(8080);

const game = new Game();

function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(direction) {
  game.handleInput(this, direction);
}

function onDisconnect() {
  game.removePlayer(this);
}