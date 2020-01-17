import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://5e0352c2a7ad3700141a1bec.mockapi.io/api'
});

export default instance;
