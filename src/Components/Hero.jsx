import React from "react";
import { ArrowRight, Users, BookOpen, GraduationCap} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 py-12 px-6 [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)]">
      {/* HERO TEXT */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black-900">
          Quality Education for Academic Excellence
        </h1>
        <p className="mt-4 text-black-800 text-lg">
         Trusted teaching methods focused on clarity, practice, and results.
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
   
    </div>
  );
};

export default Hero;
