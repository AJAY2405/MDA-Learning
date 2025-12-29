// import { CourseCard } from "@/pages/CourseCard";
import CourseCard from "@/pages/CourseCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken"); // ✅ token

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:8000/api/v1/course/published-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ REQUIRED SYNTAX
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
  }, [token]); // ✅ IMPORTANT dependency

  return (
    <div className="bg-gray-100 pt-14">
      <div className="min-h-screen max-w-7xl mx-auto py-10">
        <div className="px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our Courses
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Explore our curated courses to boost your skills and career.
          </p>

          {loading ? (
            <p className="text-center">Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
