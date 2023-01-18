const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const settings = require('./src/config/state');
const Game = require('./src/game/game.js');
const { authAPI } = require('./src/api/auth');
const { leaderboardAPI } = require('./src/api/leaderboard');
const auth = require('./src/middleware/auth');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

const corsOptions ={
  origin:'http://localhost:3000',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the game server</h1>');
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.post('/auth/signin', authAPI.signin);
app.post('/auth/logout', auth, authAPI.logout);
app.get('/auth/user', auth, authAPI.fetchUser);
app.get('/oauth/yandex/service-id',  authAPI.getServiceId);
app.post('/oauth/yandex', authAPI.signinOauth);

app.post('/leaderboard/19-T9', auth, leaderboardAPI.getLeaders)

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
