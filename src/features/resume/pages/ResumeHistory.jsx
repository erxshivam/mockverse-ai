import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import {

  FileText,

  ArrowUpRight,

  CalendarDays,

  Sparkles,

} from "lucide-react";

import {

  getMyResumes,

} from "../services/resumeApi";

function ResumeHistory() {

  const navigate =
    useNavigate();

  const [resumes,
    setResumes] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const fetchResumes =
      async () => {

        try {

          const data =
            await getMyResumes();

          setResumes(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchResumes();

  }, []);

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] p-6 transition-all duration-300">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-4xl font-bold text-[#111827] dark:text-white">

              Resume History

            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">

              Track your previous ATS analyses
              and resume performance.

            </p>

          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 px-5 py-3 rounded-2xl shadow-sm">

            <Sparkles
              size={20}
              className="text-indigo-600"
            />

            <span className="font-semibold text-black dark:text-white">

              {
                resumes.length
              } Resume Analyses

            </span>

          </div>

        </div>

        {

          loading

          ? (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {

                [...Array(6)].map(
                  (_, index) => (

                    <div
                      key={index}
                      className="h-[260px] rounded-3xl bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 animate-pulse"
                    />

                  )
                )

              }

            </div>

          )

          : resumes.length === 0

          ? (

            <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-[32px] p-14 text-center transition-all duration-300">

              <div className="w-24 h-24 rounded-3xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mx-auto">

                <FileText
                  size={42}
                  className="text-indigo-600"
                />

              </div>

              <h2 className="text-3xl font-bold text-[#111827] dark:text-white mt-8">

                No Resume History

              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-md mx-auto leading-7">

                Upload your first resume to
                start tracking ATS scores and
                AI-powered analysis history.

              </p>

            </div>

          )

          : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {

                resumes.map(
                  (resume) => (

                    <div
                      key={resume._id}

                      className="group bg-white dark:bg-[#0F172A] rounded-[30px] border border-gray-200 dark:border-white/5 p-7 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300"
                    >

                      <div className="flex items-start justify-between">

                        <div>

                          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-2xl text-sm font-semibold">

                            <Sparkles
                              size={16}
                            />

                            ATS Score

                          </div>

                          <h2 className="text-5xl font-bold text-[#111827] dark:text-white mt-5">

                            {
                              resume.atsScore
                            }

                            <span className="text-2xl text-slate-400">

                              /100

                            </span>

                          </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">

                          <ArrowUpRight
                            size={22}
                            className="text-white"
                          />

                        </div>

                      </div>

                      <div className="mt-8 space-y-4">

                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">

                          <CalendarDays
                            size={18}
                          />

                          <span className="text-sm">

                            {
                              new Date(
                                resume.createdAt
                              ).toLocaleDateString()
                            }

                          </span>

                        </div>

                        <div className="bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-white/5 rounded-2xl p-4">

                          <p className="text-xs uppercase tracking-wide text-slate-400">

                            Resume Status

                          </p>

                          <h3 className="mt-2 text-lg font-semibold text-black dark:text-white">

                            {
                              resume.atsScore >= 80

                              ? "Highly Optimized"

                              : resume.atsScore >= 60

                              ? "Moderately Optimized"

                              : "Needs Improvement"
                            }

                          </h3>

                        </div>

                      </div>

                      <button
                        onClick={() =>

                          navigate(
                            `/mock-interview/${resume._id}`
                          )

                        }

                        className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >

                        Start Mock Interview

                        <ArrowUpRight
                          size={18}
                        />

                      </button>

                    </div>

                  )
                )

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default ResumeHistory;