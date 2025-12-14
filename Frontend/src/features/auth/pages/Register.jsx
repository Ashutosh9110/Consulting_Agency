import { useForm } from "react-hook-form";
import api from "../../../lib/axios";
import { Link } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await api.post("/auth/signup", data);
    alert("Check your email to verify your account");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/djm65usjg/video/upload/v1765701095/4_q0hdn3.mp4" 
        type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Get started with Maxlence
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
          />
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
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
