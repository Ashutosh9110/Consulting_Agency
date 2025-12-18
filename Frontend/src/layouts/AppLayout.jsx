import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const HIDDEN_ROUTES = ["/", "/login", "/register"]

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const hideLogout = HIDDEN_ROUTES.includes(location.pathname)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="relative min-h-screen">
      {!hideLogout && (
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-white border border-white/60 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}

      <Outlet />
    </div>
  )
}
