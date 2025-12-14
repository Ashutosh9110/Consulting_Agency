import { useForm } from "react-hook-form"
import api from "../../../lib/axios"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function ResetPassword() {
  const { register, handleSubmit } = useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get("token")

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/reset-password", { ...data, token })
      if (data.password !== data.confirmPassword) {
        return alert("Passwords do not match");
      }      
      alert("Password reset successfully")
      navigate("/login")
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
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <input
          {...register("password")}
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm New Password"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}
