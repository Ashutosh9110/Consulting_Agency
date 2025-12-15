import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function OAuthSuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    if (token) {
      // Store JWT
      localStorage.setItem("token", token)
      console.log("Token in localStorage:", localStorage.getItem("token"));

      navigate("/dashboard") 
    } else {
      navigate("/login")
    }
  }, [navigate])

  return <p>Logging in...</p>
}
