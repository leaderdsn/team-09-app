module.exports = Object.freeze({
  PLAYER_RADIUS: 20,
  PLAYER_MASS: 1,
  PLAYER_MAX_HP: 100,
  PLAYER_MAX_SPEED: 300,
  PLAYER_MIN_SPEED: 100,

  MASS_PER_SECOND: 1.25,
  SCORE_PER_SECOND: 1,

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    DISCONNECT: 'disconnect',
  },
});
