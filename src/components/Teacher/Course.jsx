import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Course() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course`,
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
        console.error(error);
      }
    };

    getCreatorCourse();
  }, []);

  return (
    <div className="md:p-10 p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Create Button */}
      <Button
        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={() => navigate("create")}
      >
        Create Course
      </Button>

      {/* Table */}
      <div className="mt-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm dark:shadow-lg overflow-hidden">
        <Table>
          <TableCaption className="text-gray-600 dark:text-gray-400">
            A list of your recent courses.
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700">
              <TableHead className="w-[100px] text-gray-700 dark:text-gray-200">
                Course
              </TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-200">
                Price
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200">
                Status
              </TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-200">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses?.map((course) => (
              <TableRow
                key={course._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <TableCell className="md:w-[300px] flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <img
                    src={course?.courseThumbnail}
                    alt="Thumbnail"
                    className="w-20 hidden md:block rounded-md"
                  />
                  {course.courseTitle}
                </TableCell>

                <TableCell className="font-medium text-right text-gray-800 dark:text-gray-200">
                  {course.coursePrice || "NA"}
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={
                      course.isPublished
                        ? "bg-green-500 dark:bg-green-600 text-white"
                        : "bg-red-500 dark:bg-red-600 text-white"
                    }
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => navigate(`/course/${course._id}`)}
                  >
                    <Edit className="text-gray-700 dark:text-gray-200" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Course;