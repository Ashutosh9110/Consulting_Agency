import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Navbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        <Link to="/" className="text-xl font-bold tracking-wide">
          Maxlence
        </Link>
        <div className="flex items-center gap-6">
          {user && (
            <span className="text-sm text-gray-200">
              {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
