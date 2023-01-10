const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { User } = require('./src/postgres/models/user');
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
