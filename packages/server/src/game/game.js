const Player = require('../player/player.js');
const Food = require('../food/food');
const settings = require('../config/state');
const collisionInteractionWithPlayers = require('./collisions.js');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.eats = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;

    // Цикл жизни/обновления приложения
    setInterval(this.update.bind(this), 1000 / 60);
    setInterval(this.addEat.bind(this), 1000);
  }

  // Основная логика приложения
  update() {
    // создаем метку времени
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // обновляем состояние игроков
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      player.update(dt);
    });

    // просчитываем взаимодействия игроков друг с другом
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];

      const touchEntities = collisionInteractionWithPlayers(player, Object.values(this.players));

      touchEntities.forEach(touchEntity => {

        player.addMass(dt, touchEntity);
        touchEntity.removeMass(dt, player);

        if (touchEntity.mass <= settings.PLAYER_MIN_MASS) {

          console.log(touchEntity);

          if (touchEntity instanceof Player) {
            const socket = this.sockets[touchEntity.id];
            socket.emit(settings.MSG_TYPES.GAME_OVER);
            player.addScore(touchEntity);
            this.removePlayer(socket);
          }
        }
      });
    });

    // Отправка сообщения подписчикам (клиенты игры)
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(settings.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  createUpdate(player, leaderboard) {
    // p.distanceTo(player) <= settings.MAP_SIZE / 2  - это проверка на какое расстояние мы отрисовываем противников
    const otherPlayers = Object.values(this.players).filter(
      (p) => p !== player && p.distanceTo(player) <= settings.MAP_SIZE / 2
    );

    // const eat = Object.values(this.eats).filter(
    //   (p) => p !== player && p.distanceTo(player) <= settings.MAP_SIZE / 2
    // );
    const eat=this.eats
    console.log(`############___game---87___#######\n`,this.eats);

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: otherPlayers.map((p) => p.serializeForUpdate()),
      eats: eat.map((p) => p.serializeForUpdate()),
      leaderboard,
    };
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket

    const x = settings.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = settings.MAP_SIZE * (0.25 + Math.random() * 0.5);
    console.log(`############___game---103___#######\n`,this.players);
    this.players[socket.id] = new Player(socket.id, username, x, y);
    console.log(`############___game---105___#######\n`,);
  }

  addEat() {
    console.log(`############___game---109___#######\n`,this.eats);
    const x = settings.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = settings.MAP_SIZE * (0.25 + Math.random() * 0.5);


      this.eats.push(new Food(x,y,600))

    // }
  }

  removePlayer(socket) {
    console.log("Player disconnected!", socket.id);

    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, direction) {
    if (this.players[socket.id]) {
      this.players[socket.id].setDirection(direction)
    }
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }))
  }
}

module.exports = Game;
