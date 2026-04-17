import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.authReducer.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-purple-900 via-purple-800 to-violet-900 shadow-2xl shadow-purple-900/50 backdrop-blur-sm">
      <Container>
        <nav className="flex items-center justify-between py-3 md:py-4">
          <div className="shrink-0">
            <Link
              to={"/"}
              className="inline-block hover:scale-110 transition-transform duration-300"
            >
              <Logo width="60px" className="md:w-20" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      ` ${isActive ? "bg-purple-700 shadow-lg" : "hover:bg-purple-700 hover:shadow-lg"}  px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white rounded-lg transition-all duration-300  active:scale-95`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-purple-900 border-t border-purple-700 md:hidden">
              <ul className="flex flex-col p-4 space-y-2">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          ` block ${
                            isActive
                              ? "bg-purple-700 shadow-lg"
                              : "hover:bg-purple-700 hover:shadow-lg"
                          }  px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : null,
                )}
                {authStatus && (
                  <li>
                    <div onClick={() => setMobileMenuOpen(false)}>
                      <LogoutBtn />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
