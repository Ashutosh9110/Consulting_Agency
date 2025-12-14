import Navbar from "../../../components/layout/Navbar"
import Sidebar from "../../../components/layout/Sidebar"

export default function UsersList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Users</h1>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-4">John Doe</td>
                  <td className="p-4">john@example.com</td>
                  <td className="p-4">User</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
