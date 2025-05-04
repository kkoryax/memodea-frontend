import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function NavigatorTab() {
    return(
        <div>
            <nav className="bg-background-a10 text-white p-4 shadow-md">
                <div className="flex flex-row justify-between px-[2%] items-center">
                    <Link to="/">
                        <img src="/memodea_logo.png" alt="" className="w-[120px]"/>
                    </Link>
                    <ul className="flex gap-4">
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
                    </ul>
                </div>
            </nav>
        <div className="max-w-4xl mx-auto w-full">
            <Outlet />
        </div>
        </div>
    )
}