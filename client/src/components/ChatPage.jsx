import React, { useState, useEffect } from 'react';
import socket from '../services/socket.js';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => socket.off('chat message');
    }, []);

    const sendMessage = () => {
        socket.emit('chat message', newMessage);
        setNewMessage('');
    }

    return (
        <div className='flex flex-col h-screen bg-gray-900 text-white p-4'>
            <h1 className='text-3x1 font-bold mb-4'>Chat</h1>
            <div className='flex-1 overflow-y-auto bg-gray-800 rounded p-4 mb-4'>
                <ul className='space-y-2'>
                    {messages.map((msg, idx) => (
                        <li key={idx} className='bg-gray-700 p-2 rounded'>{msg}</li>
                    ))}
                </ul>
            </div>
            <div className='flex gap-2'>
                <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                className='flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Type your message...'
                />
                <button onClick={sendMessage} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;