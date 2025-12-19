import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"

export default function Navbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-white">
        <p className="text-lg sm:text-xl font-bold tracking-wide">
          ABC Consultancy
        </p>
        <div className="hidden md:flex items-center gap-6">
          {user && <span className="text-sm text-gray-200">{user.name}</span>}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          >
            Logout
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
        >
          ☰
        </button>
      </div>


      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-4">
          {user && (
            <p className="text-sm text-gray-300">
              Signed in as <span className="font-semibold">{user.name}</span>
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
