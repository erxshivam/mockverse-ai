import { useState } from "react";

import {

  UploadCloud,

  ShieldCheck,

  BarChart3,

  Target,

  CheckCircle2,

  AlertCircle,

  Loader2,

} from "lucide-react";

import { uploadResume }
from "../services/resumeApi";

function Resume() {

  const [file,
    setFile] =
    useState(null);

  const [analysis,
    setAnalysis] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const handleFileChange =
    (e) => {

      setFile(
        e.target.files[0]
      );

    };

  const handleUpload =
    async () => {

      if (!file) return;

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        const data =
          await uploadResume(
            formData
          );

        setAnalysis(
          data.analysis
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] p-6 transition-all duration-300">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white dark:bg-[#0F172A] rounded-[32px] shadow-xl border border-gray-200 dark:border-white/5 p-8 transition-all duration-300">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">

              <Target
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-[#111827] dark:text-white">

                Resume ATS Analyzer

              </h1>

              <p className="text-gray-500 dark:text-slate-400 mt-1">

                AI-powered resume analysis
                for smarter hiring.

              </p>

            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <div className="bg-gray-50 dark:bg-[#020617] border-2 border-dashed border-indigo-200 dark:border-indigo-500/20 rounded-[28px] p-8 hover:border-indigo-500 transition-all duration-300">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-3xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">

                  <UploadCloud
                    size={34}
                    className="text-indigo-600"
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold text-[#111827] dark:text-white break-all">

                    {file
                      ? file.name
                      : "Choose Resume"}

                  </h2>

                  <p className="text-gray-500 dark:text-slate-400 mt-2">

                    Upload PDF resume file

                  </p>

                </div>

              </div>

              <label className="inline-block mt-8 cursor-pointer">

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white px-7 py-3 rounded-2xl font-semibold shadow-lg">

                  Choose File

                </div>

              </label>

            </div>

            <div className="flex flex-col justify-center bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[28px] p-8 shadow-2xl">

              <h2 className="text-3xl font-bold text-white">

                AI Resume Analysis

              </h2>

              <p className="text-indigo-100 mt-3 leading-7">

                Get ATS score, strengths,
                and improvement suggestions
                instantly using AI.

              </p>

              <button
                onClick={handleUpload}

                disabled={
                  !file || loading
                }

                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-8 bg-white text-indigo-700 hover:bg-gray-100 transition-all duration-300 px-6 py-4 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
              >

                {

                  loading

                  ? (
                    <>
                      <Loader2
                        className="animate-spin"
                        size={22}
                      />

                      Analyzing Resume...
                    </>
                  )

                  : (
                    "Upload Resume"
                  )

                }

              </button>

            </div>

          </div>

          {

            analysis && (

              <>

                <div className="mt-12 bg-gray-50 dark:bg-[#020617] rounded-[30px] border border-gray-200 dark:border-white/5 shadow-md p-8 transition-all duration-300">

                  <div className="grid lg:grid-cols-3 gap-8 items-center">

                    <div>

                      <h2 className="text-3xl font-bold text-[#111827] dark:text-white">

                        ATS Score

                      </h2>

                      <p className="text-gray-500 dark:text-slate-400 mt-3 leading-7">

                        Your resume compatibility
                        score based on ATS analysis.

                      </p>

                      <div className="mt-6 inline-flex items-center gap-3 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-5 py-3 rounded-2xl">

                        <ShieldCheck size={22} />

                        <span className="font-semibold">

                          AI Verified

                        </span>

                      </div>

                    </div>

                    <div className="flex justify-center">

                      <div className="relative w-52 h-52">

                        <div className="absolute inset-0 rounded-full border-[14px] border-gray-200 dark:border-white/10"></div>

                        <div className="absolute inset-0 rounded-full border-[14px] border-indigo-600"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                          <h1 className="text-5xl font-bold text-[#111827] dark:text-white">

                            {analysis["ATS Score"]}

                          </h1>

                          <p className="text-gray-500 dark:text-slate-400 mt-2">

                            out of 100

                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="space-y-5">

                      <div className="flex items-center gap-4 bg-white dark:bg-[#0F172A] rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm">

                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">

                          <Target
                            className="text-indigo-600"
                          />

                        </div>

                        <div>

                          <p className="text-gray-500 dark:text-slate-400 text-sm">

                            Resume Match

                          </p>

                          <h3 className="text-xl font-bold text-black dark:text-white">

                            Strong

                          </h3>

                        </div>

                      </div>

                      <div className="flex items-center gap-4 bg-white dark:bg-[#0F172A] rounded-2xl border border-gray-200 dark:border-white/5 p-4 shadow-sm">

                        <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">

                          <BarChart3
                            className="text-violet-600"
                          />

                        </div>

                        <div>

                          <p className="text-gray-500 dark:text-slate-400 text-sm">

                            ATS Readiness

                          </p>

                          <h3 className="text-xl font-bold text-black dark:text-white">

                            Optimized

                          </h3>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                  <div className="bg-white dark:bg-[#0F172A] rounded-[30px] border border-gray-200 dark:border-white/5 shadow-md p-8 transition-all duration-300">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 flex items-center justify-center">

                        <CheckCircle2
                          size={28}
                          className="text-green-600"
                        />

                      </div>

                      <div>

                        <h2 className="text-2xl font-bold text-black dark:text-white">

                          Strengths

                        </h2>

                        <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">

                          Strong areas in your
                          resume

                        </p>

                      </div>

                    </div>

                    <div className="mt-8 space-y-4">

                      {

                        analysis.Strengths?.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="bg-[#F9FFFB] dark:bg-green-500/5 border border-green-100 dark:border-green-500/10 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                            >

                              <div className="flex items-start gap-3">

                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 flex items-center justify-center">

                                  <CheckCircle2
                                    size={16}
                                    className="text-green-600"
                                  />

                                </div>

                                <p className="text-base font-medium text-[#111827] dark:text-white leading-7">

                                  {item}

                                </p>

                              </div>

                            </div>

                          )
                        )

                      }

                    </div>

                  </div>

                  <div className="bg-white dark:bg-[#0F172A] rounded-[30px] border border-gray-200 dark:border-white/5 shadow-md p-8 transition-all duration-300">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center">

                        <AlertCircle
                          size={28}
                          className="text-orange-600"
                        />

                      </div>

                      <div>

                        <h2 className="text-2xl font-bold text-black dark:text-white">

                          Improvements

                        </h2>

                        <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">

                          Areas to improve

                        </p>

                      </div>

                    </div>

                    <div className="mt-8 space-y-4">

                      {

                        analysis.Improvements?.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="bg-[#FFF9F5] dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                            >

                              <div className="flex items-start gap-3">

                                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center">

                                  <AlertCircle
                                    size={16}
                                    className="text-orange-600"
                                  />

                                </div>

                                <p className="text-base font-medium text-[#111827] dark:text-white leading-7">

                                  {item}

                                </p>

                              </div>

                            </div>

                          )
                        )

                      }

                    </div>

                  </div>

                </div>

              </>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default Resume;