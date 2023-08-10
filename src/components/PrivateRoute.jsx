import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

  return (
      isAuthenticated ? <Outlet /> : <Navigate to='/' />
  );
};

export default PrivateRoute;