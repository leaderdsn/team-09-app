import { debounce } from 'throttle-debounce'
import { getCurrentState } from './state'
import settings from './settings'

const { MAP_SIZE } = settings

type Player = {
  id: string;
  x: number;
  y: number;
  direction: number;
  speed: number;
  username: string,
  hp: number,
  mass: number,
  radius: number,
  color: string | CanvasGradient | CanvasPattern,
}

let canvas: HTMLCanvasElement | null = null
let context: CanvasRenderingContext2D | null = null

export function initCanvasElement() {
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement
  context = canvas.getContext('2d')

  setCanvasDimensions()
}

function setCanvasDimensions() {
  const scaleRatio = Math.max(1, 800 / window.innerWidth)
  if (!canvas) return
  canvas.width = scaleRatio * window.innerWidth
  canvas.height = scaleRatio * window.innerHeight / 1.2
}

window.addEventListener('resize', debounce(40, setCanvasDimensions))

let animationFrameRequestId: number

function render() {
  const { me, others, eats } = getCurrentState();
  if (me) {
    renderBackground()
    // @ts-ignore
    renderBorder(me)

    // @ts-ignore
    renderPlayer(me, me)
    // @ts-ignore
    others.forEach(renderPlayer.bind(null, me))
    others.forEach(player => renderPlayer.bind(player))
    eats.forEach(renderEats.bind(null, me))
    eats.forEach(eat => renderEats.bind(eat))

  }

  animationFrameRequestId = requestAnimationFrame(render)
}

function renderBackground() {
  if (!canvas || !context) return
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

function renderBorder(player: Player) {
  if (!canvas || !context) return
  context.strokeStyle = 'black'
  context.lineWidth = 1
  context.strokeRect(canvas.width / 2 - player.x, canvas.height / 2 - player.y, MAP_SIZE, MAP_SIZE)
}

function renderPlayer(me: Player, player: Player) {
  if (!canvas || !context) return
  const { x, y, username, color, radius } = player

  const canvasX = canvas.width / 2 + x - me.x
  const canvasY = canvas.height / 2 + y - me.y


  context.save()
  context.translate(canvasX, canvasY)

  context.beginPath()
  context.arc(0, 0, radius, 0, 2 * Math.PI, false)
  context.fillStyle = color
  context.fill()
  context.closePath()
  context.lineWidth = 4
  context.strokeStyle = '#003300'
  context.stroke()

  context.restore()

  context.fillStyle = color
  context.font = 'italic 16pt Arial'
  context.fillText(username, canvasX - 35, canvasY - 30 - radius)
}

function renderEats(eat) {
  if (!canvas || !context) return;
  const { x, y, username, color, radius } = eat
  const canvasX = canvas.width / 2 + x
  const canvasY = canvas.height / 2 + y

  context.save();
  context.translate(canvasX, canvasY);

  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI, false)
  context.fillStyle = color
  context.fill()
  context.closePath()
  context.fillStyle = color
  context.font = 'italic 16pt Arial'
  context.fillText(username, canvasX - 5, canvasY - 3 - radius)

}

function renderMainMenu() {
  renderBackground()

  animationFrameRequestId = requestAnimationFrame(renderMainMenu)
}

animationFrameRequestId = requestAnimationFrame(renderMainMenu)

export function startRendering() {
  cancelAnimationFrame(animationFrameRequestId)
  animationFrameRequestId = requestAnimationFrame(render)
}

export function stopRendering() {
  cancelAnimationFrame(animationFrameRequestId)
  animationFrameRequestId = requestAnimationFrame(renderMainMenu)
}
