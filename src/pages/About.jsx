import React from "react";
// import Logo from "../assets/logo.png"; // adjust path if needed

const About = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="MDA Coaching Logo"
          className="mx-auto mb-10 w-80 h-40 object-contain "
        />

        {/* Heading */}
  

        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          <span className="font-bold text-gray-900">
            MDA Coaching Institute
          </span>{" "}
          is one of the leading educational institutes dedicated to empowering
          students through quality teaching, guidance, and mentorship. Our
          mission is to provide a strong academic foundation that helps students
          achieve excellence in school exams, competitive tests, and overall
          personal development.
        </p>

        {/* Vision */}
        <h2 className="text-2xl font-bold text-gray-1200 mt-8 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-900 leading-relaxed mb-6">
          At MDA Coaching Institute, we believe in nurturing talent and shaping
          bright futures. Our vision is to create an environment where every
          student gains knowledge, confidence, and life skills to succeed in
          their chosen paths. We focus on discipline, consistency, and smart
          learning to ensure success.
        </p>

        {/* Key Features */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Why Choose MDA Coaching Institute?
        </h2>
        <ul className="list-disc pl-6 text-gray-900 space-y-3 text-left max-w-3xl mx-auto">
          <li>
            <span className="font-bold">Experienced Faculty:</span> A team of
            highly qualified and dedicated teachers.
          </li>
          <li>
            <span className="font-bold">Personalized Attention:</span> Small
            batch sizes to ensure individual focus.
          </li>
          <li>
            <span className="font-bold">Comprehensive Study Material:</span>{" "}
            Updated notes and practice sets for effective preparation.
          </li>
          <li>
            <span className="font-bold">Regular Tests & Feedback:</span> Weekly
            assessments to track progress and strengthen weak areas.
          </li>
          <li>
            <span className="font-bold">Modern Teaching Methods:</span> Use of
            technology and interactive sessions for better learning.
          </li>
        </ul>

        {/* Courses */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Courses We Offers
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-left max-w-3xl mx-auto">
          <li>Foundation Courses for Classes 6th to 10th</li>
          <li>Board Exam Preparation (Class 10th & 12th)</li>
          <li>Competitive Exam Coaching (NEET, JEE, Olympiads, etc.)</li>
          <li>Personality Development & Skill Enhancement</li>
        </ul>

        {/* Student Support */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Student Support & Facilities
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
          Along with academics, MDA Coaching Institute provides a supportive
          environment that includes doubt-clearing sessions, career counseling,
          and motivational seminars. We aim to not only prepare students for
          exams but also equip them with the confidence to succeed in life.
        </p>

        {/* Closing */}
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-gray-500 mt-10 max-w-3xl mx-auto">
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">
            In Summary
          </h3>
          <p className="text-gray-700">
            <span className="font-bold text-gray-900">
              MDA Coaching Institute
            </span>{" "}
            is more than just a coaching center—it is a platform where dreams
            turn into reality. With a commitment to quality education, modern
            teaching practices, and a student-first approach, we are dedicated
            to building the leaders of tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
