import { useForm } from "react-hook-form"
import api from "../../../lib/axios";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()

  const onSubmit = async (data) => {
    const res = await api.post("/auth/login", data)
    login(res.data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("password")} type="password" />
      <button>Login</button>
    </form>
  )
}
