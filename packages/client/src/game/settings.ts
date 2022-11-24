const settings = Object.freeze({
  SERVER_URL: 'http://localhost:8080',
  MAP_SIZE: 6000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    SET_TARGET: 'set_target',
    GAME_OVER: 'dead',
    DISCONNECT: 'disconnect'
  }
})

export default settings
