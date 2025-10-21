import { useState, useEffect } from "react";
import { Search, Menu, X, User, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { label: "My Blogs", path: "/my-blogs" },
    { label: "Community", path: "/community" },
    {
      label: "Be a writer",
      path: "/create",
      onClick: () => {
        const id = uuidv4();
        navigate(`/create/${id}`);
      },
    },
  ];

  const isActive = (path) => {
    if (path.startsWith("/create")) return location.pathname.startsWith("/create");
    return location.pathname === path;
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-black text-white p-2 rounded-xl shadow-md transition-colors duration-200">
              <PenTool className="h-6 w-6" />
            </div>
            <h1 className="text-[26px] font-extrabold tracking-tight bg-gradient-to-r from-gray-500 via-gray-600 to-gray-900 bg-clip-text text-transparent group-hover:from-gray-400 group-hover:via-gray-300 group-hover:to-black transition-all duration-300">
              MindCast
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick ? item.onClick() : navigate(item.path);
                  }}
                  className={`relative text-[15px] font-medium transition-colors ${
                    active
                      ? "text-cyan-900"
                      : "text-foreground hover:text-muted-foreground"
                  }`}
                  disabled={active}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-[4px] left-0 w-full h-[2px] bg-cyan-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <div
  onClick={(e) => {
    e.stopPropagation();
    setMobileOpen((prev) => !prev);
  }}
  className="cursor-pointer lg:hidden p-2 transition-transform duration-300 hover:scale-110"
>
  {mobileOpen ? (
    <X className="h-6 w-6 text-foreground transition-transform duration-300 rotate-90" />
  ) : (
    <Menu className="h-6 w-6 text-foreground transition-transform duration-300" />
  )}
</div>


            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-muted-foreground/20 transition-colors"
              >
                <User className="h-6 w-6 text-black" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background  rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-[15px] text-foreground hover:bg-muted-foreground/10 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 flex flex-col gap-2 bg-background border border-border rounded-xl shadow-md p-4 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                    item.onClick ? item.onClick() : navigate(item.path);
                  }}
                  className={`w-full text-left px-3 py-3 text-[16px] font-medium rounded-lg transition-colors ${
                    active
                      ? "text-cyan-800 bg-cyan-50"
                      : "text-foreground hover:bg-muted-foreground/10"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
