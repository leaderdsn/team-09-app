const EventMessage = {
  AWAKE: 'game:awake',
  UPDATE: 'game:update',
  FIXED_UPDATE: 'game:fixed_update',
  MESSAGE: {
    UPDATE: 'message:update'
  },
  PLAYER: {
    JOIN: 'player:join',
    INPUT: 'player:input',
    DEAD: 'player:game_over',
    DISCONNECT: 'player:disconnect'
  },
  FOOD: {
    ADD: 'food:add',
    DESTROY: 'food:destroy'
  },
  ENTITY: {
    START: 'message:start',
    AWAKE: 'message:awake',
    UPDATE: 'message:update',
    FIXED_UPDATE: 'message:fixed_update',
  },
  STATE: {
    ADD: 'game:state:add',
    REMOVE: 'game:state:remove',
    UPDATE: 'game:state:update'
  },
  GENERATE: {
    FOOD: 'generate:food'
  },
  SOCKET: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    DISCONNECT: 'disconnect',
  },
  TRIGGER: {
    ENTER: 'trigger:enter'
  }
}

module.exports = EventMessage