import React, { useState } from "react";

function Contact() {
  const [flip, setFlip] = useState(false);

  return (
    <div
      id="contacts"
      className="flex min-h-[80vh] w-full items-center justify-center bg-white dark:bg-black px-4"
    >
      {/* Flip Container */}
      <div
        className="relative w-full max-w-[500px] h-[420px] perspective"
        onMouseEnter={() => setFlip(true)}
        onMouseLeave={() => setFlip(false)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform ${
            flip ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute w-full h-full bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-900 rounded-xl shadow-xl p-8 flex flex-col items-center justify-center gap-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
              Contact Me on Email
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Hover to fill the form ✨
            </p>
          </div>

          {/* BACK SIDE (FORM) */}
          <form
            action="https://formsubmit.co/rahul372602@gmail.com"
            method="POST"
            className="absolute w-full h-full bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-900 rounded-xl shadow-xl p-6 flex flex-col gap-4 justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <h1 className="text-xl font-bold text-green-700 dark:text-green-400 text-center">
              Send Message
            </h1>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-lg p-3 bg-green-50 dark:bg-black text-black dark:text-white border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-lg p-3 bg-green-50 dark:bg-black text-black dark:text-white border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              className="w-full rounded-lg p-3 bg-green-50 dark:bg-black text-black dark:text-white border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button
              type="submit"
              className="rounded-lg bg-green-600 hover:bg-green-700 px-5 py-3 text-lg font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;