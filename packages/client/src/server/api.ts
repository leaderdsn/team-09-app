import axios from 'axios';

 const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json',
  },
});



const apiLeaderboard = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers: {
    'Content-type': 'application/json',
  },
});

export {api, apiLeaderboard};
