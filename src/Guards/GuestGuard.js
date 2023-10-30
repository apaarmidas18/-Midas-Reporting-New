// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getState } from "../service/storage";

// // ----------------------------------------------------------------------
// export default function GuestGuard({ children }) {
//   const loginState = getState("authtoken");
//   const isAuthenticated = loginState;
//   console.log(isAuthenticated, "gest");

//   if (isAuthenticated) {
//     return <Navigate to={"/dashboard"} />;
//   }

//   return <>{children}</>;
// }

import React from "react";
import { Navigate } from "react-router-dom";

// ----------------------------------------------------------------------
export default function GuestGuard({ children }) {
  const loginState = localStorage.getItem("LoginState");
  const isAuthenticated = JSON.parse(loginState);

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return <>{children}</>;
}
