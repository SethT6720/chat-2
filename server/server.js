
import express from 'express';
import http from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

console.log('Client URL:', process.env.CLIENT_URL);

const allowedOrigins = [process.env.CLIENT_URL,
    /\.vercel\.app$/,
]; // Replace with your client URL

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST']
}))

const io = new SocketIOServer(server, {
    connectionStateRecovery: {},
    cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
    res.send('Chat server is running!');
});

const users = new Map();
const messages = [];
const MAX_MESSAGES = 50;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.emit('message history', messages); // Send message history to the newly connected user

    socket.on('request messages', () => {
        console.log('Message history requested');
        socket.emit('message history', messages); // Send message history to the requesting user
    });

    socket.on('login', (nickname) => {
        console.log('User logged in with nickname:', nickname);
        io.emit('join leave message', `${nickname} has joined the chat`);
    });

    socket.on('check nickname', (nickname, callback) => {
        console.log('Checking nickname:', nickname);
        let isAvailable = !Array.from(users.values()).includes(nickname);
        if (users.get(socket.id) === nickname) {
            isAvailable = true;
        }
        callback(isAvailable);
    });

    socket.on('set nickname', (nickname) => {
        console.log('Setting nickname:', nickname);
        users.set(socket.id, nickname);
        io.emit('user list', Array.from(users.values())); // Broadcast the updated user list
        console.log('Connected users:', Array.from(users.values()));
    });

    socket.on('chat message', (message, nickname) => {
        const msgData = {
            content: message,
            sender: nickname,
            timestamp: Date.now()
        }

        messages.push(msgData);
        if (messages.length > MAX_MESSAGES) {
            messages.shift(); // Remove the oldest message if we exceed the limit
        }

        io.emit('chat message', message, nickname); // Broadcast the message to all connected clients
    });

    socket.on('request user list', () => {
        console.log('User list requested');
        io.emit('user list', Array.from(users.values())); // Broadcast the user list to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        io.emit('join leave message', `${users.get(socket.id)} has left the chat`);
        users.delete(socket.id);
        io.emit('user list', Array.from(users.values())); // Broadcast the updated user list
    });

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})