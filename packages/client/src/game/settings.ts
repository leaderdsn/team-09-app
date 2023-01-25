const settings = Object.freeze({
  SERVER_URL: 'http://127.0.0.1:8080',
  MAP_SIZE: 2000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    DISCONNECT: 'disconnect'
  }
})

export default settings
