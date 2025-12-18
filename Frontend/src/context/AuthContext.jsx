import { createContext, useContext, useEffect, useState } from "react"
import api from "../lib/axios"
import * as jwtDecode from "jwt-decode"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = (data) => {
    const token = data.accessToken || data.token
    localStorage.setItem("token", token)
    setToken(token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    setToken(null)
    setUser(null)
  }


  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      const storedToken = localStorage.getItem("token")
      if (!storedToken) {
        if (mounted) setLoading(false)
        return
      }

      try {
        setToken(storedToken)
        const decoded = jwtDecode(storedToken)
        setUser({ id: decoded.id, role: decoded.role, email: decoded.email })
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        if (mounted) setUser(res.data)
      } catch (err) {
        console.error("Auth initialization error:", err)
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
