import RichTextEditor from "@/components/RichTextEditor";
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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [publish, setPublish] = useState(false);

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  /* ---------------- FETCH COURSE ---------------- */
  const getCourseById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const course = res.data.course;
        setSelectedCourse(course);
        setPublish(course.isPublished);

        setInput({
          courseTitle: course.courseTitle || "",
          subTitle: course.subTitle || "",
          description: course.description || "",
          category: course.category || "",
          courseLevel: course.courseLevel || "",
          coursePrice: course.coursePrice || "",
          courseThumbnail: null,
        });

        setPreviewThumbnail(course.courseThumbnail);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch course");
    }
  };

  useEffect(() => {
    if (token) getCourseById();
  }, [courseId, token]);

  /* ---------------- INPUT HANDLERS ---------------- */
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };

  const selectCourseLevel = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  /* ---------------- UPDATE COURSE ---------------- */
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    if (input.courseThumbnail) {
      formData.append("file", input.courseThumbnail);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/course/${courseId}/lecture`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Course update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PUBLISH / UNPUBLISH ---------------- */
 const togglePublishUnpublish = async (action) => {
  try {
    setPublishLoading(true);

    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
      { action }, // send action in body
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      setPublish(!publish);
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log("Toggle publish error:", error.response || error);
    toast.error("Failed to update publish status");
  } finally {
    setPublishLoading(false);
  }
};


  if (!selectedCourse) return null;

  return (
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() =>
              togglePublishUnpublish(publish ? "false" : "true")
            }
            className="bg-gray-800 hover:bg-gray-800"
            disabled={publishLoading}
          >
            {publishLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : publish ? (
              "UnPublish"
            ) : (
              "Publish"
            )}
          </Button>
          {/* <Button variant="destructive">Remove Course</Button> */}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex flex-wrap gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
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

            <div>
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" accept="image/*" onChange={selectThumbnail} />
            {previewThumbnail && (
              <img src={previewThumbnail} className="w-64 my-2" />
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/course")}>
              Cancel
            </Button>
            <Button
              className="bg-gray-800 hover:bg-gray-800"
              disabled={loading}
              onClick={updateCourseHandler}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
