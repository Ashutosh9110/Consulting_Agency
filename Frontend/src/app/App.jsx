import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "@/app/ProtectedRoute"

import Login from "@/features/auth/pages/Login"
import Register from "@/features/auth/pages/Register"
import VerifyEmail from "@/features/auth/pages/VerifyEmail"

import AdminDashboard from "@/features/admin/pages/AdminDashboard"
import UsersList from "@/features/admin/pages/UsersList"

// Placeholder pages
const ForgotPassword = () => <div>Forgot Password</div>
const Unauthorized = () => <div>Unauthorized</div>
const Home = () => <div>Home</div>

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users" element={ <ProtectedRoute role="admin"> <UsersList /> </ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
