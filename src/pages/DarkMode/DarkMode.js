import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for light and dark mode

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggling the dark mode class on the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 transition-all duration-300"
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
