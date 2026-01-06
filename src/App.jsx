// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// // Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Courses from "./Components/Student/Courses";
// // Auth Pages
// import Signup from "./Components/LOG-RES/Signup";
// import Login from "./Components/LOG-RES/Login";
// import Verify from "./pages/Verify";
// import VerifyEmail from "./pages/VerifyEmail";
// import ForgotPassword from "./pages/ForgotPassword";
// import VerifyOTP from "./pages/VerifyOTP";
// import ChangePassword from "./pages/ChangePassword";
// import Profile from "./pages/Profile";
// import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
// import Course from "./Components/Teacher/Course";
// import CreateCourse from "./Components/Teacher/CreateCourse";
// import UpdateCourse from "./Components/Teacher/UpdateCourse";
// import CreateLecture from "./Components/Teacher/CreateLecture";
// import EditLecture from "./Components/Teacher/EditLecture";
// import CourseDetails from "./Components/Student/CourseDetails";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,   // ✅ Sidebar + Footer applied here
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/courses", element: <Courses /> },
//       { path: "/about", element: <About /> },
//       { path: "/profile", element: <Profile /> },
//       { path: "/courses/:courseId", element: <CourseDetails /> },
//       { path: "/teacherdashboard", element: <TeacherDashboard/> },
//       { path: "/course", element: <Course/> },
//       { path: "/course/create", element: <CreateCourse/> },
//       { path: "/course/:courseId", element: <UpdateCourse/> },
//       { path: "/course/:courseId/lecture", element: <CreateLecture/> },
//       { path: "/course/:courseId/lecture/:lectureId", element: <EditLecture/> }
//     ],
//   },

//   // Auth routes (NO sidebar/footer)
//   { path: "/signup", element: <Signup /> },
//   { path: "/login", element: <Login /> },
//   { path: "/verify", element: <VerifyEmail /> },
//   { path: "/verify/:token", element: <Verify /> },
//   { path: "/forgot-password", element: <ForgotPassword /> },
//   { path: "/verify-otp/:email", element: <VerifyOTP /> },
//   { path: "/change-password/:email", element: <ChangePassword /> },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;




import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },

      // 🧑‍🎓 STUDENT ONLY
      {
        element: <RoleProtectedRoute allowedRoles={["student"]} />,
        children: [
          { path: "/courses", element: <Courses /> },
          { path: "/courses/:courseId", element: <CourseDetails /> },
        ],
      },

      // 👨‍🏫 TEACHER ONLY
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

      // 👤 BOTH (Student + Teacher)
      {
        element: <RoleProtectedRoute allowedRoles={["student", "teacher"]} />,
        children: [{ path: "/profile", element: <Profile /> }],
      },
    ],
  },

  // 🌐 PUBLIC ROUTES
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <VerifyEmail /> },
  { path: "/verify/:token", element: <Verify /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp/:email", element: <VerifyOTP /> },
  { path: "/change-password/:email", element: <ChangePassword /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
