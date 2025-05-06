import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await axios.get("https://memodea-backend.onrender.commongo/auth/profile");
                setUser(response.data.user);
            } catch (err) {
                console.error("Not authenticated", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        navigate("/");
    };

    const logout = async () => {
        try {
            await axios.post("https://memodea-backend.onrender.com/mongo/auth/logout");
            setUser(null);
            navigate("/login")
        } catch (err) {
            console.error("Logout Failed:", err)
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);