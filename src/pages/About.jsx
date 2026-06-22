import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

const About = () => {
  return (
    <div className="relative p-10 min-h-screen bg-white dark:bg-black transition-colors duration-300 overflow-hidden">

      {/* 🌿 Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-green-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Toggle */}
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>

      <div className="max-w-5xl mx-auto text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/Image/logo1.png"
            alt="logo1"
            className="w-40 block dark:hidden"
          />
          <img
            src="/Image/logo2.png"
            alt="logo2"
            className="w-40 hidden dark:block"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-6">
          About MDA Coaching Institute
        </h1>

        {/* Intro Card */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-8 border border-gray-200 dark:border-green-900">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-bold text-green-700 dark:text-green-400">
              MDA Coaching Institute
            </span>{" "}
            is one of the leading educational institutes dedicated to empowering
            students through quality teaching, guidance, and mentorship. Our
            mission is to provide a strong academic foundation that helps students
            achieve excellence in school exams, competitive tests, and overall
            personal development.
          </p>
        </div>

        {/* Vision */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We believe in nurturing talent and shaping bright futures. Our vision
            is to create an environment where every student gains knowledge,
            confidence, and life skills to succeed in their chosen paths.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            "Experienced Faculty",
            "Personalized Attention",
            "Comprehensive Study Material",
            "Regular Tests & Feedback",
            "Modern Teaching Methods",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl shadow hover:scale-105 transition"
            >
              <p className="font-semibold text-green-800 dark:text-green-300">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Courses We Offer
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>📘 Foundation Courses (6th–10th)</li>
            <li>🎯 Board Exam Preparation (10th & 12th)</li>
            <li>🚀 Competitive Exams (JNV,CHS, VidyaGyan)</li>
            <li>💡 Personality Development</li>
          </ul>
        </div>

        {/* Support */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Student Support
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We provide doubt-clearing sessions, career counseling, and motivational
            seminars. Our goal is to prepare students not just for exams but for
            life success.
          </p>
        </div>

        {/* Closing Card */}
        <div className="bg-green-100 dark:bg-green-900/30 shadow-lg rounded-2xl p-6 mt-10 border border-green-200 dark:border-green-800 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
            In Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold text-green-700 dark:text-green-400">
              MDA Coaching Institute
            </span>{" "}
            is more than just a coaching center—it is a platform where dreams turn
            into reality.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;