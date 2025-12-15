import { createContext, useContext, useEffect, useState } from "react"
import api from "../lib/axios"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken)
    setToken(data.accessToken)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setUser(null)
    setToken(null)
  }


  useEffect(() => {
    let mounted = true
    const initAuth = async () => {
      const storedToken = localStorage.getItem("accessToken")
      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        setToken(storedToken)
        const res = await api.get("/users/me")
        if (mounted) setUser(res.data)
      } catch (err) {
        logout()
      } finally {
        if (mounted) setLoading(false)
      }
    }
    initAuth()
    return () => {
      mounted = false
    }
  }, [])


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
