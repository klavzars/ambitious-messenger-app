import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute(props) {
  const { authStatus } = props;

  if (authStatus === "undetermined") {
    return null; // TODO possibly add a loading indicator/spinner/sth ??
  }

  return authStatus === "unauth" ? <Navigate to="/login" /> : <Outlet />;
}

export default ProtectedRoute;
