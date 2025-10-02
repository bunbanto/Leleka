import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ORIGIN,
  withCredentials: true,
});

// baseURL: 'http://localhost:4000',
