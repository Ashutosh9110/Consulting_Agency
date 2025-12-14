import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user, token } = useAuth()
  if (!token || !user) {
    return <Navigate to="/login" />
  }
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />
  }
  return children
}
