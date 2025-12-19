import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../lib/axios"

export default function UsersList() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const fetchUsers = async () => {
    const res = await api.get("/users/admin-getUsers", {
      params: { page, limit: 5, search },
    })
    setUsers(res.data.data)
    setTotalPages(res.data.pagination.totalPages)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-8 py-12 sm:py-16">

      <button
        onClick={() => navigate("/admin")}
        className="mb-8 inline-flex items-center gap-2 border border-white/60 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
      >
        ← Back to Dashboard
      </button>
      <section className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Users
        </h1>
        <p className="text-gray-300 mb-8">
          Manage registered users and search by name or email.
        </p>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-full sm:max-w-md mb-6 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
        />
        <div className="space-y-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between
                 p-4 rounded-xl bg-white/10 border border-white/10">
              <div>
                <p className="font-semibold text-lg">{u.name}</p>
                <p className="text-sm text-gray-300">{u.email}</p>
              </div>

              <span className="mt-2 sm:mt-0 text-xs uppercase tracking-wide text-gray-400">
                {u.role}
              </span>
            </div>
          ))}
          {users.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No users found.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-6 py-2 border border-white/60 rounded-lg disabled:opacity-40 hover:bg-white hover:text-black transition cursor-pointer"
          >
            Prev
          </button>

          <span className="text-gray-300">
            Page <span className="font-semibold text-white">{page}</span> of{" "}
            <span className="font-semibold text-white">{totalPages}</span>
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 border border-white/60 rounded-lg disabled:opacity-40 hover:bg-white hover:text-black transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
