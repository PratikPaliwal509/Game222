// src/socket.js
import { io } from 'socket.io-client';

const socket = io('https://game222.vercel.app'); // Make sure this matches your backend port
export default socket;
