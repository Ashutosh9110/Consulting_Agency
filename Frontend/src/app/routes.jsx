import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
/* Auth */
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import VerifyEmail from "../features/auth/pages/VerifyEmail"
import ForgotPassword from "../features/auth/pages/ForgotPassword"
import ResetPassword from "../features/auth/pages/ResetPassword"
import OAuthSuccess from "../features/auth/pages/OAuthSuccess"
/* Home / Public */
import Welcome from "../features/home/pages/Welcome"
import ContactUs from "../features/home/pages/ContactUs"
import ContactSuccess from "../features/home/pages/ContactSuccess"
/* User */
import Home from "../features/home/pages/Home"
import MyProfile from "../features/home/pages/MyProfile"
/* Admin */
import AdminDashboard from "../features/admin/pages/AdminDashboard"
import UsersList from "../features/admin/pages/UsersList"
/* Layout */
import AppLayout from "../layouts/AppLayout"


const Unauthorized = () => (
  <div className="h-screen flex items-center justify-center text-white">
    Unauthorized
  </div>
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<AppLayout />}>

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contact-success" element={<ContactSuccess />} />

        <Route path="/admin" element={ <ProtectedRoute role="admin"> <AdminDashboard /> </ProtectedRoute> } />
          <Route path="/home" element={ <ProtectedRoute role="user"> <Home /> </ProtectedRoute> } />
          <Route path="/admin/users" element={ <ProtectedRoute role="admin"> <UsersList /> </ProtectedRoute>} />
          <Route path="/my-profile" element={ <ProtectedRoute> <MyProfile /> </ProtectedRoute> } />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}