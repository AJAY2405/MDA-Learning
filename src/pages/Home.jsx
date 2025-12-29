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
          "http://localhost:8000/api/v1/course/published-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          // ✅ show only first 3 courses on home page
          setCourses(res.data.courses.slice(0, 2));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, [token]);

  return (
    <div>
      <Hero />

      {/* ---------- COURSES SECTION ---------- */}
      <div className="mt-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Popular Courses
        </motion.h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="text-center col-span-full">
              No courses available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
