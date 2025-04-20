import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <div id="buttons" className="flex flex-col gap-2 items-center justify-center h-screen bg-gray-900 text-white p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Chat</h1>
                <button className="bg-blue-600 w-48 hover:bg-blue-700 text-white px-4 py-2 rounded">Sign In</button>
                <button className="bg-blue-600 w-48 hover:bg-blue-700 text-white px-4 py-2 rounded">Sign Up</button>
                <button className="bg-blue-600 w-48 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={(e) => {
                    e.preventDefault();
                    navigate("/guest");
                }}>Continue as Guest</button>
            </div>
        </>
    )
}

function SignIn() {

}

function SignUp() {

}