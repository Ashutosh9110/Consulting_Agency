import { useForm } from "react-hook-form"
import api from "../../../lib/axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

export default function ResetPassword() {
  const { register, handleSubmit } = useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match")
    }
    try {
      await api.post("/auth/reset-password", { ...data, token })
      alert("Password reset successfully")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong")
    }
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
        <source 
          src="https://res.cloudinary.com/djm65usjg/video/upload/v1763281058/signup2_eaho2j.mp4" 
          type="video/mp4" 
        />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xs rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-300">
          <Link to="/login" className="text-white underline cursor-pointer">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
