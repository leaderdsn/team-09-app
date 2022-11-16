import { debounce } from 'throttle-debounce'
import { getCurrentState } from './state'

const settings = require('./settings.js')

const { MAP_SIZE } = settings

const canvas = document.getElementById('game-canvas')
const context = canvas.getContext('2d')

setCanvasDimensions()

function setCanvasDimensions() {
  const scaleRatio = Math.max(1, 800 / window.innerWidth)
  canvas.width = scaleRatio * window.innerWidth
  canvas.height = scaleRatio * window.innerHeight
}

window.addEventListener('resize', debounce(40, setCanvasDimensions))

let animationFrameRequestId

function render() {
  const { me, others } = getCurrentState()
  if (me) {
    renderBackground()
    renderBorder(me)

    renderPlayer(me, me)
    others.forEach(renderPlayer.bind(null, me))
  }

  animationFrameRequestId = requestAnimationFrame(render)
}

function renderBackground() {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

function renderBorder(player) {
  context.strokeStyle = 'black'
  context.lineWidth = 1
  context.strokeRect(canvas.width / 2 - player.x, canvas.height / 2 - player.y, MAP_SIZE, MAP_SIZE)
}

function renderPlayer(me, player) {
  const { x, y, username, color, mass } = player;

  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  context.save();
  context.translate(canvasX, canvasY);

  context.beginPath();
  context.arc(0, 0, settings.PLAYER_RADIUS + mass, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = '#003300';
  context.stroke();

  context.restore();

  context.fillStyle = color;
  context.font = 'italic 16pt Arial';
  context.fillText(username, canvasX - 35, canvasY - 30 - mass);
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
