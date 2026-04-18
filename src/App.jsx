import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwriteServices/auth-service";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastProvider } from "./context/ToastContext";
import { ToastContainer } from "./components/Toast/ToastContainer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          const { $id, name, email } = user;
          dispatch(login({ userData: { $id, name, email } }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <ToastProvider>
      <div className="min-h-dvh gradient-bg text-white flex flex-col">
        {!loading ? (
          <>
            <Header />
            <main className="flex flex-col min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)]">
              <Outlet />
            </main>
            <Footer />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="w-12 h-12 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Loading...
              </h1>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
