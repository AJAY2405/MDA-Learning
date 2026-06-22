import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  return (
    <Card
      className="
        group overflow-hidden rounded-2xl
        border border-gray-200 dark:border-green-900
        bg-white dark:bg-zinc-900
        shadow-md hover:shadow-2xl
        transition-all duration-300 hover:-translate-y-2
      "
    >
      {/* ✅ Thumbnail FIX */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-black">
        <img
          src={
            course?.courseThumbnail
              ? course.courseThumbnail
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={course?.courseTitle}
          className="
            w-full h-full object-cover
            transition-all duration-500
            group-hover:scale-110
          "
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Image+Error";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          FEATURED
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {course?.courseTitle}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {course?.subTitle || "No description available"}
        </p>

        <div className="h-px bg-gray-200 dark:bg-green-900 my-4" />

        <Button
          className="
            w-full rounded-xl
            bg-green-600 hover:bg-green-700
            text-white
            shadow-md
            transition-all duration-300
            hover:scale-105
          "
          onClick={() =>
            navigate(token ? `/courses/${course._id}` : "/login")
          }
        >
          {token ? "View Course" : "Login to Continue"}
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;