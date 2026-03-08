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
    <div className="bg-gray-200 dark:bg-gray-900 pt-14 transition-colors duration-300">
      <div className="min-h-screen max-w-7xl mx-auto py-10">
        <div className="px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Our Courses
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Explore our curated courses to boost your skills and career.
          </p>

          {loading ? (
            <p className="text-center text-gray-700 dark:text-gray-300">
              Loading courses...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-700 dark:text-gray-400">
                  No courses available
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;