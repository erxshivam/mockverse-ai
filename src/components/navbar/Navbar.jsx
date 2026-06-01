import {
  HiMenu,
} from "react-icons/hi";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

function Navbar({
  setIsOpen,
}) {

  const location =
    useLocation();

  const [darkMode,
    setDarkMode] =
    useState(

      localStorage.getItem(
        "theme"
      ) !== "light"

    );

  const pageName =

    location.pathname
      .split("/")[1]
      ?.replace("-", " ")

      || "dashboard";

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);

  return (

    <div className="h-[90px] bg-white dark:bg-[#020617]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-6 flex items-center justify-between transition-all duration-300">

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setIsOpen(true)
          }

          className="md:hidden text-black dark:text-white text-3xl"
        >

          <HiMenu />

        </button>

        <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight transition-all duration-300">

          Workspace{" "}

          <span className="text-blue-400">

            /

          </span>{" "}

          <span className="capitalize text-blue-400">

            {pageName}

          </span>

        </h2>

      </div>

      <button
        onClick={() =>
          setDarkMode(
            !darkMode
          )
        }

        className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-[#172036] transition-all duration-300"
      >

        {

          darkMode

          ? (
            <Sun size={19} />
          )

          : (
            <Moon size={19} />
          )

        }

      </button>

    </div>

  );

}

export default Navbar;