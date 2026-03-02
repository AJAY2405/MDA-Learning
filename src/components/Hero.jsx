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
    <div
      className="
        relative w-full py-16 px-6 transition-colors duration-300
        bg-gray-100 dark:bg-gray-900
        [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)]
        dark:[background:radial-gradient(125%_115%_at_40%_50%,#111827_40%,#020617_100%)]
      "
    >
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>

      {/* HERO TEXT */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Quality Education for Academic Excellence
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Trusted teaching methods focused on clarity, practice, and results.
        </p>

        <Button
          onClick={() => navigate("/courses")}
          className="mt-8 rounded-xl px-8 py-6 text-lg"
        >
          Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* Students */}
        <div className="bg-white dark:bg-gray-800 transition-colors duration-300 rounded-2xl shadow-lg p-8 text-center">
          <Users className="mx-auto h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Students
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            <CountUp end={1100} duration={3} />+
          </p>
        </div>

        {/* Courses */}
        <div className="bg-white dark:bg-gray-800 transition-colors duration-300 rounded-2xl shadow-lg p-8 text-center">
          <BookOpen className="mx-auto h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Courses
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            <CountUp end={45} duration={3} />+
          </p>
        </div>

        {/* Instructors */}
        <div className="bg-white dark:bg-gray-800 transition-colors duration-300 rounded-2xl shadow-lg p-8 text-center">
          <GraduationCap className="mx-auto h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Instructors
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            <CountUp end={90} duration={3} />+
          </p>
        </div>

      </div>
    </div>
  );
};

export default Hero;