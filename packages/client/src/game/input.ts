import { updateDirection, updateTarget } from './ws-connect'
import { getCurrentState } from '@/game/state'

let isMouseKeyPressed = false;

function onMouseInput(e: MouseEvent) {
  handleInput(e.clientX, e.clientY)
}

function handleInput(x: number, y: number) {
  if (!isMouseKeyPressed) return
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
  const box = canvas.getBoundingClientRect();
  const direction = Math.atan2(x - box.x - box.width / 2, box.y + box.height / 2 - y)
  updateDirection(direction)
}

function onMouseDown(e: MouseEvent) {
  isMouseKeyPressed = true;
  handleInput(e.clientX, e.clientY)
  updateTarget(null)
}

function onMouseUp(e: MouseEvent) {
  const state = getCurrentState()
  const playerX = state.me ? state.me.x : 0
  const playerY = state.me ? state.me.y : 0

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
  const box = canvas.getBoundingClientRect();

  isMouseKeyPressed = false;

  const target = {
    x: playerX + (e.clientX - box.x - box.width / 2),
    y: playerY + (e.clientY - box.y - box.height / 2)
  }
  updateTarget(target)
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
}
