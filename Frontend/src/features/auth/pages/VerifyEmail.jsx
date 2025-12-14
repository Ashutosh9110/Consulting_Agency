import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import api from "../../../lib/axios"

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = params.get("token")
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    const verify = async () => {
      try {
        await api.post("/auth/verify-email", { token })
        setStatus("success")
        setTimeout(() => navigate("/login"), 2000)
      } catch {
        setStatus("error")
      }
    }
    verify()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl text-center max-w-md">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && <p className="text-green-400">Email verified! Redirecting to login...</p>}
        {status === "error" && <p className="text-red-400">Invalid or expired link.</p>}
      </div>
    </div>
  )
}
