declare const __SERVER_PORT__: number;
declare module 'react-daisyui';
declare global {
  interface Window {
    __REDUX_STATE__?: object;
  }
}
