// frontend/src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { token } = useAuth();

  // If there's a token, render the child components (e.g., Dashboard).
  // Otherwise, redirect the user to the /login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
}