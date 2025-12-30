import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
    <div className="p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold">
        Lets Add <span className="text-blue-500">Courses</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius
        necessitatibus fugit vel distinctio architecto, ut ratione rem nobis
        eaque?
      </p>
      <div className="mt-10">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
            className="bg-white"
          />
        </div>
        <div className="mt-4 mb-5">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 9">Class 9</SelectItem>
                <SelectItem value="Class 8">
                  Class 8
                </SelectItem>
                <SelectItem value="Class 7">
                  Class 7
                </SelectItem>
                <SelectItem value="Class 6">
                  Class 6
                </SelectItem>
                <SelectItem value="Class 5">Class 5</SelectItem>
                <SelectItem value="Class 4">Class 4</SelectItem>
                <SelectItem value="Class 3">Class 3</SelectItem>
                <SelectItem value="Class 2">Class 2</SelectItem>
                <SelectItem value="Class 1">Class 1</SelectItem>
                <SelectItem value="U.K.G/L.K.G">U.K.G/L.K.G</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/course")} variant="outline">
            Cancel
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 "
            disabled={loading}
            onClick={createCourseHandler}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-1 h-4 w-4 " />
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
