import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";

// Student
import Courses from "./components/Student/Courses";
import CourseDetails from "./components/Student/CourseDetails";

// Teacher
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import Course from "./components/Teacher/Course";
import CreateCourse from "./components/Teacher/CreateCourse";
import UpdateCourse from "./components/Teacher/UpdateCourse";
import CreateLecture from "./components/Teacher/CreateLecture";
import EditLecture from "./components/Teacher/EditLecture";

// Auth
import Signup from "./components/LOG-RES/Signup";
import Login from "./components/LOG-RES/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";

// Role Guard
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

/* ================= ROUTER ================= */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },

      {
        element: <RoleProtectedRoute allowedRoles={["student"]} />,
        children: [
          { path: "/courses", element: <Courses /> },
          { path: "/courses/:courseId", element: <CourseDetails /> },
        ],
      },

      {
        element: <RoleProtectedRoute allowedRoles={["teacher"]} />,
        children: [
          { path: "/teacherdashboard", element: <TeacherDashboard /> },
          { path: "/course", element: <Course /> },
          { path: "/course/create", element: <CreateCourse /> },
          { path: "/course/:courseId", element: <UpdateCourse /> },
          { path: "/course/:courseId/lecture", element: <CreateLecture /> },
          { path: "/course/:courseId/lecture/:lectureId", element: <EditLecture /> },
        ],
      },

      {
        element: <RoleProtectedRoute allowedRoles={["student", "teacher"]} />,
        children: [{ path: "/profile", element: <Profile /> }],
      },
    ],
  },

  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <VerifyEmail /> },
  { path: "/verify/:token", element: <Verify /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp/:email", element: <VerifyOTP /> },
  { path: "/change-password/:email", element: <ChangePassword /> },
]);

/* ================= APP WITH LOADER ================= */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // ⏱️ loading duration

    return () => clearTimeout(timer);
  }, []);

  /* ✅ LOADER UI */
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">

        {/* Logo */}
        <img
          src="/Image/logo1.png"
          alt="logo"
          className="w-40 mb-6 block dark:hidden"
        />
        <img
          src="/Image/logo2.png"
          alt="logo"
          className="w-40 mb-6 hidden dark:block"
        />

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 animate-[loading_2s_linear_forwards]"></div>
        </div>

        {/* Text */}
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading...
        </p>

        {/* Tailwind custom animation inline */}
        <style>
          {`
            @keyframes loading {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}
        </style>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;