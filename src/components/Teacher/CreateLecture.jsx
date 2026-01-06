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
    <div className="p-4 md:p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold mb-2">
        Lets Add <span className="text-blue-600">Lectures</span>
      </h1>

      <div className="mt-10 space-y-5">
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Name"
            className="bg-white"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/course/${courseId}`)}
            variant="outline"
          >
            Back to Course
          </Button>

          <Button
            disabled={loading}
            onClick={createLectureHandler}
            className="bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>

      {/* ---------------- LECTURE LIST ---------------- */}
      <div className="mt-10">
        {fetching ? (
          <p>Loading lectures...</p>
        ) : (
          lectures.map((lecture, index) => (
            <div
              key={lecture._id}
              className="flex items-center justify-between bg-[#F7F9FA] px-4 py-2 rounded-md my-2"
            >
              <h1 className="font-bold text-gray-800">
                Lecture {index + 1}: {lecture.lectureTitle}
              </h1>

              <Edit
                onClick={() => navigate(`${lecture._id}`)}
                size={20}
                className="cursor-pointer text-gray-600 hover:text-blue-600"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
