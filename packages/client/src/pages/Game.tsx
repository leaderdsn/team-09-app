import React, { Component } from 'react'
import io from 'socket.io-client';

class Game extends Component<any, any> {
  componentDidMount() {
    const fetchServerData = async () => {
      const socket = io('ws://127.0.0.1:3002', { reconnection: false });
      const connectedPromise = new Promise<void>(resolve => {
        socket.on('connect', () => {
          console.log('Connected to server!');
          resolve();
        });
      });
    }

    fetchServerData();
  }

  render() {
    return (<></>)
  }
}

export default Game