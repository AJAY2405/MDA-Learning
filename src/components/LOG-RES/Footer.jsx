import React from "react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-800 dark:text-gray-300 transition-colors duration-300 border-t border-gray-200 dark:border-green-900">
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex justify-center">
            {/* Light Mode Logo */}
            <img
              src="/Image/logo1.png"
              alt="logo1"
              className="w-36 object-contain block dark:hidden"
            />

            {/* Dark Mode Logo */}
            <img
              src="/Image/logo2.png"
              alt="logo2"
              className="w-36 object-contain hidden dark:block"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">
            Courses
          </a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <a
            href="#"
            className="p-2 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition transform hover:scale-110"
          >
            <FaTwitter size={20} className="text-green-700 dark:text-green-300" />
          </a>

          <a
            href="#"
            className="p-2 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition transform hover:scale-110"
          >
            <FaLinkedinIn size={20} className="text-green-700 dark:text-green-300" />
          </a>

          <a
            href="#"
            className="p-2 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition transform hover:scale-110"
          >
            <FaGithub size={20} className="text-green-700 dark:text-green-300" />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs py-3 border-t border-gray-200 dark:border-green-900">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} E-Learning. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;