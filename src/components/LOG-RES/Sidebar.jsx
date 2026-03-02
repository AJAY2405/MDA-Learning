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
        }
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

  const navLinkStyle = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
        bg-white dark:bg-gray-700 
        border-r border-gray-200 dark:border-gray-800 
        shadow-md flex flex-col justify-between 
        transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1">

          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
            <img
              src="/Image/logo.png"
              alt="Logo"
              className="mx-auto w-40 object-contain"
            />
          </div>

          {/* Navigation */}
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

        {/* ================= Bottom User Section ================= */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
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
                className="w-56 dark:bg-gray-900 dark:border-gray-800"
              >
                <DropdownMenuLabel>Account</DropdownMenuLabel>

                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Notes
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
              className="flex items-center gap-2 p-3 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
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
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;