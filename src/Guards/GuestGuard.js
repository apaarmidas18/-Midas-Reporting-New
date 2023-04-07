import React from "react";
import { Navigate } from "react-router-dom";

// ----------------------------------------------------------------------
export default function GuestGuard({ children }) {
  const loginState = localStorage.getItem("LoginState");
  const isAuthenticated = loginState;

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return <>{children}</>;
}
