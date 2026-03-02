import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("accessToken"); // ✅ correct key

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/`,
      { courseTitle, category },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ REQUIRED
        },
      }
    );

    if (res.data.success) {
      navigate("/course");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Unauthorized or token missing");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6 md:p-10 md:pr-20">

  {/* Header */}
  <div>
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
      Let’s Add <span className="text-blue-500">Courses</span>
    </h1>

    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xl">
      Create a new course to start building your content and reach students.
    </p>
  </div>

  {/* Form Card */}
  <div className="mt-10 max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg rounded-xl p-6 space-y-6">

    {/* Title */}
    <div>
      <Label className="text-gray-800 dark:text-gray-200">
        Title
      </Label>
      <Input
        type="text"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        placeholder="Your Course Name"
        className="mt-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
      />
    </div>

    {/* Category */}
    <div>
      <Label className="text-gray-800 dark:text-gray-200">
        Category
      </Label>

      <Select onValueChange={getSelectedCategory}>
        <SelectTrigger className="w-[200px] mt-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>

        <SelectContent className="dark:bg-gray-800 dark:text-white">
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="Class 10">Class 10</SelectItem>
            <SelectItem value="Class 9">Class 9</SelectItem>
            <SelectItem value="Class 8">Class 8</SelectItem>
            <SelectItem value="Class 7">Class 7</SelectItem>
            <SelectItem value="Class 6">Class 6</SelectItem>
            <SelectItem value="Class 5">Class 5</SelectItem>
            <SelectItem value="Class 4">Class 4</SelectItem>
            <SelectItem value="Class 3">Class 3</SelectItem>
            <SelectItem value="Class 2">Class 2</SelectItem>
            <SelectItem value="Class 1">Class 1</SelectItem>
            <SelectItem value="U.K.G/L.K.G">
              U.K.G/L.K.G
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    {/* Buttons */}
    <div className="flex gap-3 pt-2">
      <Button
        onClick={() => navigate("/course")}
        variant="outline"
        className="dark:border-gray-600 dark:text-gray-200"
      >
        Cancel
      </Button>

      <Button
        disabled={loading}
        onClick={createCourseHandler}
        className="
          bg-blue-500 hover:bg-blue-600 
          dark:bg-blue-600 dark:hover:bg-blue-700 
          text-white
        "
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Please wait
          </>
        ) : (
          "Create"
        )}
      </Button>
    </div>

  </div>
</div>
  );
};

export default CreateCourse;
