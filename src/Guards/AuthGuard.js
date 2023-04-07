import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";

// pages
// import Login from "../pages/Authentication/Login";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const loginState = localStorage.getItem("LoginState");
  const isAuthenticated = JSON.parse(loginState);

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
