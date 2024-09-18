import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for light and dark mode

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Retrieve dark mode setting from localStorage when the component mounts
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggling the dark mode class on the root element and saving the setting to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
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
