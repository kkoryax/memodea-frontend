import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")

    const [error, setError] = useState("");

    const handleRegister = async(e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
          }

        try{
            const response = await axios.post(
                "http://localhost:3000/mongo/auth/register",
                {
                  name: name,
                  email: email,
                  password: password
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              setUser(response.user);
              navigate("/");
        } catch (err) {
            console.error(err)
            setError(
                err?.response?.data?.message || "Registration failed, Please try again."
            )
        }
    }

    return (
        <main className="min-h-screen bg-background-a30 flex flex-col">
            <div className="flex min-w-full min-h-screen justify-center items-center">
                <article className="flex flex-col shadow-md bg-background-a10 text-white justify-center px-8 py-12 rounded-2xl max-w-[100%] md:w-[50%]">
                    <img src="/memodea_logo.png" alt="" className="-mt-[25%]"/>
                    <h2 className="text-2xl font-bold text-center mb-[5%]">
                        Welcome to Memodea
                    </h2>
                    <p className="text-sm -mt-[5%] mb-[5%] justify-center flex items-center">
                        Where every thought finds a home.
                        </p>

                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
                                {error}
                            </div>
                        )}

                    <form className="flex flex-col justify-center gap-4" onSubmit={handleRegister}>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold text-gray-400">Name</label>
                            <input type="text" placeholder="Name" className="bg-background-a20 border-1 rounded-lg px-1 py-2" required
                                id="name" value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold text-gray-400">Email</label>
                            <input type="email" placeholder="Email" className="bg-background-a20 border-1 rounded-lg px-1 py-2" required
                                id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-semibold text-gray-400">Password</label>
                            <input type="password" placeholder="Password" className="bg-background-a20 border-1 rounded-lg px-1 py-2" required
                                id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className="font-semibold text-gray-400">Confirm Password</label>
                            <input type="password" placeholder="Password" className="bg-background-a20 border-1 rounded-lg px-1 py-2" required
                                id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-[2%] font-bold bg-button-a20  rounded-lg px-1 py-2 hover:opacity-70 hover:cursor-pointer"
                        >
                            Sign Up
                        </button>

                        <div className="flex flex-row gap-2 justify-center">
                            <Link to="/login" className="font-semibold">
                            Already have an account?
                            </Link>
                        </div>

                        <p className="text-[11px] w-[52ch]">
                            By clicking Sign Up, you agree to our <span className="text-blue-400">Terms,
                            Privacy Policy and Cookies Policy.</span> This helps us ensure a safe
                            and personalized experience for all users.
                        </p>
                    </form>
                </article>
            </div>
        </main>
    )
}