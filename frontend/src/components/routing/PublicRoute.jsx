import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function PublicRoute(props) {
  const { authStatus } = props;

  if (authStatus === "undetermined") {
    return null; // TODO possibly add a loading indicator/spinner/sth
  }

  return authStatus === "auth" ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
