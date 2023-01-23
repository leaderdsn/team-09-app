import { io } from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';
import settings from './settings';
interface IPlayer {
  id: string;
  mass: number;
  name: string;
  radius: number;
  score: number;
}
export let currentPlayer: IPlayer;
const socketProtocol = window.location.protocol.includes('https') ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://localhost:8080`, { reconnection: false });
const connectedPromise = new Promise<void>((resolve) => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = (onGameOver: () => void) =>
  connectedPromise.then(() => {
    socket.on(settings.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(settings.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('update', (message) => {
      const { player, leaderboard } = message;
      const tempDataPlayer = leaderboard.filter(
        (item: { name: any }) => item.name === player['name'],
      );
      currentPlayer = { ...player, score: tempDataPlayer[0]['score'] };
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal')?.classList.remove('hidden');
      const elem = document.getElementById('reconnect-button');
      elem
        ? (elem.onclick = () => {
            window.location.reload();
          })
        : null;
    });
  });

export const play = (username: string) => {
  socket.emit(settings.MSG_TYPES.JOIN_GAME, username);
};

export const updateDirection = throttle(20, (direction: number) => {
  socket.emit(settings.MSG_TYPES.INPUT, direction);
});

export const reconnect = () => {
  socket.disconnect();
  setTimeout(() => {
    socket.connect();
  }, 500);
};
