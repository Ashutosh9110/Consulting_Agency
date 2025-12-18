import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../../lib/axios"
import { useNavigate } from "react-router-dom"

export default function MyProfile() {
  const { register, handleSubmit, setValue } = useForm()
  const [userImage, setUserImage] = useState(null)
  const [editing, setEditing] = useState(false)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me")
      setValue("name", res.data.name)
      setValue("email", res.data.email)

      setUserImage(
        res.data.profileImage
          ? `${import.meta.env.VITE_BACKEND_URL.replace("/api", "")}${res.data.profileImage}`
          : "/avatar.png"
      )
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])
  

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      if (data.password) formData.append("password", data.password)
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0])
      }

      await api.put("/users/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert("Profile updated successfully")
      setEditing(false)
      if (data.profileImage && data.profileImage[0]) {
        await fetchProfile();
      }
    } catch (err) {
      console.error(err)
      alert("Failed to update profile")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-8 py-12 sm:py-16">
      <button
        onClick={() => navigate("/home")}
        className="mb-6 inline-flex items-center gap-2 text-white border border-white/60 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
      >
        ← Back to Home
      </button>

      <section className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <label className={editing ? "cursor-pointer" : ""}>
            {editing && (
              <input
                type="file"
                accept="image/*"
                {...register("profileImage")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
            )}

            <img
              src={preview || userImage || "/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          </label>
        </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{editing ? "Edit Profile" : "My Profile"}</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="mt-2 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              {...register("name")}
              disabled={!editing}
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none ${
                editing ? "focus:ring-2 focus:ring-white" : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              {...register("email")}
              disabled={!editing}
              className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none ${
                editing ? "focus:ring-2 focus:ring-white" : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>

          {editing && (
            <>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
              >
                Save Changes
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  )
}
