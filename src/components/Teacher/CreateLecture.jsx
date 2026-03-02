import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken"); // ✅ correct key

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  /* ---------------- FETCH LECTURES ---------------- */
  const getLectures = async () => {
    try {
      setFetching(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}/lecture`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
        }
      );

      if (res.data.success) {
        setLectures(res.data.lectures);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lectures");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (token) {
      getLectures();
    }
  }, [courseId, token]);

  /* ---------------- CREATE LECTURE ---------------- */
  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}/lecture`,
        { lectureTitle },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setLectureTitle("");
        getLectures();
      }
    } catch (error) {
      console.error(error);
      toast.error("Lecture creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-10 md:pr-20">

  {/* Header */}
  <div>
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
      Let’s Add <span className="text-blue-600">Lectures</span>
    </h1>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      Create and manage lectures for this course.
    </p>
  </div>

  {/* Create Lecture Card */}
  <div className="mt-10 max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg rounded-xl p-6 space-y-6">

    <div>
      <Label className="text-gray-800 dark:text-gray-200">
        Title
      </Label>
      <Input
        value={lectureTitle}
        onChange={(e) => setLectureTitle(e.target.value)}
        placeholder="Your Lecture Name"
        className="mt-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </div>

    <div className="flex gap-3 pt-2">
      <Button
        onClick={() => navigate(`/course/${courseId}`)}
        variant="outline"
        className="dark:border-gray-600 dark:text-gray-200"
      >
        Back to Course
      </Button>

      <Button
        disabled={loading}
        onClick={createLectureHandler}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Create Lecture"
        )}
      </Button>
    </div>
  </div>

  {/* Lecture List */}
  <div className="mt-12 max-w-2xl">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
      Course Lectures
    </h2>

    {fetching ? (
      <p className="text-gray-600 dark:text-gray-400">
        Loading lectures...
      </p>
    ) : lectures.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">
        No lectures added yet.
      </p>
    ) : (
      lectures.map((lecture, index) => (
        <div
          key={lecture._id}
          className="
            flex items-center justify-between
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            px-4 py-3 rounded-lg
            mb-3
            hover:shadow-md transition
          "
        >
          <h1 className="font-medium text-gray-800 dark:text-gray-200">
            Lecture {index + 1}: {lecture.lectureTitle}
          </h1>

          <Edit
            onClick={() => navigate(`${lecture._id}`)}
            size={20}
            className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
          />
        </div>
      ))
    )}
  </div>
</div>
  );
};

export default CreateLecture;
