import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData } from "@/context/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar1 from "../assets/avatar1.jpg";
import {
  BookOpen,
  LogOut,
  User,
  Home,
  Info,
  Menu,
  X,
  LayoutDashboard,
  BookCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const Sidebar = () => {
  const { user, setUser } = getData();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /* ================= LOGOUT ================= */
  const logoutHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (res.data.success) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        toast.success(res.data.message || "Logged out successfully");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed due to server error");
    }
  };

  /* ================= ESC CLOSE ================= */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ================= ROLE MENU ================= */
  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "student":
        return [
          {
            to: "/courses",
            label: "Courses",
            icon: <BookCheck className="h-5 w-5" />,
          },
        ];

      case "teacher":
        return [
          {
            to: "/teacherdashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
          },
          {
            to: "/course",
            label: "Courses",
            icon: <BookOpen className="h-5 w-5" />,
          },
        ];

      default:
        return [];
    }
  };

  /* ================= NAV STYLE ================= */
  const navLinkStyle = (path) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
        : "text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10"
    }`;

  return (
    <>
      {/* ================= Mobile Toggle ================= */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* ================= Sidebar ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-64
        bg-white/60 dark:bg-gray-900/60
        backdrop-blur-xl
        border-r border-white/20 dark:border-white/10
        shadow-xl
        flex flex-col justify-between
        transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        {/* ================= Logo ================= */}
        <div className="flex flex-col flex-1">
          <div className="px-6 py-6 border-b border-white/20 dark:border-white/10">
            <div className="flex justify-center">
              {/* Light Mode Logo */}
              <img
                src="/Image/logo1.png"
                alt="logo1"
                className="w-40 object-contain block dark:hidden"
              />

              {/* Dark Mode Logo */}
              <img
                src="/Image/logo2.png"
                alt="logo2"
                className="w-40 object-contain hidden dark:block"
              />
            </div>
          </div>

          {/* ================= Navigation ================= */}
          <nav className="mt-6 px-4 space-y-2 flex-1 overflow-y-auto">
            <Link to="/" className={navLinkStyle("/")}>
              <Home className="h-5 w-5" />
              Home
            </Link>

            {getMenuItems().map((item, index) => (
              <Link key={index} to={item.to} className={navLinkStyle(item.to)}>
                {item.icon}
                {item.label}
              </Link>
            ))}

            <Link to="/about" className={navLinkStyle("/about")}>
              <Info className="h-5 w-5" />
              About
            </Link>
          </nav>
        </div>

        {/* ================= User Section ================= */}
        <div className="p-4 border-t border-white/20 dark:border-white/10">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center w-full p-3 rounded-xl transition hover:bg-white/40 dark:hover:bg-white/10"
                >
                  <Avatar>
                    <AvatarImage src={user?.avatar || avatar1} />
                    <AvatarFallback>
                      {user.username ? user.username[0] : "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="ml-3 text-left overflow-hidden">
                    <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20"
              >
                <DropdownMenuLabel>Account</DropdownMenuLabel>

                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a
                    href="https://exam-frontend-lilac.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Test / Notes
                  </a>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logoutHandler}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 p-3 font-semibold text-gray-800 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10 rounded-xl"
            >
              <User className="h-5 w-5" />
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {/* ================= Mobile Overlay ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
