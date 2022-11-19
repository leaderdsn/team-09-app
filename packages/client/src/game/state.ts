import { updateLeaderboard } from './leaderboard'

const RENDER_DELAY = 100

type Player = {
  [key: string]: unknown;
  id: string;
  x: number;
  y: number;
  direction: number;
  speed: number;
  username: string,
  hp: number,
  mass: number,
  color: string | CanvasGradient | CanvasPattern,
}

type State = {
  t: number;
  me: Player;
  others: Player[];
  leaderboard: {
    username: string;
    score: number;
  }[];
}

const gameUpdates: State[] = []

let gameStart = 0

let firstServerTimestamp = 0

export function initState() {
  gameStart = 0
  firstServerTimestamp = 0
}

export function processGameUpdate(update: State) {
  if (!firstServerTimestamp) {
    firstServerTimestamp = update.t
    gameStart = Date.now()
  }
  gameUpdates.push(update)

  updateLeaderboard(update.leaderboard)

  const base = getBaseUpdate()
  if (base > 0) {
    gameUpdates.splice(0, base)
  }
}

function currentServerTime() {
  return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY
}

function getBaseUpdate() {
  const serverTime = currentServerTime()
  for (let i = gameUpdates.length - 1; i >= 0; i--) {
    if (gameUpdates[i].t <= serverTime) {
      return i
    }
  }
  return -1
}

export function getCurrentState() {
  if (!firstServerTimestamp) {
    return {}
  }

  const base = getBaseUpdate()
  const serverTime = currentServerTime()

  if (base < 0 || base === gameUpdates.length - 1) {
    return gameUpdates[gameUpdates.length - 1]
  } else {
    const baseUpdate = gameUpdates[base]
    const next = gameUpdates[base + 1]
    const ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t)

    return {
      me: interpolateObject(baseUpdate.me, next.me, ratio),
      others: interpolateObjectArray(baseUpdate.others, next.others, ratio)
    }
  }
}

function interpolateObject(object1: Player, object2: Player | undefined, ratio: number): Player {
  if (!object2) {
    return object1
  }

  const interpolated: Player = { ...object1 }
  Object.entries(interpolated).forEach(([key, value]) => {
    if (typeof value !== 'number') {
      interpolated[key] = object2[key]
    } else {
      const value1 = object1[key] as number
      const value2 = object2[key] as number
      interpolated[key] = value1 + (value2 - value1) * ratio
    }
  })

  return interpolated
}

function interpolateObjectArray(objects1: Player[], objects2: Player[], ratio: number) {
  return objects1.map(o => interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio))
}
