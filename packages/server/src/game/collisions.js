import settings from '../config/state'

// простой топорный расчет взаимодействия игрока с другими игроками, нужно будет рефакторить на логику взаимодействия с любыми объектами
function applyCollisions(player, players) {

  if (player === undefined) {
    return [];
  }

  const destroyedPlayers = []
  for (let i = 0; i < players.length; i++) {
    let otherPlayer = players[i]

    if (otherPlayer.id === player.id) {
      continue
    }

    let average = averageRadius(player, otherPlayer)

    if (player.distanceTo(otherPlayer) > average) {
      continue
    }

    if (player.mass === otherPlayer.mass) {
      continue
    }

    if (player.mass > otherPlayer.mass) {
      destroyedPlayers.push(otherPlayer)
    }
  }

  return destroyedPlayers
}

function averageRadius(player, otherPlayer) {
  let playerRadius = settings.PLAYER_RADIUS + player.mass
  let otherPlayerRadius = settings.PLAYER_RADIUS + otherPlayer.mass

  return (playerRadius + otherPlayerRadius) / 2
}

module.exports = applyCollisions
