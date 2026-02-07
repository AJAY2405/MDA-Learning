import React, { useEffect, useState } from "react";
import { ArrowRight, Users, BookOpen, GraduationCap, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

// JavaScript Version (No TypeScript)

const Hero = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);

      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative w-full bg-gray-100 dark:bg-gray-900 py-12 px-6 [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)] dark:[background:radial-gradient(125%_115%_at_40%_50%,#111827_40%,#020617_100%)]">

      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-105 transition"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-gray-800" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-400" />
        )}
      </button>

      {/* HERO TEXT */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Quality Education for Academic Excellence
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center">
          <Users className="mx-auto h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold dark:text-white">Students</h3>
          <p className="text-xl font-bold dark:text-white">
            <CountUp end={1100} />+
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center">
          <BookOpen className="mx-auto h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold dark:text-white">Courses</h3>
          <p className="text-xl font-bold dark:text-white">
            <CountUp end={45} />+
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center">
          <GraduationCap className="mx-auto h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold dark:text-white">Instructors</h3>
          <p className="text-xl font-bold dark:text-white">
            <CountUp end={90} />+
          </p>
        </div>

      </div>
    </div>
  );
};

export default Hero;
