import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthProvider";

import React from "react";

function ProtectedRoute() {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return "Loading";
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
