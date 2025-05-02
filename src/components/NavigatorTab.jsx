import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function NavigatorTab() {
    return(
        <div className="min-h-screen bg-gray-600 flex flex-col">
            <nav className="bg-black text-white p-4 shadow-md">
                <ul className="flex gap-4 justify-center">
                    <li>
                        <Link to="/" className="hover:text-yellow-400">
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-yellow-400 bg-gray-600 px-1 py-2 rounded-lg">
                        Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="hover:text-yellow-400">
                        Register
                        </Link>
                    </li>
                </ul>
            </nav>
        <div className="p-6 max-w-4xl mx-auto w-full">
            <Outlet />
        </div>
        </div>
    )
}