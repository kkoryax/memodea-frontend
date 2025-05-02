import { Link } from "react-router-dom";

export default function Login() {

    return (
        <div className="flex min-w-full min-h-screen justify-center items-center">
        <article className="flex flex-col shadow-md bg-background-a10 text-white justify-center px-8 py-12 rounded-2xl max-w-[100%] md:w-[50%]">
            <img src="/public/memodea_logo.png" alt="" className="-mt-[25%]"/>
            <h2 className="text-2xl font-bold text-center mb-[5%]">
                Account Login
            </h2>
            <form className="flex flex-col justify-center gap-4">
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold text-gray-400">Email</label>
                    <input type="email" placeholder="Email" className="bg-background-a20 border-1 rounded-lg px-1 py-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold text-gray-400">Password</label>
                    <input type="password" placeholder="Password" className="bg-background-a20 border-1 rounded-lg px-1 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-[2%] font-bold bg-button-a10  rounded-lg px-1 py-2 hover:opacity-70 hover:cursor-pointer"
                >
                    Log In
                </button>

                <div className="flex flex-row gap-2 justify-center">
                    <h2 className="font-semibold">Forgotten password?</h2>

                </div>
                    <p className="text-[11px] flex justify-center">
                        OR
                    </p>
                <Link
                    to="/register"
                    className="flex justify-center mt-[2%] font-bold bg-button-a20  rounded-lg px-1 py-2 hover:opacity-70 hover:cursor-pointer"
                >
                    Create New Account
                </Link>
            </form>
        </article>
    </div>
    )
}