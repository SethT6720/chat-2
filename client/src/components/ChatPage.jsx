import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import socket from '../services/socket.js';

function ChatPage() {
    const { myNickname, userList, setUserList } = useUser();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('chat message', (msg, nickname) => {
            msg = nickname + ': ' + msg;
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('user list', (users) => {
            setUserList(users);
        });

        return () => {
            socket.off('chat message');
            socket.off('user list');
        }
    }, []);

    const sendMessage = () => {
        socket.emit('chat message', newMessage, myNickname);
        setNewMessage('');
    }

    return (
        <div className='flex flex-col h-screen bg-gray-900 text-white p-4'>
            <h1 className='text-3xl font-bold mb-4'>Chat</h1>
            <div className='flex-1 overflow-y-auto bg-gray-800 rounded p-4 mb-4'>
                <ul className='space-y-2'>
                    {messages.map((msg, idx) => (
                        <li key={idx} className='bg-gray-700 p-2 rounded'>{msg}</li>
                    ))}
                </ul>
            </div>
            <form className='flex gap-2 w-full' onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
            }}>
                <input type='text' autoComplete='off' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                className='flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Type your message...'
                />
                <button type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'>Send
                </button>
            </form>
        </div>
    )
}

export default ChatPage;