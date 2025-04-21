import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";
import { useUser } from "../context/UserContext";

export default function Guest() {
    const navigate = useNavigate();
    const { setMyNickname } = useUser();
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nickname.trim()) {
            console.log("Nickname is required");
            setError("Nickname is required");
            return;
        }

        socket.emit("check nickname", nickname, (isAvailable) => {
            if (isAvailable) {
                socket.emit('set nickname', nickname);
                setMyNickname(nickname);
                console.log("Nickname set successfully");
                navigate("/chat");
            } else {
                setError("Nickname is already taken");
            }
        })
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-4">Continue as Guest</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

                <input 
                    className="p-2 bg-gray-700 border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    type="text" 
                    placeholder="Enter Nickname..." 
                    value={nickname} onChange={(e) => {
                        setNickname(e.target.value);
                        setError(null);
                    }} 
                />

                {error && <p className="text-red-500">{error}</p>}

                <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >Continue as Guest</button>
            </form>
        </div>
    )
}