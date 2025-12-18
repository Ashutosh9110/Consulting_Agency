import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user, token, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }
  if (!token || !user) {
    return <Navigate to="/login" replace />
  }
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />
  }
  return children
}
