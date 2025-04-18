
import express from 'express';
import http from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your client URL
    methods: ['GET', 'POST']
}))

const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:5173', // Replace with your client URL
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
    res.send('Chat server is running!');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (message) => {
        console.log('Message received:', message);
        io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})