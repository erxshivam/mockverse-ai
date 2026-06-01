import {

  FileText,

  Brain,

  Briefcase,

  ArrowUpRight,

} from "lucide-react";

import {

  useEffect,

  useState,

} from "react";

import {

  getDashboardStats,

} from "../../resume/services/resumeApi";

function Dashboard() {

  const [stats,
    setStats] =
    useState({

      totalResumes: 0,

      totalInterviews: 0,

      averageATS: 0,

    });

  const [loading,
    setLoading] =
    useState(true);

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

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchStats();

  }, []);

  return (

    <div className="space-y-6">

      <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-3xl p-6 transition-all duration-300">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div className="flex items-center gap-4">

            <img
              src={profileImage}
              alt="profile"

              className="w-16 h-16 rounded-2xl object-cover border border-gray-200 dark:border-white/10 shadow-lg"
            />

            <div>

              <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">

                Welcome back,
                {" "}
                {userName}
                👋

              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">

                {userEmail}

              </p>

            </div>

          </div>

          <div className="flex items-center">

            <div className="px-4 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-sm font-semibold">

              {
                user?.emailVerified

                ? "Verified Account"

                : "Standard Account"
              }

            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-3px]">

          <div className="flex items-center justify-between">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center">

              <FileText
                size={28}
              />

            </div>

            <ArrowUpRight
              size={20}
              className="text-slate-400"
            />

          </div>

          <h2 className="text-slate-500 dark:text-slate-400 mt-6 text-sm font-medium">

            Resume Uploaded

          </h2>

          <p className="text-4xl font-bold text-black dark:text-white mt-2">

            {
              loading

              ? "..."

              : stats.totalResumes
            }

          </p>

        </div>

        <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-3px]">

          <div className="flex items-center justify-between">

            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">

              <Brain
                size={28}
              />

            </div>

            <ArrowUpRight
              size={20}
              className="text-slate-400"
            />

          </div>

          <h2 className="text-slate-500 dark:text-slate-400 mt-6 text-sm font-medium">

            Mock Interviews

          </h2>

          <p className="text-4xl font-bold text-black dark:text-white mt-2">

            {
              loading

              ? "..."

              : stats.totalInterviews
            }

          </p>

        </div>

        <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-3px]">

          <div className="flex items-center justify-between">

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">

              <Briefcase
                size={28}
              />

            </div>

            <ArrowUpRight
              size={20}
              className="text-slate-400"
            />

          </div>

          <h2 className="text-slate-500 dark:text-slate-400 mt-6 text-sm font-medium">

            Average ATS Score

          </h2>

          <p className="text-4xl font-bold text-black dark:text-white mt-2">

            {
              loading

              ? "..."

              : `${stats.averageATS}%`
            }

          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;