import React from 'react';
import Home from '../pages/Home'

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
  }
];