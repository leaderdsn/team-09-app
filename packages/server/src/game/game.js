const Player = require('../entity/player.js')
const Food = require('../entity/food')
const Sourness = require('../entity/sourness')
const settings = require('../config/state')
const collisionInteractionWithPlayers = require('./collisions.js')
const { v4: uuidv4 } = require('uuid')

class Game {
  constructor() {
    this.sockets = {}
    this.players = {}
    this.foods = {}

    this.tempFoods = {
      small: {},
      medium: {},
      big: {},
      enemy: {}
    }
    this.lastUpdateTime = Date.now()
    this.shouldSendUpdate = false

    // Цикл жизни/обновления приложения
    setInterval(this.update.bind(this), 1000 / 60)
  }

  // Основная логика приложения
  update() {
    // создаем метку времени
    const now = Date.now()
    const dt = (now - this.lastUpdateTime) / 1000
    this.lastUpdateTime = now

    let foodSmallCount = 300 - Object.values(this.tempFoods.small).length

    for (let i = 1; i <= foodSmallCount; i++) {
      const code = uuidv4()
      const x = settings.MAP_SIZE * (Math.random() * 0.95)
      const y = settings.MAP_SIZE * (Math.random() * 0.95)

      let food = new Food(code, x, y, Math.random() * (1 - 0.25) + 0.25);

      this.tempFoods.small[code] = food
      this.foods[code] = food
    }

    let foodMediumCount = 100 - Object.values(this.tempFoods.medium).length

    for (let i = 1; i <= foodMediumCount; i++) {
      const code = uuidv4()
      const x = settings.MAP_SIZE * (Math.random() * 0.95)
      const y = settings.MAP_SIZE * (Math.random() * 0.95)

      let food = new Food(code, x, y, Math.random() * (3 - 1) + 1)

      this.tempFoods.medium[code] = food
      this.foods[code] = food
    }

    let foodBigCount = 50 - Object.values(this.tempFoods.big).length

    for (let i = 1; i <= foodBigCount; i++) {
      const code = uuidv4()
      const x = settings.MAP_SIZE * (Math.random() * 0.95)
      const y = settings.MAP_SIZE * (Math.random() * 0.95)

      let food = new Food(code, x, y, Math.random() * (5 - 3) + 3)

      this.tempFoods.big[code] = food
      this.foods[code] = food
    }

    let foodEnemyCount = 150 - Object.values(this.tempFoods.enemy).length

    for (let i = 1; i <= foodEnemyCount; i++) {
      const code = uuidv4()
      const x = settings.MAP_SIZE * (Math.random() * 0.95)
      const y = settings.MAP_SIZE * (Math.random() * 0.95)

      let food = new Sourness(code, x, y, Math.random() * (4 - 0.5) + 0.05)

      this.tempFoods.enemy[code] = food
      this.foods[code] = food
    }

    // обновляем состояние игроков
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID]
      player.update(dt)

      if (player.mass <= settings.PLAYER_MIN_MASS) {
        if (player instanceof Player) {
          const socket = this.sockets[player.id]
          socket.emit(settings.MSG_TYPES.GAME_OVER)
          this.removePlayer(socket)
        }
      }
    })

    // обновляем состояние еды
    Object.values(this.foods).forEach(food => {
      food.update(dt)

      const touchFoods = collisionInteractionWithPlayers(food, Object.values(this.foods))

      touchFoods.forEach(touchFood => {
        if (food.mass > touchFood.mass) {
          food.addMass(dt, touchFood)
          touchFood.removeMass(dt, food)
        }

        if (touchFood.mass <= settings.PLAYER_MIN_MASS) {
          this.removeFood(touchFood)
        }
      })
    })

    // просчитываем взаимодействия игроков друг с другом
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID]

      const touchEntities = collisionInteractionWithPlayers(player, Object.values(this.players))

      touchEntities.forEach(touchEntity => {
        if (player.mass > touchEntity.mass) {
          player.addMass(dt, touchEntity)
          touchEntity.removeMass(dt, player)
        }

        if (touchEntity.mass <= settings.PLAYER_MIN_MASS) {
          if (touchEntity instanceof Player) {
            const socket = this.sockets[touchEntity.id]
            socket.emit(settings.MSG_TYPES.GAME_OVER)
            player.addScore(touchEntity)
            this.removePlayer(socket)
          }
        }
      })

      const touchFoods = collisionInteractionWithPlayers(player, Object.values(this.foods))

      touchFoods.forEach(touchFood => {
          if (touchFood instanceof Sourness) {
            player.removeMass(dt, touchFood)
            touchFood.removeMass(dt, player)
          } else {
            if (player.mass > touchFood.mass) {
              player.addMass(dt, touchFood)
              touchFood.removeMass(dt, player)
            } else {
              touchFood.addMass(dt, player)
              player.removeMass(dt, touchFood)
            }
          }

          if (touchFood.mass <= settings.PLAYER_MIN_MASS) {
            if (touchFood instanceof Food) {
              player.addScore(touchFood)
              this.removeFood(touchFood)
            }
          }
        }
      )
    })

    // Отправка сообщения подписчикам (клиенты игры)
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard()
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID]
        const player = this.players[playerID]
        socket.emit(settings.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard))
      })
      this.shouldSendUpdate = false
    } else {
      this.shouldSendUpdate = true
    }
  }

  createUpdate(player, leaderboard) {
    // p.distanceTo(entity) <= settings.MAP_SIZE / 2  - это проверка на какое расстояние мы отрисовываем противников
    const otherPlayers = Object.values(this.players).filter(
      p => p !== player && p.distanceTo(player) <= settings.MAP_SIZE / 4
    )

    const foods = Object.values(this.foods).filter(
      food => food.distanceTo(player) <= settings.MAP_SIZE / 4
    )

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: otherPlayers.map(p => p.serializeForUpdate()),
      foods: foods.map(f => f.serializeForUpdate()),
      leaderboard
    }
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket

    console.log('Player join to game!', username, socket.id)

    const x = settings.MAP_SIZE * (0.25 + Math.random() * 0.75)
    const y = settings.MAP_SIZE * (0.25 + Math.random() * 0.75)
    this.players[socket.id] = new Player(socket.id, username, x, y)
  }

  removePlayer(socket) {
    console.log('Player disconnected!', socket.id)

    delete this.sockets[socket.id]
    delete this.players[socket.id]
  }

  removeFood(food) {
    delete this.foods[food.id]
    delete this.tempFoods.small[food.id]
    delete this.tempFoods.medium[food.id]
    delete this.tempFoods.big[food.id]
    delete this.tempFoods.enemy[food.id]
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

module.exports = Game
