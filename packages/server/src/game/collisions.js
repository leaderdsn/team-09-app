function collisionInteractionWithPlayers(player, entities) {

  if (player === undefined) {
    return [];
  }

  const touchEntities = []
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]

    if (entity.id === player.id) {
      continue
    }

    const checkTouch = checkTouchEntity(player, entity)

    if (!checkTouch) {
      continue
    }

    if (player.mass === entity.mass) {
      continue
    }

    if (player.mass > entity.mass) {
      touchEntities.push(entity)
    }
  }

  return touchEntities
}

function checkTouchEntity(player, entity) {
  let dx = player.x - entity.x;
  let dy = player.y - entity.y;

  let distance = Math.hypot(dx, dy);

  return (distance <= player.radius + entity.radius);
}

module.exports = collisionInteractionWithPlayers
