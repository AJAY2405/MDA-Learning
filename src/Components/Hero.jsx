import React from "react";
import { ArrowRight, Users, BookOpen, GraduationCap} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CountUp from "react-countup";

const Hero = () => {
  const navigate = useNavigate();

  // const stats = {
  //   totalStudents: "1.2M+",
  //   totalCourses: "350+",
  //   activeTeachers: "1200+",
  // };

  const studentGrowthData = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1800 },
  { month: "Mar", students: 2600 },
  { month: "Apr", students: 3400 },
  { month: "May", students: 4300 },
  { month: "Jun", students: 5200 },
];


  return (
    <div className="w-full bg-gray-50 py-12 px-6 [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)]">
      {/* HERO TEXT */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Learn Skills That Matter
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Examination-ready courses designed to boost your Marks.
        </p>

        <Button
          onClick={() => navigate("/courses")}
          className="mt-6 rounded-xl px-6"
        >
          Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols- gap-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <Users className="mx-auto h-8 w-8 mb-2 text-gray-700" />
          <h3 className="font-semibold">Students</h3>
          <p className="text-xl font-bold">
            <CountUp end={1100} />+
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <BookOpen className="mx-auto h-8 w-8 mb-2 text-gray-700" />
          <h3 className="font-semibold">Courses</h3>
          <p className="text-xl font-bold">
            <CountUp end={45} />+
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <GraduationCap className="mx-auto h-8 w-8 mb-2 text-gray-700" />
          <h3 className="font-semibold">Instructors</h3>
          <p className="text-xl font-bold">
            <CountUp end={90} />+
          </p>
        </div>
      </div>
      {/* {stats.activeTeachers} */}

      {/* GRAPH */}
      {/* <div className="max-w-6xl mx-auto mt-14 bg-white rounded-2xl shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4 text-center">
    Student Growth (Last 6 Months)
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={studentGrowthData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="students"
        name="Total Students"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div> */}

    </div>
  );
};

export default Hero;
