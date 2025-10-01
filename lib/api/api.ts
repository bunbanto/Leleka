import axios from 'axios';

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_ORIGIN + '/api',
  withCredentials: true,
});
