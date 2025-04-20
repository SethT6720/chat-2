
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from './context/UserContext';
import App from './App';
import Landing from './components/Landing';
import Guest from './components/Guest';
import Chat from './components/Chat';
import ChatPage from './components/ChatPage';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/guest' element={<Guest />} />
                    <Route path='/chat' element={<ChatPage />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
)