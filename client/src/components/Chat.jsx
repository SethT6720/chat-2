import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import socket from "../services/socket.js";
import Form from "./Form.jsx";

export default function Chat() {
    const { myNickname, userList, setUserList } = useUser();
    const [ messages, setMessages ] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        socket.emit('request user list');
        socket.emit('request messages');
        socket.emit('login', myNickname);
        
        socket.on("chat message", (msg, nickname) => {
            msg = nickname + ": " + msg;
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on("join leave message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on("user list", (users) => {
            console.log("User list received:", users);
            setUserList([...users]);
        });

        socket.on("message history", (history) => {
            const formatted = history.map((msgData) => {
                return `${msgData.sender}: ${msgData.content}`;
            });

            setMessages(formatted);
        });

        return () => {
            socket.off("user list");
            socket.off("chat message");
            socket.off("message history");
        }
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="inline-flex flex-col overflow-y-auto scrollbar-custom h-screen w-screen bg-gray-900 text-white p-4">
            <div className="bg-gray-800 rounded p-4 mb-4">
                <h1 className="text-2xl font-bold">Hello, {myNickname}</h1>
            </div>
            
            <div className="flex overflow-y-auto flex-1 gap-4">
                <div className="flex-1 overflow-y-auto bg-gray-800 rounded p-4 mb-4 scrollbar scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <ul className="space-y-2">
                        {messages.map((msg, i) => (
                            <li key={i} className="bg-gray-700 p-2 rounded break-words">{msg}</li>
                        ))}
                        <div ref={bottomRef} />
                    </ul>
                </div>

                <div className="w-64 overflow-y-auto bg-gray-800 rounded p-4 mb-4">
                    <h2 className="text-xl mb-2">Online Users:</h2>
                    <ul className="list-disc pl-6">
                        {userList.map((user, i) => (
                            <li key={i}>{user}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <Form />
        </div>
    )
}