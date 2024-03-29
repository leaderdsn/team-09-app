import React from 'react'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import Profile from '@/pages/Profile'
import { Forum } from '@/pages/Forum'
import OAuth from '@/pages/OAuth'
import Leaderboard from '@/pages/Leaderboard';
import ForTesting from "@/pages/ForTesting";
import { GameScreen } from "@/pages/GameScreen";

export interface RoutesList {
  path: string,
  name: string,
  Component: React.FC
}

export const routes: RoutesList[] = [
  {
    path: '/',
    name: 'Главная',
    Component: Home
  },
  {
    path: "/game",
    name: "Играть",
    Component: GameScreen
  },
  {
    path: '/forum',
    name: 'Форум',
    Component: Forum
  },
  {
    path: '/profile',
    name: 'Профиль',
    Component: Profile
  },
  {
    path: "/leaderboard",
    name: "Турнирная таблица",
    Component: Leaderboard
  },
  {
    path: '/oauth',
    name: 'OAuth',
    Component: OAuth
  },
];
