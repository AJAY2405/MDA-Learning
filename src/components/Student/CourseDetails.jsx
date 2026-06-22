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
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-black min-h-screen md:p-10 transition-colors duration-300 overflow-hidden">

      {/* 🌿 Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-green-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <Card className="max-w-7xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-xl pt-5 mt-14 border border-gray-200 dark:border-green-900 rounded-2xl">

        {/* HEADER */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-green-900">
          <div className="flex gap-3 items-center">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-green-300 dark:border-green-700"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </Button>

            <h1 className="md:text-2xl font-bold text-green-800 dark:text-white">
              {selectedCourse.courseTitle}
            </h1>
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Enroll Now
          </Button>
        </div>

        {/* COURSE OVERVIEW */}
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          <img
            src={
              selectedCourse.courseThumbnail ||
              "https://via.placeholder.com/400x300"
            }
            alt="Thumbnail"
            className="w-full lg:w-1/3 h-64 object-cover rounded-xl shadow-md"
          />

          <div>
            <p className="text-green-700 dark:text-green-400 mb-2 font-semibold capitalize">
              {selectedCourse.subTitle}
            </p>

            <p
              className="text-gray-700 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: selectedCourse.description,
              }}
            />

            <p className="text-3xl font-bold text-green-700 dark:text-green-400">
              ₹{selectedCourse.coursePrice}
            </p>

            <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <p>⭐ 4.8 Rating (1,200+ students)</p>
              <p>⏱ Lifetime Access</p>
              <p>📜 Certificate of Completion</p>
            </div>
          </div>
        </div>

        {/* WHAT YOU'LL LEARN */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-4 text-green-800 dark:text-white">
            What you’ll learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
            {[
              "Build real-world projects",
              "Understand core concepts deeply",
              "Crack interviews confidently",
              "Become industry-ready",
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* REQUIREMENTS */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-2 text-green-800 dark:text-white">
            Requirements
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Basic computer knowledge. No prior experience required.
          </p>
        </div>

        {/* WHO THIS COURSE IS FOR */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-2 text-green-800 dark:text-white">
            Who this course is for
          </h2>

          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Beginners who want to start from scratch</li>
            <li>Students preparing for placements</li>
            <li>Developers upgrading their skills</li>
          </ul>
        </div>

        {/* COURSE LECTURES */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-green-800 dark:text-white">
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
                  bg-gray-100 dark:bg-zinc-800
                  p-4 rounded-xl cursor-pointer
                  hover:bg-green-100 dark:hover:bg-green-900
                  transition-all duration-300 hover:scale-[1.02]
                "
              >
                {lecture.isPreviewFree ? (
                  <PlayCircle className="text-green-600" size={20} />
                ) : (
                  <Lock className="text-red-500" size={20} />
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