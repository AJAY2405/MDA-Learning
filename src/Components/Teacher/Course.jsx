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
import { Button } from "../ui/button";
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
        "http://localhost:8000/api/v1/course",
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
    <div className="md:p-10 p-4 w-full h-screen">
      <Button className="bg-blue-500" onClick={() => navigate("create")}>
        Create Course
      </Button>

      <Table className="mt-10">
        <TableCaption>A list of your recent courses.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Course</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="md:w-[300px] flex items-center gap-2">
                <img
                  src={course?.courseThumbnail}
                  alt="Thumbnail"
                  className="w-20 hidden md:block rounded-sm"
                />
                {course.courseTitle}
              </TableCell>

              <TableCell className="font-medium text-right">
                {course.coursePrice || "NA"}
              </TableCell>

              <TableCell className="text-center">
                <Badge
                  className={course.isPublished ? "bg-green-400" : "bg-red-400"}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Course;
