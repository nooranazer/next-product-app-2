import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com/products',
     headers: {
    'Content-Type': 'application/json',
  },
});

export default api;