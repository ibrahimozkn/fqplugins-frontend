import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
