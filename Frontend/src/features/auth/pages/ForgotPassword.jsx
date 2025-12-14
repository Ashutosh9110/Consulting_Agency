import { useForm } from "react-hook-form"
import api from "../../../lib/axios"

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", data)
      alert("Reset link sent to your email")
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-4">
          Enter your email to receive a password reset link.
        </p>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  )
}
