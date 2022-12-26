import { updateDirection } from './ws-connect'

function onMouseInput(e: MouseEvent) {
  handleInput(e.clientX, e.clientY)
}

function handleInput(x: number, y: number) {
  const direction = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y)
  updateDirection(direction)
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput)
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput)
}
