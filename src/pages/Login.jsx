import { Link } from "react-router-dom";
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ error, setError ] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("https://memodea-backend.onrender.com/mongo/auth/login",
                {
                  email: email,
                  password: password
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  }
                });
            setUser(response.data);
            navigate("/dashboard")
        } catch(err) {
            console.error(err);
            setError(
                err?.response?.data?.message || "Login failed. Please try again."
            )
        }
    }

    return (
        <main className="min-h-screen bg-background-a30 flex flex-col">
            <div className="flex min-w-full min-h-screen justify-center items-center">
                <article className="flex flex-col shadow-md bg-background-a10 text-white justify-center px-8 py-12 rounded-2xl max-w-[100%] md:max-w-[50%] lg:max-w-[50%]">
                    <img src="/memodea_logo.png" alt="" className="-mt-[25%]"/>
                    <h2 className="text-2xl font-bold text-center mb-[5%]">
                        Account Login
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col justify-center gap-4" onSubmit={handleLogin}>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold text-gray-400">Email</label>
                            <input type="email" placeholder="Email" className="bg-background-a20 border-1 rounded-lg px-1 py-2"
                            id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-semibold text-gray-400">Password</label>
                            <input type="password" placeholder="Password" className="bg-background-a20 border-1 rounded-lg px-1 py-2"
                            id="password" value={password} onChange={(e) => setPassword(e.target.value)}
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
        </main>
    )
}