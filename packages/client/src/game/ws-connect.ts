import { io } from 'socket.io-client'
import { throttle } from 'throttle-debounce'
import { processGameUpdate } from './state'
import settings from './settings'

type Point = {
  x: number;
  y: number;
} | null

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws'
const socket = io(`${socketProtocol}://localhost:8080`, { reconnection: false })
const connectedPromise = new Promise<void>(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!')
    resolve()
  })
})

export const connect = (onGameOver: () => void) => (
  connectedPromise.then(() => {
    socket.on(settings.MSG_TYPES.GAME_UPDATE, processGameUpdate)
    socket.on(settings.MSG_TYPES.GAME_OVER, onGameOver)
    socket.on('disconnect', () => {
      console.log('Disconnected from server.')
      document.getElementById('disconnect-modal')?.classList.remove('hidden')
      const elem = document.getElementById('reconnect-button')
      elem ? elem.onclick = () => {
        window.location.reload()
      } : null
    })
  })
)

export const play = (username: string) => {
  socket.emit(settings.MSG_TYPES.JOIN_GAME, username)
}

export const updateDirection = throttle(20, (direction: number) => {
  socket.emit(settings.MSG_TYPES.INPUT, direction)
})

export const updateTarget = throttle(20, (target: Point) => {
  socket.emit(settings.MSG_TYPES.SET_TARGET, target)
})
