import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Brain,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle2,
  Play,
  Upload,
  FileText,
} from "lucide-react";

import {
  uploadResume,
  getInterviewQuestions,
  getAnswerFeedback,
} from "../services/resumeApi";

function MockInterview() {
  const { id } = useParams();

  const [resumeFile, setResumeFile] =
    useState(null);

  const [resumeId, setResumeId] =
  useState(id || "");

  const [questions, setQuestions] =
    useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [questionLoading, setQuestionLoading] =
    useState(false);

  const [uploadLoading, setUploadLoading] =
    useState(false);

  const [questionCount, setQuestionCount] =
    useState(5);

  const [completed, setCompleted] =
    useState(false);

  const [scores, setScores] =
    useState([]);

  const [started, setStarted] =
    useState(false);

  const [uploadSuccess, setUploadSuccess] =
  useState(!!id);

  const handleUploadResume =
    async () => {

      if (!resumeFile) return;

      try {

        setUploadLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          resumeFile
        );

        const response =
          await uploadResume(
            formData
          );

        setResumeId(
          response.resume._id
        );

        setUploadSuccess(true);

      } catch (error) {

        console.log(error);

      } finally {

        setUploadLoading(false);

      }

    };

  const fetchQuestions =
    async () => {

      if (!resumeId) return;

      try {

        setQuestionLoading(true);

        setQuestions([]);

        setCurrentQuestion(0);

        setFeedback(null);

        setAnswer("");

        setScores([]);

        const data =
          await getInterviewQuestions(
            resumeId,
            questionCount
          );

        if (
          !data.questions ||
          data.questions.length === 0
        ) {

          return;

        }

        setQuestions(
          data.questions
        );

        setStarted(true);

      } catch (error) {

        console.log(error);

      } finally {

        setQuestionLoading(false);

      }

    };

  const handleFeedback =
  async () => {

    if (!answer) return;

    try {

      setLoading(true);

      const data =
        await getAnswerFeedback(
          questions[currentQuestion],
          answer
        );

      setFeedback(data);

      setScores((prev) => {

        const updated =
          [...prev];

        updated[currentQuestion] =
          parseInt(data.score) || 0;

        return updated;

      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleNext =
  () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        (prev) => prev + 1
      );

      setAnswer("");

      setFeedback(null);

      setLoading(false);

    }

  };

  const averageScore =
    scores.length > 0

    ? Math.floor(
        scores.reduce(
          (a, b) => a + b,
          0
        ) / scores.length
      )

    : 0;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] p-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-[28px] p-6 md:p-8 shadow-xl">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">

              <Brain
                size={24}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-black dark:text-white">

                AI Mock Interview

              </h1>

              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">

                Professional AI Interview Experience

              </p>

            </div>

          </div>

          {!started && (

            <div className="mt-10">

              <div className="bg-gray-50 dark:bg-[#020617] border border-dashed border-indigo-400 rounded-[24px] p-8">

                <div className="flex flex-col items-center text-center">

                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">

                    <Upload
                      size={30}
                      className="text-indigo-600"
                    />

                  </div>

                  <h2 className="text-2xl font-bold text-black dark:text-white mt-5">

                    Upload Your Resume

                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-md">

                    Upload your resume and let AI generate personalized interview questions.

                  </p>

                  <label className="mt-8 cursor-pointer">

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        setResumeFile(
                          e.target.files[0]
                        )
                      }
                    />

                    <div className="px-6 py-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 hover:border-indigo-500/40 transition-all duration-300 flex items-center gap-3">

                      <FileText
                        size={20}
                        className="text-indigo-600"
                      />

                      <span className="text-sm font-medium text-black dark:text-white">

                        {
                          resumeFile
                          ? resumeFile.name
                          : "Choose Resume File"
                        }

                      </span>

                    </div>

                  </label>

                  <button
                    onClick={handleUploadResume}
                    disabled={
                      uploadLoading ||
                      !resumeFile
                    }

                    className="mt-6 disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-7 py-3 rounded-2xl font-semibold flex items-center gap-3"
                  >

                    {
                      uploadLoading

                      ? (
                        <>
                          <Loader2
                            className="animate-spin"
                            size={18}
                          />

                          Uploading...
                        </>
                      )

                      : (
                        <>
                          <Upload
                            size={18}
                          />

                          Upload Resume
                        </>
                      )
                    }

                  </button>

                  {

                    uploadSuccess && (

                      <div className="mt-5 px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-2">

                        <CheckCircle2
                          size={18}
                        />

                        Resume uploaded successfully

                      </div>

                    )

                  }

                </div>

              </div>

              {

                resumeId && (

                  <div className="mt-10">

                    <h2 className="text-xl font-bold text-black dark:text-white">

                      Select Question Count

                    </h2>

                    <div className="flex gap-4 mt-5">

                      {[5, 10, 15].map(
                        (count) => (

                          <button
                            key={count}

                            onClick={() =>
                              setQuestionCount(count)
                            }

                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                              questionCount === count
                              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                              : "bg-gray-100 dark:bg-[#020617] border border-gray-200 dark:border-white/5 text-black dark:text-white"
                            }`}
                          >

                            {count} Questions

                          </button>

                        )
                      )}

                    </div>

                    <button
                      onClick={fetchQuestions}
                      disabled={questionLoading}
                      className="mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-7 py-3 rounded-2xl font-semibold flex items-center gap-3"
                    >

                      {
                        questionLoading

                        ? (
                          <>
                            <Loader2
                              className="animate-spin"
                              size={18}
                            />

                            Preparing...
                          </>
                        )

                        : (
                          <>
                            <Play
                              size={18}
                            />

                            Start Interview
                          </>
                        )

                      }

                    </button>

                  </div>

                )

              }

            </div>

          )}

          {

            started &&
            questions.length > 0 &&
            !completed && (

              <>

                <div className="mt-10">

                  <div className="flex justify-between mb-3">

                    <p className="text-sm font-medium text-black dark:text-white">

                      Progress

                    </p>

                    <p className="text-sm font-bold text-indigo-600">

                      {currentQuestion + 1}/{questions.length}

                    </p>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">

                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="mt-8 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-white/5 rounded-[24px] p-6">

                  <div className="flex items-center gap-2 text-indigo-600 mb-4">

                    <Sparkles size={18} />

                    <p className="text-sm font-semibold">

                      Question {currentQuestion + 1}

                    </p>

                  </div>

                  <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-black dark:text-white">

                    {questions[currentQuestion]}

                  </h2>

                </div>

                <textarea
                  value={answer}

                  onChange={(e) =>
                    setAnswer(e.target.value)
                  }

                  placeholder="Write your answer here..."

                  className="w-full h-44 mt-6 rounded-[24px] border border-gray-200 dark:border-white/5 bg-white dark:bg-[#020617] text-black dark:text-white p-5 resize-none outline-none focus:ring-2 focus:ring-indigo-500/30"
                />

                <div className="flex flex-wrap gap-4 mt-6">

                  <button
                    onClick={handleFeedback}

                    disabled={
                      loading ||
                      !answer
                    }

                    className="disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
                  >

                    {
                      loading

                      ? (
                        <>
                          <Loader2
                            className="animate-spin"
                            size={18}
                          />

                          Evaluating...
                        </>
                      )

                      : (
                        <>
                          Get AI Feedback

                          <Sparkles
                            size={16}
                          />
                        </>
                      )

                    }

                  </button>

                  {

                    currentQuestion <
                    questions.length - 1 && (

                      <button
                        onClick={handleNext}

                        disabled={!feedback}

                        className="disabled:opacity-50 bg-gray-100 dark:bg-[#020617] border border-gray-200 dark:border-white/5 text-black dark:text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
                      >

                        Next Question

                        <ArrowRight
                          size={16}
                        />

                      </button>

                    )

                  }

                  {

                    currentQuestion ===
                    questions.length - 1 && (

                      <button
                        onClick={() =>
                          setCompleted(true)
                        }

                        disabled={!feedback}

                        className="disabled:opacity-50 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
                      >

                        Finish Interview

                      </button>

                    )

                  }

                </div>

                {

                  feedback && (

                    <div className="grid lg:grid-cols-3 gap-5 mt-8">

                      <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-[24px] p-5">

                        <h2 className="text-lg font-bold text-indigo-600">

                          AI Score

                        </h2>

                        <h1 className="text-5xl font-bold mt-6 text-black dark:text-white">

                          {feedback.score}

                        </h1>

                      </div>

                      <div className="bg-orange-50 dark:bg-orange-500/10 rounded-[24px] p-5 lg:col-span-2">

                        <h2 className="text-lg font-bold text-orange-600">

                          AI Feedback

                        </h2>

                        <p className="mt-4 leading-7 text-sm text-black dark:text-white">

                          {feedback.feedback}

                        </p>

                      </div>

                      <div className="bg-green-50 dark:bg-green-500/10 rounded-[24px] p-5 lg:col-span-3">

                        <div className="flex items-center gap-2 text-green-600">

                          <CheckCircle2
                            size={18}
                          />

                          <h2 className="text-lg font-bold">

                            Correct Technical Answer

                          </h2>

                        </div>

                        <p className="mt-4 leading-7 text-sm text-black dark:text-white">

                          {feedback.correctAnswer}

                        </p>

                      </div>

                    </div>

                  )

                }

              </>

            )

          }

          {

            completed && (

              <div className="mt-10 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[28px] p-8 text-white">

                <h2 className="text-4xl font-bold">

                  Interview Completed 🎉

                </h2>

                <p className="mt-3 text-indigo-100">

                  Your AI interview analysis has been completed successfully.

                </p>

                <div className="grid md:grid-cols-2 gap-5 mt-8">

                  <div className="bg-white/10 rounded-[24px] p-6">

                    <h3 className="text-lg font-semibold">

                      Questions Attempted

                    </h3>

                    <h1 className="text-5xl font-bold mt-4">

                      {scores.length}

                    </h1>

                  </div>

                  <div className="bg-white/10 rounded-[24px] p-6">

                    <h3 className="text-lg font-semibold">

                      Average Score

                    </h3>

                    <h1 className="text-5xl font-bold mt-4">

                      {averageScore}/10

                    </h1>

                  </div>

                </div>

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default MockInterview;