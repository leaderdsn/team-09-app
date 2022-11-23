module.exports = Object.freeze({
  PLAYER_RADIUS: 10,
  PLAYER_RADIUS_FACTOR: 25,

  PLAYER_MAX_MASS: 13,
  PLAYER_MIN_MASS: 0.2,
  PLAYER_FACTOR_MASS: 0.0005,

  PLAYER_MAX_SPEED: 150,
  PLAYER_MIN_SPEED: 50,

  SCORE_PER_SECOND: 0.25,
  SCORE_FACTOR: 0.25,

  MAP_SIZE: 6000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    DISCONNECT: 'disconnect',
  },
});
