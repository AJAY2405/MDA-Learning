import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const LectureTab = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  // ✅ Get token from localStorage
  const token = localStorage.getItem("accessToken");

  const [lectureTitle, setLectureTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  /* ---------------- FETCH LECTURE ---------------- */
  const getLectureById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}/lecture/${lectureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const lecture = res.data.lecture;
        setLectureTitle(lecture.lectureTitle);
        setYoutubeUrl(lecture.videoUrl || "");
        setIsFree(lecture.isPreviewFree);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch lecture");
    }
  };

  useEffect(() => {
    if (token) getLectureById();
  }, [lectureId, token]);

  /* ---------------- UPDATE LECTURE ---------------- */
  const editLectureHandler = async (e) => {
    e.preventDefault();

    if (!youtubeUrl.trim()) {
      toast.error("YouTube video link is required");
      return;
    }

    const data = {
      lectureTitle,
      videoUrl: youtubeUrl,
      isPreviewFree: isFree,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}/lecture/${lectureId}`,
        data,
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/course/${courseId}/lecture`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lecture update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE LECTURE ---------------- */
  const removeLectureHandler = async () => {
    try {
      setRemoveLoading(true);

      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/lecture/${lectureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/course/${courseId}/lecture`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete lecture");
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg">

  {/* Header */}
  <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>
      <CardTitle className="text-xl text-gray-800 dark:text-white">
        Edit Lecture
      </CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-400">
        Update lecture details and YouTube video link.
      </CardDescription>
    </div>

    <Button
      disabled={removeLoading}
      variant="destructive"
      onClick={removeLectureHandler}
      className="md:w-auto w-full"
    >
      {removeLoading ? (
        <>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Remove Lecture"
      )}
    </Button>
  </CardHeader>

  {/* Content */}
  <CardContent>
    <div className="space-y-6">

      {/* Lecture Title */}
      <div>
        <Label className="text-gray-800 dark:text-gray-200">
          Lecture Title
        </Label>
        <Input
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="Ex. Introduction to JavaScript"
          className="mt-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* YouTube Link */}
      <div>
        <Label className="text-gray-800 dark:text-gray-200">
          YouTube Video Link
        </Label>
        <Input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=XXXX"
          className="mt-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Video Preview */}
      {youtubeUrl && youtubeUrl.includes("youtube.com") && (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <iframe
            className="w-full h-64"
            src={youtubeUrl.replace("watch?v=", "embed/")}
            title="YouTube Preview"
            allowFullScreen
          />
        </div>
      )}

      {/* Free Switch */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600">
        <Label className="text-gray-800 dark:text-gray-200">
          Is this lecture FREE?
        </Label>
        <Switch checked={isFree} onCheckedChange={setIsFree} />
      </div>

      {/* Update Button */}
      <Button
        disabled={loading}
        onClick={editLectureHandler}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Update Lecture"
        )}
      </Button>

    </div>
  </CardContent>
</Card>
  );
};

export default LectureTab;
