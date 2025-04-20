import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL, {
    autoConnect: true,
    withCredentials: true,
    nickname: 'Guest'
}); // Replace with your server URL

export default socket;