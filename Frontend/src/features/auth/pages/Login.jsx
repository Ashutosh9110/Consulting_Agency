import { useForm } from "react-hook-form"
import api from "../../../lib/axios"
import { useAuth } from "../../../context/AuthContext"
import { Link } from "react-router-dom"

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()

  const onSubmit = async (data) => {
    const res = await api.post("/auth/login", data)
    login(res.data)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/djm65usjg/video/upload/v1765701099/5_cll6kd.mp4"
        type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Login to continue
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white underline cursor-pointer">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
