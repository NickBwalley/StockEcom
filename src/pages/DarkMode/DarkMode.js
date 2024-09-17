import React, { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext"; // Import the context
import { FiSun, FiMoon } from "react-icons/fi";

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext); // Access context

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 transition-all duration-300 fixed top-4 right-4"
    >
      {darkMode ? (
        <FiSun className="text-yellow-500 w-6 h-6" />
      ) : (
        <FiMoon className="text-gray-900 w-6 h-6" />
      )}
    </button>
  );
};

export default DarkMode;
