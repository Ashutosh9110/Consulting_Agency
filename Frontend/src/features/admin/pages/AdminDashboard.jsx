import { useState } from "react"
import Navbar from "../../../components/layout/Navbar"
import Sidebar from "../../../components/layout/Sidebar"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar />

      <div className="flex pt-16 md:pt-20">

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-black transform transition-transform
          md:relative md:translate-x-0 md:block
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 px-4 py-2 border border-white/40 rounded-lg hover:bg-white hover:text-black transition"
          >
            ☰ Menu
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <StatCard title="Total Users" value="1,248" />
            <StatCard title="Active Users" value="980" />
            <StatCard title="Admins" value="4" />
          </div>
          <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-xl p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recent Activity
            </h2>
            <p className="text-gray-300 text-sm">
              User activity logs will appear here.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
      <h3 className="text-sm text-gray-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}
