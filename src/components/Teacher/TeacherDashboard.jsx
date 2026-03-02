import React from "react";
import { getData } from "@/context/userContext";

function TeacherDashboard() {
  const { user } = getData();

  return (
    <div className="flex md:h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex-1 flex flex-col">
        <main className="p-6 space-y-6">

          {/* Welcome Section */}
          <section className="bg-blue-500 dark:bg-blue-600 text-white rounded-lg p-6">
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.username || "Teacher"}!
            </h1>

            <button className="mt-4 bg-white dark:bg-gray-800 text-blue-500 dark:text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              Browse New Courses
            </button>
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Courses", value: 5 },
              { label: "Assignments Created", value: 12 },
              { label: "Pending Reviews", value: 3 },
              { label: "Active Students", value: 120 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center transition"
              >
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                  {stat.value}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          {/* Active Courses */}
          <section>
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
              Active Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((course) => (
                <div
                  key={course}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col transition"
                >
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">
                    Course {course}
                  </h3>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${course * 30}%` }}
                    />
                  </div>

                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;