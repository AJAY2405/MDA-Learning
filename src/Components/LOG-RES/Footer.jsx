import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="E-Learning Logo"
            className="w-30 h-30 object-contain"
          />
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-400">
            <TwitterIcon size={18} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <LinkedinIcon size={18} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <GithubIcon size={18} />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs text-gray-500 py-2 border-t border-gray-800">
        © {new Date().getFullYear()} E-Learning
      </div>
    </footer>
  );
};

export default Footer;
