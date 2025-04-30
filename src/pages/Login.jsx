export default function Login() {
    return (
    <div className="flex min-w-full min-h-screen justify-center items-center">
        <article className="flex flex-col bg-white justify-center px-8 py-12 rounded-2xl w-[50%]">
            <h2 className="text-2xl font-bold text-center mb-[5%]">
                Login
            </h2>
            <form className="flex flex-col justify-center gap-4">
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                    <input type="email" placeholder="email" className="bg-white border-1 rounded-lg px-1 py-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold text-gray-700">Password</label>
                    <input type="password" placeholder="password" className="bg-white border-1 rounded-lg px-1 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-[2%] bg-white border-1 rounded-lg px-1 py-2"
                >
                    Sign Up
                </button>
            </form>
        </article>
    </div>
    )
}