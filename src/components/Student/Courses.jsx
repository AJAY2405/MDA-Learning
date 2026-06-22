import CourseCard from "@/pages/CourseCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/published-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setCourses(res.data.courses);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getAllPublishedCourse();
    }
  }, [token]);

  return (
    <div className="relative bg-white dark:bg-black pt-14 transition-colors duration-300 overflow-hidden">

      {/* 🌿 Background Animation (Tailwind only) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-green-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="min-h-screen max-w-7xl mx-auto py-12 px-4">

        {/* 🔥 Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Our Courses
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Explore our curated courses to boost your skills and career.
          </p>
        </div>

        {/* 📦 Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="transition transform hover:scale-105"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
              No courses available
            </p>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow">
              Browse Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;