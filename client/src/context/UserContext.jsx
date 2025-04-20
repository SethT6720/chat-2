import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [myNickname, setMyNickname] = useState('Guest');
    const [userList, setUserList] = useState([]);

    return (
        <UserContext.Provider value={{ myNickname, setMyNickname, userList, setUserList }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}