const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Game = require('./src/Game/Game');
const { authAPI } = require('./src/api/auth');
const { leaderboardAPI } = require('./src/api/leaderboard');
const auth = require('./src/middleware/auth');
const EventBus = require('./src/Message/EventBus');
const EventMessage = require('./src/Message/EventMessage');
const usersRouter = require('./src/routes/users');
const forumRouter = require('./src/routes/forum');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});


const whitelist = [
  'http://siberia-agario-19.ya-praktikum.tech:3000', 
  'http://localhost:8080', 
  'http://127.0.0.1:3000'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

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

httpServer.listen(8080);

const game = new Game();

game.start();
