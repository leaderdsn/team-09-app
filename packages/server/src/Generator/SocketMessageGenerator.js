const EventMessage = require('../Message/EventMessage')

class SocketMessageGenerator {

  shouldSendUpdate = false

  creatingMessageTheFront(sockets, entities) {
    if (this.shouldSendUpdate) {
      Object.values(sockets).forEach(socket => {

        let player = entities[socket.id];

        if (player === undefined) {
          return
        }

        socket.emit(EventMessage.SOCKET.GAME_UPDATE, this.createUpdate(player, entities))
      })
      this.shouldSendUpdate = false
    } else {
      this.shouldSendUpdate = true
    }
  }

  createUpdate(player, entities) {
    const players = Object.values(entities).filter(player => player.type === 'player')

    const otherPlayers = Object.values(entities).filter(
      otherPlayer => otherPlayer.type === 'player' && otherPlayer !== player && otherPlayer.distanceTo(player) <= 500
    )

    const activeFoods = Object.values(entities).filter(
      food => food.type === 'food'
    )

    return {
      time: Date.now(),
      player: player.serializeForUpdate(),
      otherPlayers: otherPlayers.map(p => p.serializeForUpdate()),
      foods: activeFoods.map(f => f.serializeForUpdate()),
      leaderboard: this.getLeaderboard(players)
    }
  }

  getLeaderboard(players) {
    return Object.values(players)
      .sort((p1, p2) => p2.score.value - p1.score.value)
      .slice(0, 5)
      .map(p => ({ name: p.name, score: Math.round(p.score.value) }))
  }
}

module.exports = new SocketMessageGenerator()
