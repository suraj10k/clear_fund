import { createContext, useCallback, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider(props) {
    const [user, setUser] = useState(null);

    const logout = useCallback(() => {
        setUser(null);
    }, [])

    const login = useCallback((id) => {
        console.log("logging in...");
        setUser({ id });
    }, [])

    return <authContext.Provider value={{ user, login, logout }}>
        {props.children}
    </authContext.Provider>
}