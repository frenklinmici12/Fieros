import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        loggedIn: false,
        username: "",
        pfp: ""
    });

    useEffect(() => {
        const url = import.meta.env.VITE_SERVER_URL;

        axios.get(url + "/auth/check", { withCredentials: true })
            .then(res => {
                if (res.data.loggedIn) {
                    setUser({
                        loggedIn: true,
                        username: res.data.username,
                        pfp: ""
                    });
                }
            })
            .catch(() => {});
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
