import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
});

const apiLeaderboard = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers: {
    'Content-type': 'application/json',
    credentials: 'include',
  },
});

export { api, apiLeaderboard };
