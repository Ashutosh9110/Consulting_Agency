import { useForm } from "react-hook-form"
import { useState } from "react"
import api from "../../../lib/axios"
import { Link } from "react-router-dom"

export default function Register() {
  const { register, handleSubmit } = useForm()
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("role", data.role)
      formData.append("image", data.image[0])

      await api.post("/auth/signup", data)
      alert("Check your email to verify your account")
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
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
        <source src="https://res.cloudinary.com/djm65usjg/video/upload/v1765701095/4_q0hdn3.mp4" 
        type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <div className="flex justify-center mb-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              hidden
              onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
            />
            <img
              src={preview || "https://via.placeholder.com/100"}
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          </label>
        </div>

        <p className="text-center text-gray-300 mb-6">
          Get started with Maxlence
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true, minLength: 2 })}            
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
          />
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
          />

          <select {...register("role")} className="input bg-black/30">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button 
            disabled={loading} 
            className="w-full py-3 bg-white text-black rounded-lg font-semibold cursor-pointer">
            {loading ? "Creating..." : "Register"}
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
