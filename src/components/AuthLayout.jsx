import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.authReducer.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block mb-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
        </div>
        <h1 className="text-xl font-semibold text-white">Loading...</h1>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default AuthLayout;
