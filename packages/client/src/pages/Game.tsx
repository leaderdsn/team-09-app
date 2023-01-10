import React, { useEffect, useRef, useState } from 'react';
import { connect, play } from '@/game/ws-connect';
import { initCanvasElement, startRendering, stopRendering } from '@/game/render';
import { startCapturingInput, stopCapturingInput } from '@/game/input';
import { initState } from '@/game/state';
import { initLeaderboardElement, setLeaderboardHidden } from '@/game/leaderboard';
import '../game/style/main.scss';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import useFullscreenStatus from '@/hooks/fullscreen';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import audio from '@/assets/audio/audio.mp3';

const Game = () => {
  const canvasRef = useRef(null);
  // @ts-ignore
  let isFullscreen: boolean, setIsFullscreen;
  try {
    // @ts-ignore
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(canvasRef);
  } catch (e) {
    // errorMessage = "Fullscreen not supported";
    isFullscreen = false;
    setIsFullscreen = undefined;
  }
  const handleExitFullscreen = () => document.exitFullscreen();
  const handlerFullscreen = () => {
    if (!isFullscreen) {
      // @ts-ignore
      setIsFullscreen(true);
    } else {
      handleExitFullscreen();
    }
  };

  useEffect(() => {
    const playMenu = document.getElementById('play-menu');
    const playButton = document.getElementById('play-button');
    const usernameInput = document.getElementById('username-input') as HTMLInputElement;

    initCanvasElement();
    initLeaderboardElement();

    Promise.all([connect(onGameOver)])
      .then(() => {
        playMenu?.classList.remove('hidden');
        usernameInput.focus();
        if (!playButton) return;
        playButton.onclick = () => {
          play(usernameInput.value);
          playMenu?.classList.add('hidden');
          initState();
          startCapturingInput();
          startRendering();
          setLeaderboardHidden(false);
        };
      })
      .catch(console.error);

    function onGameOver() {
      stopCapturingInput();
      stopRendering();
      playMenu?.classList.remove('hidden');
      setLeaderboardHidden(true);
    }
  }, []);
  return (
    <div className="game-mvp relative w-fit" ref={canvasRef}>
      <canvas id="game-canvas"></canvas>
      <div id="play-menu" className="top-1 hidden">
        <input
          type="text"
          id="username-input"
          placeholder="Username"
          className="input-bordered input input-sm w-full max-w-xs"
        />
        <button id="play-button" className="btn-wide btn-sm btn w-full max-w-xs">
          PLAY
        </button>
      </div>
      <div id="leaderboard" className="hidden">
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
      <div id="disconnect-modal" className="hidden">
        <div>
          <h2>Disconnected from Server </h2>
          <hr />
          <button id="reconnect-button">RECONNECT</button>
        </div>
      </div>
      <div className="controls absolute right-0 bottom-0 mb-10 flex  w-full items-center justify-center text-2xl">
        <div className="fullscreen-button   cursor-pointer p-5  " onClick={handlerFullscreen}>
          {!isFullscreen ? <BsFullscreen /> : <BsFullscreenExit />}
        </div>
        <AudioPlayer url={audio} loop={true} />
      </div>
    </div>
  );
};

export default Game;
