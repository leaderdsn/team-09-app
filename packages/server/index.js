const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const settings = require('./src/config/state');
const Game = require('./src/game/game.js');
const { User } = require('./src/postgres/models/user');

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
app.use(express.json());

app.post('/user', (req, res) => {
  const user = req.body;
  User.create(user)
    .then(() => {
      res.send('Ok');
    })
    .catch(() => {
      res.status(500).send('database error');
    });
});

app.get('/user', (req, res) => {
  const where = req.body;
  User.findAll({ where })
    .then((users) => {
      res.send(JSON.stringify(users));
    })
    .catch(() => {
      res.status(500).send('database error');
    });
});

app.patch('/user', (req, res) => {
  const values = req.body.values;
  const where = req.body.where;
  User.update(values, { where })
    .then(() => {
      res.send('Ok');
    })
    .catch(() => {
      res.status(500).send('database error');
    });
});

app.delete('/user', (req, res) => {
  const where = req.body;
  User.destroy({ where })
    .then(() => {
      res.send('Ok');
    })
    .catch(() => {
      res.status(500).send('database error');
    });
});

io.on('connection', (socket) => {
  console.log('Player connected!', socket.id);
  User.create({ name: 'test user', theme: socket.id });

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
