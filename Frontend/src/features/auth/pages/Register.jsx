import { useForm } from "react-hook-form"
import api from "../../../lib/axios"

export default function Register() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    await api.post("/auth/signup", data)
    alert("Check your email to verify your account")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Name" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("password")} type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  )
}
