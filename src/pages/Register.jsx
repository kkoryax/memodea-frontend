import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                " ",
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
              console.log(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex min-w-full min-h-screen justify-center items-center">
            <article className="flex flex-col bg-[#18191b] text-white justify-center px-8 py-12 rounded-2xl max-w-[100%] md:w-[50%]">
                <h2 className="text-2xl font-bold text-center mb-[5%]">
                    Register
                </h2>
                <form className="flex flex-col justify-center gap-4" onSubmit={handleRegister}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold text-gray-400">Name</label>
                        <input type="text" placeholder="Name" className="bg-[#212226] border-1 rounded-lg px-1 py-2"
                            id="name" value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-gray-400">Email</label>
                        <input type="email" placeholder="Email" className="bg-[#212226] border-1 rounded-lg px-1 py-2"
                            id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-gray-400">Password</label>
                        <input type="password" placeholder="Password" className="bg-[#212226] border-1 rounded-lg px-1 py-2"
                            id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-[2%] font-bold bg-[#5ae30bc0]  rounded-lg px-1 py-2 hover:opacity-70 hover:cursor-pointer"
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
    )
}