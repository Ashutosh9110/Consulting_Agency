import Navbar from "../../../components/layout/Navbar"
import Sidebar from "../../../components/layout/Sidebar"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
              <h3 className="text-sm text-gray-300">Total Users</h3>
              <p className="text-3xl font-bold mt-2">1,248</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
              <h3 className="text-sm text-gray-300">Active Users</h3>
              <p className="text-3xl font-bold mt-2">980</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
              <h3 className="text-sm text-gray-300">Admins</h3>
              <p className="text-3xl font-bold mt-2">4</p>
            </div>

          </div>
          <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
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
