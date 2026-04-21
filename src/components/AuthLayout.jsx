import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const authStatus = useSelector((state) => state.authReducer.status);

  if (authStatus !== authentication) {
    return <Navigate to={authentication ? "/login" : "/"} replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;
