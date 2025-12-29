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
import UserLogo from "../assets/user.jpg"
import {
  BookOpen,
  LogOut,
  User,
  Stethoscope,
  Home,
  Info,
  List,
  Menu,
  X,
  Shield,
  Activity,
  BookUser,
  BookPlus,
  Book,
  BookCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const Sidebar = () => {
  const { user, setUser } = getData();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        //  Logout success
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        toast.success(res.data.message || "Logged out successfully");
      } else {
        //  Logout failed (API responded with success: false)
        toast.error(res.data.message || "Logout failed, please try again");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed due to server error");
    }
  };

  // Close sidebar with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ✅ Role-based menu items
  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "student":
        return [
          {
            to: "/courses",
            label: "Courses",
          },
        ];
      case "teacher":
        return [
          { 
            to: "/teacherdashboard",
            label: "Dashboard"
           },
          { 
            to: "/course",
            label: "Courses"
           }
          ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="fixed top-4 left-4  md:hidden z-50 ">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md flex flex-col justify-between transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex`}
      >
        {/* Top Section - Logo & Navigation */}
        <div className="flex flex-col flex-1 ">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <img
              src="/logo.png"
              alt="MDA Coaching Logo"
              className="mx-auto mb-6 w-45 h-45 object-contain"
            />
            {/* <Link
              to="/"
              className="text-xl font-bold text-gray-700 hover:text-gray-800"
            >
              <span className="text-black">MDA</span>4
              <span className="text-black">Workers</span>
            </Link> */}
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4 space-y-2 overflow-y-auto flex-1">
            <Link
              to="/"
              className={`flex items-center gap-2 p-3 rounded-md ${
                location.pathname === "/"
                  ? "bg-gray-100 text-black"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>

            {/* Role-based links */}
            {getMenuItems().map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center gap-2 p-3 rounded-md ${
                  location.pathname === item.to
                    ? "bg-gray-100 text-black"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                 <BookCheckIcon className="h-5 w-5" />
                {item.icon}
                {item.label}
              </Link>
              
            ))}
             <Link
              to="/about"
              className={`flex items-center gap-2 p-3 rounded-md ${
                location.pathname === "/about"
                  ? "bg-gray-100 text-black"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Info className="h-5 w-5" />
              About
            </Link>
          </nav>
        </div>

        {/* ✅ Bottom Section - User */}
        <div className="p-4 border-t bg-white">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center w-full p-3 hover:bg-gray-100 rounded-md"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar || UserLogo}
                    />
                    <AvatarFallback>
                      {user.username ? user.username[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 text-left overflow-hidden">
                    <p className="font-medium text-gray-700 truncate">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" /> Notes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <User className="h-5 w-5" />
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
