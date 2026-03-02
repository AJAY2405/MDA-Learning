import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

function UpdateCourse() {
  return (
    <div className="md:p-10 p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl text-gray-800 dark:text-gray-200">
          Add detail information regarding course
        </h1>

        <Link to="lecture">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition">
            Go to your lecture page
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition">
        <CourseTab />
      </div>

    </div>
  );
}

export default UpdateCourse;