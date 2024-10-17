import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import Newsletter from "../components/NewsLetter";
import { useUser } from "@clerk/clerk-react";

function Footer() {
  const { user } = useUser();
  const userRole = user?.unsafeMetadata?.role; // Get the user role

  return (
    <footer className="bg-black shadow-md shadow-blue-600 mb-8 mt-0 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Logo and Description */}
        <div className="space-y-4 flex justify-center items-center flex-col text-left sm:justify-start sm:items-start">
          <img src="/logo.svg" alt="Logo" width={100} />
          <p className="text-gray-400">
            Bridging Recruiters and Job Seekers for a Seamless Hiring Experience
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 items-center sm:flex-row sm:gap-4 sm:text-sm md:text-md lg:text-lg">
            <li>
              <a href="/" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            {userRole === "recruiter" && ( // Show both options for recruiters
              <>
                <li>
                  <a href="/post-job" className="text-gray-400 hover:text-white">
                    Post Job
                  </a>
                </li>
                <li>
                  <a href="/jobs" className="text-gray-400 hover:text-white">
                    Find Jobs
                  </a>
                </li>
              </>
            )}
            {userRole === "candidate" && ( // Show only "Find Jobs" for candidates
              <li>
                <a href="/jobs" className="text-gray-400 hover:text-white">
                  Find Jobs
                </a>
              </li>
            )}
            {userRole === undefined && ( // Optional: show "Find Jobs" for unauthenticated users
              <li>
                <a href="/jobs" className="text-gray-400 hover:text-white">
                  Find Jobs
                </a>
              </li>
            )}
            <li>
              <a href="/about-us" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-2xl font-bold mb-4 text-center">Stay Connected</h3>
          <Newsletter />
          <div className="flex space-x-4 gap-5 mt-4">
            <a
              href="https://www.linkedin.com/in/roushanb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="w-10 h-10 p-2 rounded-2xl shadow-green-500 shadow-md hover:shadow-blue-600 cursor-pointer transition-all ease-in delay-130 hover:translate-y-1" />
            </a>

            <a
              href="https://github.com/bhupesh-roushan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-10 h-10 p-2 rounded-2xl shadow-green-500 shadow-md hover:shadow-blue-600 cursor-pointer transition-all ease-in delay-130 hover:translate-y-1" />
            </a>

            <a href="mailto:roushan.bhupesh@gmail.com">
              <CgMail className="w-10 h-10 p-2 rounded-2xl shadow-green-500 shadow-md hover:shadow-blue-600 cursor-pointer transition-all ease-in delay-130 hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        <p>&copy; 2024 CubeKit. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
