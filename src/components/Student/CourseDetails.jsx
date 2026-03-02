import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { ArrowLeft, Lock, PlayCircle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseLecture, setCourseLecture] = useState([]);

  const token = localStorage.getItem("accessToken");

  /* ---------------- FETCH COURSE DETAILS ---------------- */
  useEffect(() => {
    const getCourseById = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setSelectedCourse(res.data.course);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCourseById();
  }, [courseId, token]);

  /* ---------------- FETCH COURSE LECTURES ---------------- */
  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}/lecture`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setCourseLecture(res.data.lectures);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCourseLecture();
  }, [courseId, token]);

  if (!selectedCourse) {
    return (
      <p className="text-center mt-20 text-gray-700 dark:text-gray-300">
        Loading course...
      </p>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen md:p-10 transition-colors duration-300">
      <Card className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-md dark:shadow-xl pt-5 mt-14 border border-gray-200 dark:border-gray-700 transition-all duration-300">

        {/* ---------- HEADER ---------- */}
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-gray-300 dark:border-gray-600"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </Button>

            <h1 className="md:text-2xl font-bold text-gray-800 dark:text-white">
              {selectedCourse.courseTitle}
            </h1>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Enroll Now
          </Button>
        </div>

        {/* ---------- COURSE OVERVIEW ---------- */}
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          <img
            src={selectedCourse.courseThumbnail}
            alt="Thumbnail"
            className="w-full lg:w-1/3 rounded-md"
          />

          <div>
            <p className="text-gray-800 dark:text-gray-200 mb-3 font-semibold capitalize">
              {selectedCourse.subTitle}
            </p>

            <p
              className="text-gray-700 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: selectedCourse.description,
              }}
            />

            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{selectedCourse.coursePrice}
            </p>

            <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <p>⭐ 4.8 Rating (1,200+ students)</p>
              <p>⏱ Lifetime Access</p>
              <p>📜 Certificate of Completion</p>
            </div>
          </div>
        </div>

        {/* ---------- WHAT YOU'LL LEARN ---------- */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            What you’ll learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <CheckCircle size={18} /> Build real-world projects
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={18} /> Understand core concepts deeply
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={18} /> Crack interviews confidently
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={18} /> Become industry-ready
            </p>
          </div>
        </div>

        {/* ---------- REQUIREMENTS ---------- */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            Requirements
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Basic computer knowledge. No prior experience required.
          </p>
        </div>

        {/* ---------- WHO THIS COURSE IS FOR ---------- */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            Who this course is for
          </h2>

          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Beginners who want to start from scratch</li>
            <li>Students preparing for placements</li>
            <li>Developers upgrading their skills</li>
          </ul>
        </div>

        {/* ---------- COURSE LECTURES ---------- */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            Course Curriculum
          </h2>

          <p className="italic mb-4 text-gray-600 dark:text-gray-400">
            {courseLecture.length} Lectures
          </p>

          <div className="space-y-3">
            {courseLecture.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() => {
                  if (lecture.isPreviewFree) {
                    window.open(lecture.videoUrl, "_blank");
                  } else {
                    alert("Please enroll to access this lecture");
                  }
                }}
                className="
                  flex items-center gap-3 
                  bg-gray-200 dark:bg-gray-700
                  p-4 rounded-md cursor-pointer
                  hover:bg-gray-300 dark:hover:bg-gray-600
                  transition-all
                "
              >
                {lecture.isPreviewFree ? (
                  <PlayCircle size={20} />
                ) : (
                  <Lock size={20} />
                )}

                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {lecture.lectureTitle}
                </p>
              </div>
            ))}
          </div>
        </div>

      </Card>
    </div>
  );
};

export default CourseDetails;