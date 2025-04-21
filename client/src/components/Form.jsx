import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import socket from "../services/socket.js";

export default function Form() {
    const { myNickname } = useUser();
    const [ message, setMessage ] = useState('');
    const inputRef = useRef(null);

    const sendMessage = () => {
        socket.emit('chat message', message, myNickname);
        setMessage('');
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <form className="flex gap-2 w-full" onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
        }}>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                autoComplete="off"
                placeholder="Type your message..." 
                className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            >
                Send
            </button>
        </form>
    )
}