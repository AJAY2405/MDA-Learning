import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/published-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setCourses(res.data.courses.slice(0, 3));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, [token]);

  return (
    <div
      className="
        min-h-screen transition-colors duration-300
        bg-gray-200 dark:bg-gray-900
      "
    >
      {/* Hero Section */}
      <Hero />

      {/* ---------- COURSES SECTION ---------- */}
      <div className="mt-20 px-6 pb-20 ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10 
                     text-gray-900 dark:text-white"
        >
          Popular Courses
        </motion.h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600 dark:text-gray-300 text-lg">
              No courses available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;