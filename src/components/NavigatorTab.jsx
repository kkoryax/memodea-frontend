import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import { useState } from "react";

export default function NavigatorTab() {
    const  { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    console.log("User object in NavigatorTab:", user);

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            navigate(`/dashboard?search=${trimmedQuery}`);
        } else {
            navigate('/dashboard');
        }
    }

    return(
        <div>
            <nav className="bg-background-a10 text-white p-4 shadow-md">
                <div className="flex flex-row justify-between px-[2%] items-center">
                    <Link to={!user ? "/" : "/dashboard"}>
                        <img src="/memodea_logo.png" alt="" className="w-[120px]"/>
                    </Link>
                    {!user ? "" :
                        <div className="hidden md:flex w-full items-center justify-center">
                            <form  className="flex flex-row gap-4 items-center justify-center w-full px-[15%]" onSubmit={handleSearch}>
                                <input type="text" placeholder="Search notes by title, content, or tags" className="w-[100%] border px-3 py-2 rounded-md"
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                type="submit"
                                className=" bg-button-a20 text-white px-4 py-2 rounded-md hover:opacity-70 hover:cursor-pointer"
                                >
                                Search
                                </button>
                            </form>
                        </div>
                    }
                    <ul className="flex gap-4 items-center">
                        {!user ? (
                        <>
                            <li>
                                <Link to="/login" className="font-semibold bg-button-a10 px-4 py-2 rounded-lg hover:opacity-70">
                                Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="font-semibold bg-button-a20 px-4 py-2 rounded-lg hover:opacity-70">
                                Register
                                </Link>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <h2 className="text-white pr-4">{user.user.name}</h2>
                            </li>
                            <li>
                                <button onClick={logout} className="font-semibold bg-button-a10 px-4 py-2 rounded-lg hover:opacity-70 hover:cursor-pointer">
                                Logout
                                </button>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            </nav>
        <div className="max-w-4xl mx-auto w-full">
            <Outlet />
        </div>
        </div>
    )
}