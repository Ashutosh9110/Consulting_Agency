import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"

export default function OAuthSuccess() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) {
      login({ token, user: null }) 
      navigate("/home") 
    } else {
      navigate("/login")
    }
  }, [])

  return <p>Logging in...</p>
}
