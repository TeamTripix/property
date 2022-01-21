import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ Component }) {
  return localStorage.getItem("token") ? <Component /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
