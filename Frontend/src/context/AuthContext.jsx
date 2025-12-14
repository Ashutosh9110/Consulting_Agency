import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const login = ({ accessToken, user }) => {
    localStorage.setItem("accessToken", accessToken)
    setUser(user)
    setIsAuthenticated(true)
  }
  const logout = () => {
    localStorage.removeItem("accessToken")
    setUser(null)
    setIsAuthenticated(false)
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      if (payload.exp * 1000 < Date.now()) {
        logout()
      } else {
        setUser({
          id: payload.id,
          email: payload.email,
          role: payload.role,
        })
        setIsAuthenticated(true)
      }
    } catch (err) {
      logout()
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
