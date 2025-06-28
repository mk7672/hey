import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if you deploy
});

export default api;
