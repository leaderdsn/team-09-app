import React from 'react';
import Home from '../pages/Home'
import Game from '../pages/Game'

export interface RoutesList {
  path: string,
  name: string,
  Component: React.FC
}

export const routes: RoutesList[] = [
  {
    path: "/",
    name: "Главная",
    Component: Home
  },
  {
    path: "/game",
    name: "Начать игру",
    Component: Game
  }
];