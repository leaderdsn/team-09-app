import React, { useEffect } from 'react'
import { connect, play } from '@/game/ws-connect'
import { initCanvasElement, startRendering, stopRendering } from '@/game/render'
import { startCapturingInput, stopCapturingInput } from '@/game/input'
import { initState } from '@/game/state'
import { initLeaderboardElement, setLeaderboardHidden } from '@/game/leaderboard'
import '../game/css/main.scss'

const Game = () => {
  useEffect(() => {
    const playMenu = document.getElementById('play-menu')
    const playButton = document.getElementById('play-button')
    const usernameInput = document.getElementById('username-input') as HTMLInputElement

    initCanvasElement()
    initLeaderboardElement()

    Promise.all([
      connect(onGameOver)
    ]).then(() => {
      playMenu?.classList.remove('hidden')
      usernameInput.focus()
      if (!playButton) return
      playButton.onclick = () => {
        play(usernameInput.value)
        playMenu?.classList.add('hidden')
        initState()
        startCapturingInput()
        startRendering()
        setLeaderboardHidden(false)
      }
    }).catch(console.error)

    function onGameOver() {
      stopCapturingInput()
      stopRendering()
      playMenu?.classList.remove('hidden')
      setLeaderboardHidden(true)
    }

  }, [])

  return (
    <div className='game-mvp'>
      <canvas id='game-canvas'></canvas>
      <div id='play-menu' className='hidden'>
        <input type='text' id='username-input' placeholder='Username' className="input input-bordered input-sm w-full max-w-xs" />
        <button id='play-button' className="btn btn-wide w-full btn-sm max-w-xs">PLAY</button>
      </div>

      <div id='leaderboard' className='hidden'>
        <table>
          <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div id='disconnect-modal' className='hidden'>
        <div>
          <h2>Disconnected from Server </h2>
          <hr />
          <button id='reconnect-button'>RECONNECT</button>
        </div>
      </div>

    </div>
  )
}

export default Game
