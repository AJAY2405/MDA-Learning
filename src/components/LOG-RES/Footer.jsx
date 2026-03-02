import React from "react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/Image/logo.png"
            alt="E-Learning Logo"
            className="w-80 h-20 object-contain"
          />
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-500 transition">
            <FaTwitter size={26} />
          </a>
          <a href="#" className="hover:text-blue-700 transition">
            <FaLinkedinIn size={26} />
          </a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">
            <FaGithub size={26} />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs py-2 border-t border-gray-400 dark:border-gray-700">
        © {new Date().getFullYear()} E-Learning
      </div>
    </footer>
  );
};

export default Footer;