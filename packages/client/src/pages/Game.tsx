import React, { useEffect, useRef } from 'react';
import { connect, play, reconnect } from '@/game/ws-connect';
import { initCanvasElement, startRendering, stopRendering } from '@/game/render';
import { startCapturingInput, stopCapturingInput } from '@/game/input';
import { initState } from '@/game/state';
import { initLeaderboardElement, setLeaderboardHidden } from '@/game/leaderboard';
import '../game/style/main.scss';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import useFullscreenStatus from '@/hooks/fullscreen';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import audio from '@/assets/audio/audio.mp3';
import { useAudio } from '@/hooks/useAudio';

interface IProps {
  playGame: boolean;
  endGameEvent: () => void;
}

const Game = ({ playGame = false, endGameEvent }: IProps) => {
  const [playing, toggle] = useAudio(audio, true) as [boolean, () => void];

  const canvasRef = useRef(null);
  // @ts-ignore
  let isFullscreen: boolean, setIsFullscreen;
  try {
    // @ts-ignore
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(canvasRef);
  } catch (e) {
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

  const playMenu = document.getElementById('play-menu');
  const playButton = document.getElementById('play-button');
  const usernameInput = document.getElementById('username-input') as HTMLInputElement;
  useEffect(() => {
    initCanvasElement();
    initLeaderboardElement();

    Promise.all([connect(onGameOver)])
      .then(() => {
        playMenu?.classList.remove('hidden');
        if (!playButton) return;
        handlerFullscreen();
      })
      .catch(console.error);
  }, []);
  function onGameOver() {
    reconnect();
    stopCapturingInput();
    stopRendering();
    playMenu?.classList.remove('hidden');
    setLeaderboardHidden(true);
    endGameEvent();
  }
  const handleClick = () => {
    toggle();

    play(usernameInput.value);
    playMenu?.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
  useEffect(() => {
    handleClick();
  }, [playGame]);

  return (
    <div className="game-mvp relative m-auto w-fit" ref={canvasRef}>
      <canvas id="game-canvas"></canvas>
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
        <AudioPlayer playing={playing} toggle={toggle} />
      </div>
    </div>
  );
};

export default Game;
