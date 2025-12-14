import { useEffect, useState } from "react"
import api from "../../../lib/axios"

export default function UsersList() {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-4 border rounded">
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-600">{u.email}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
