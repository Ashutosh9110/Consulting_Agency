import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const base =
    "block px-4 py-3 rounded-lg transition text-sm font-medium"

  return (
    <aside className="w-64 bg-white/10 backdrop-blur-xl text-white p-6">
      <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
          }
        >
          Users
        </NavLink>
      </nav>
    </aside>
  )
}
