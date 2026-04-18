import { useDispatch } from "react-redux";
import authService from "../../appwriteServices/auth-service";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <button
      className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-95"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
