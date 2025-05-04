import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center mb-2 md:mb-0">
          <img src="/TS.png" alt="TenantSync Logo" className="h-16 w-16 mr-4" />
          <span className="font-bold text-lg">TenantSync</span> &copy;{" "}
          {new Date().getFullYear()}
        </div>
        <div className="flex space-x-4">
          <a
            href="https://github.com/Mubashirul-Islam/TenantSync"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            GitHub
          </a>
          <a href="/" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="/" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2">
        Made with ❤️ by Mubashir, Shuddha, Ovi and Babli
      </div>
    </footer>
  );
}

export default Footer;
