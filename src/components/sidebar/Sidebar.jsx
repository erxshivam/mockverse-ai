import {

  LayoutDashboard,

  FileText,

  History,

  Mic,

  PencilLine,

  FilePlus2,

  LogOut,

  Sparkles,

} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

const sidebarItems = [

  {

    name: "Dashboard Hub",

    path: "/dashboard",

    icon:
      LayoutDashboard,

  },

  {

    name: "Resume Upload",

    path: "/resume",

    icon:
      FileText,

  },

  {

    name: "Resume History",

    path: "/resume-history",

    icon:
      History,

  },
  {

  name: "Resume Builder",

  path: "/resume-builder",

  icon:
    FilePlus2,

},

  {

  name: "Written Mock Test",

  path: "/mock-interview",

  icon: PencilLine,

},

  {

    name: "AI Voice Interview",

    path:
      "/voice-interview",

    icon:
      Mic,

  },

];

function Sidebar({

  isOpen,

  setIsOpen,

}) {

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )

    );

  const userName =

    user?.displayName ||
    user?.name ||
    "Guest User";

  const userEmail =

    user?.email ||
    "guest@mockverse.ai";

  const profileImage =

    user?.photoURL ||

    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName
    )}&background=2563eb&color=fff`;

  return (

    <>

      {

        isOpen && (

          <div
            onClick={() =>
              setIsOpen(false)
            }

            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

        )

      }

      <div
        className={`

        fixed top-0 left-0 z-50

        h-screen w-[285px]

        bg-white dark:bg-[#020617]

        text-black dark:text-white

        border-r border-gray-200 dark:border-white/10

        px-5 py-6

        flex flex-col

        transform transition-transform duration-300

        ${
          isOpen

          ? "translate-x-0"

          : "-translate-x-full"
        }

        md:translate-x-0

      `}
      >

        <div>

          <div className="flex items-center gap-4 mb-10">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

              <Sparkles
                size={22}
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold tracking-tight">

                MockVerse AI

              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

                AI Career Platform

              </p>

            </div>

          </div>

          <div className="space-y-2">

            {sidebarItems.map(
              (item) => {

                const Icon =
                  item.icon;

                return (

                  <NavLink
                    key={
                      item.name
                    }

                    to={
                      item.path
                    }

                    onClick={() =>
                      setIsOpen(false)
                    }

                    className={(
                      {
                        isActive,
                      }
                    ) =>

                      `

                      flex items-center gap-4

                      px-5 py-4

                      rounded-2xl

                      transition-all duration-300

                      font-medium text-[15px]

                      border border-transparent

                      ${
                        isActive

                        ? "bg-gray-100 dark:bg-[#0F172A] border-blue-500/20 text-blue-500 dark:text-blue-400 shadow-lg shadow-blue-500/10"

                        : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#0F172A] hover:text-black dark:hover:text-white"
                      }

                    `

                    }
                  >

                    <Icon
                      size={20}
                    />

                    {
                      item.name
                    }

                  </NavLink>

                );

              }

            )}

          </div>

        </div>

        <div className="mt-auto">

          <div className="bg-gray-100 dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-2xl p-3 flex items-center gap-3 mb-4 transition-all duration-300">

            <img
              src={profileImage}
              alt="profile"

              className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-white/10"
            />

            <div className="flex-1 overflow-hidden">

              <h3 className="font-semibold text-sm truncate text-black dark:text-white">

                {userName}

              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">

                {userEmail}

              </p>

            </div>

          </div>

          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              window.location.href =
                "/";

            }}

            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 dark:text-red-400 py-3 rounded-2xl font-medium transition-all duration-300"
          >

            <LogOut
              size={16}
            />

            Logout

          </button>

        </div>

      </div>

    </>

  );

}

export default Sidebar;