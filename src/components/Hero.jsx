// import React from "react";
// import { ArrowRight, Users, BookOpen, GraduationCap } from "lucide-react";
// import { Button } from "./ui/button";
// import { useNavigate } from "react-router-dom";
// import CountUp from "react-countup";
// import { ModeToggle } from "./mode-toggle";

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative w-full bg-gray-100 py-12 px-6 [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)]">

//       {/* HERO TEXT */}
//       <ModeToggle/>
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//           Quality Education for Academic Excellence
//         </h1>

//         <p className="mt-4 text-gray-700 text-lg">
//           Trusted teaching methods focused on clarity, practice, and results.
//         </p>

//         <Button
//           onClick={() => navigate("/courses")}
//           className="mt-6 rounded-xl px-6"
//         >
//           Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
//         </Button>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

//         <div className="bg-white rounded-2xl shadow-md p-6 text-center">
//           <Users className="mx-auto h-8 w-8 mb-2 text-gray-700" />
//           <h3 className="font-semibold">Students</h3>
//           <p className="text-xl font-bold">
//             <CountUp end={1100} />+
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-md p-6 text-center">
//           <BookOpen className="mx-auto h-8 w-8 mb-2 text-gray-700" />
//           <h3 className="font-semibold">Courses</h3>
//           <p className="text-xl font-bold">
//             <CountUp end={45} />+
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-md p-6 text-center">
//           <GraduationCap className="mx-auto h-8 w-8 mb-2 text-gray-700" />
//           <h3 className="font-semibold">Instructors</h3>
//           <p className="text-xl font-bold">
//             <CountUp end={90} />+
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Hero;


import React from "react";
import { ArrowRight, Users, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { ModeToggle } from "./mode-toggle";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full py-16 px-6 overflow-hidden bg-white dark:bg-black">

      {/* 🌿 Animated Background (Tailwind only) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-green-300/40 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl top-40 right-10 animate-bounce"></div>
        <div className="absolute w-72 h-72 bg-green-500/30 rounded-full blur-3xl bottom-10 left-1/2 -translate-x-1/2 animate-pulse"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>

      {/* HERO TEXT */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-sm md:text-base font-medium text-green-700 dark:text-green-400 mb-3">
          Welcome to Mangaldeep Academy
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-green-900 dark:text-white">
          Quality Education for Academic Excellence
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Trusted teaching methods focused on clarity, practice, and results.
        </p>

        <Button
          onClick={() => navigate("/courses")}
          className="mt-8 rounded-xl px-8 py-6 text-lg bg-green-600 hover:bg-green-700 text-white shadow-md"
        >
          Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-green-900 rounded-2xl shadow-lg p-8 text-center transition hover:scale-105">
          <Users className="mx-auto h-10 w-10 mb-4 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-lg text-green-900 dark:text-white">
            Students
          </h3>
          <p className="text-2xl font-bold mt-2 text-green-900 dark:text-white">
            <CountUp end={1100} duration={3} />+
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-green-900 rounded-2xl shadow-lg p-8 text-center transition hover:scale-105">
          <BookOpen className="mx-auto h-10 w-10 mb-4 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-lg text-green-900 dark:text-white">
            Courses
          </h3>
          <p className="text-2xl font-bold mt-2 text-green-900 dark:text-white">
            <CountUp end={45} duration={3} />+
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-green-900 rounded-2xl shadow-lg p-8 text-center transition hover:scale-105">
          <GraduationCap className="mx-auto h-10 w-10 mb-4 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-lg text-green-900 dark:text-white">
            Instructors
          </h3>
          <p className="text-2xl font-bold mt-2 text-green-900 dark:text-white">
            <CountUp end={90} duration={3} />+
          </p>
        </div>

      </div>
    </div>
  );
};

export default Hero;