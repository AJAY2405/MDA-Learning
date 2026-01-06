import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-black">
        <img
          src={course?.courseThumbnail || "/placeholder.jpg"}
          alt={course?.courseTitle}
          className=" w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
          FEATURED
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-black line-clamp-2">
          {course?.courseTitle}
        </h2>

        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {course?.subTitle || "No description available"}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-300 my-4" />

        {/* Action */}
        <Button
          className="w-full rounded-xl border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
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
