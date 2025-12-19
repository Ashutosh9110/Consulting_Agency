import { BrowserRouter } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AppRoutes from "./routes"

export default function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
