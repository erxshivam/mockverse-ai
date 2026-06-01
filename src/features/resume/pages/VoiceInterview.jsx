import { useState, useEffect, useRef } from "react";
import { Upload, Mic, Play, CheckCircle2, Loader2, Brain } from "lucide-react";
import { uploadResume, getInterviewQuestions, getFinalInterviewReport } from "../services/resumeApi";

function VoiceInterview() {
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [resumeId, setResumeId] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [listening, setListening] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((voice) => voice.lang.includes("en"));
    if (englishVoice) {
      speech.voice = englishVoice;
    }
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (started && questions.length > 0 && currentQuestion < questions.length) {
      speakQuestion(questions[currentQuestion]);
    }
  }, [currentQuestion, questions, started]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);
      const data = await uploadResume(formData);
      setResumeId(data.resume._id);
      setUploaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const startInterview = async () => {
    try {
      setLoadingQuestions(true);
      const data = await getInterviewQuestions(resumeId, questionCount);
      setQuestions(data.questions);
      setStarted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);
    
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswer(transcript);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

      silenceTimerRef.current = setTimeout(() => {
        if (transcript.trim().length > 5) {
          stopListeningAndNext(transcript);
        }
      }, 3000);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const stopListeningAndNext = (finalTranscript) => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
    nextQuestion(finalTranscript);
  };

  const nextQuestion = async (customAnswer = null) => {
    const finalAnswer = (customAnswer || answer || "").trim();
    
    const updated = [...answers];
    updated[currentQuestion] = finalAnswer || "No answer provided";
    setAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
    } else {
      try {
        window.speechSynthesis.cancel();
        setReportLoading(true);
        const finalReport = await getFinalInterviewReport(questions, updated);
        setReport(finalReport);
        localStorage.setItem("report", JSON.stringify(finalReport));
        setCompleted(true);
      } catch (error) {
        console.error(error);
      } finally {
        setReportLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0F172A] border border-white/5 rounded-[28px] p-8 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Voice Interview</h1>
              <p className="text-slate-400 text-sm mt-1">Real-time AI powered voice interview</p>
            </div>
          </div>

          {!started && (
            <div className="mt-10">
              <div className="bg-[#020617] border border-dashed border-indigo-500/30 rounded-[28px] p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center">
                    <Upload size={36} className="text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-6">Upload Resume</h2>
                  <p className="text-slate-400 mt-2">Upload your resume and let AI generate personalized interview questions.</p>
                  <label className="mt-8 cursor-pointer">
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                    <div className="px-6 py-4 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center gap-3 hover:border-indigo-500 transition-all">
                      <Upload size={18} />
                      <span className="text-white">{file ? file.name : "Choose Resume"}</span>
                    </div>
                  </label>
                  <button onClick={handleUpload} disabled={!file || uploading} className="mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-7 py-3 rounded-2xl font-semibold disabled:opacity-50 flex items-center gap-2">
                    {uploading ? (
                      <><Loader2 size={18} className="animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload size={18} /> Upload Resume</>
                    )}
                  </button>
                  {uploaded && (
                    <div className="mt-5 px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
                      <CheckCircle2 size={18} /> Resume uploaded successfully
                    </div>
                  )}
                </div>
              </div>

              {uploaded && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-white">Select Interview Length</h2>
                  <div className="flex gap-4 mt-5">
                    {[5, 10, 15].map((count) => (
                      <button key={count} onClick={() => setQuestionCount(count)} className={`px-6 py-3 rounded-2xl font-semibold ${questionCount === count ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white" : "bg-[#020617] border border-white/10 text-white"}`}>
                        {count} Questions
                      </button>
                    ))}
                  </div>
                  <button onClick={startInterview} disabled={loadingQuestions} className="mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-7 py-3 rounded-2xl font-semibold flex items-center gap-2">
                    {loadingQuestions ? (
                      <><Loader2 size={18} className="animate-spin" /> Preparing...</>
                    ) : (
                      <><Play size={18} /> Start Interview</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {started && questions.length > 0 && !completed && (
            <div className="mt-10">
              <div className="flex justify-between mb-3">
                <span className="text-white">Progress</span>
                <span className="text-indigo-400 font-bold">{currentQuestion + 1} / {questions.length}</span>
              </div>
              <div className="w-full h-3 bg-[#020617] rounded-full overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-indigo-600 to-violet-600" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="mt-8 bg-[#020617] border border-white/10 rounded-[24px] p-6">
                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                  <Mic size={18} /> <span>AI Interviewer Speaking...</span>
                </div>
                <h2 className="text-2xl font-bold text-white leading-relaxed">{questions[currentQuestion]}</h2>
              </div>
              <textarea value={answer} readOnly placeholder="Your voice transcript will appear here..." className="w-full h-48 mt-6 bg-[#020617] border border-white/10 rounded-[24px] p-5 text-white resize-none outline-none" />
              <div className="flex gap-4 mt-6">
                <button onClick={listening ? () => stopListeningAndNext(answer) : startListening} className={`px-6 py-3 rounded-2xl font-semibold text-white ${listening ? "bg-red-600" : "bg-green-600"}`}>
                  {listening ? "Stop & Submit" : "Start Speaking"}
                </button>
                <button onClick={() => nextQuestion()} className="px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                  {currentQuestion === questions.length - 1 ? "Finish Interview" : "Next Question"}
                </button>
              </div>
            </div>
          )}

          {completed && (
            <div className="mt-10 text-white">
              <h1 className="text-4xl font-bold">Interview Completed 🎉</h1>
              <p className="text-slate-400 mt-3">AI has generated your final interview report.</p>
              <div className="grid md:grid-cols-2 gap-5 mt-8">
                <div className="bg-white/10 rounded-[24px] p-6"><h3 className="text-lg font-semibold">Overall Score</h3><h1 className="text-5xl font-bold mt-4">{report?.overallScore}/10</h1></div>
                <div className="bg-white/10 rounded-[24px] p-6"><h3 className="text-lg font-semibold">Recommendation</h3><h1 className="text-3xl font-bold mt-4">{report?.recommendation}</h1></div>
                <div className="bg-white/10 rounded-[24px] p-6"><h3 className="text-lg font-semibold">Technical Score</h3><h1 className="text-4xl font-bold mt-4">{report?.technicalScore}/10</h1></div>
                <div className="bg-white/10 rounded-[24px] p-6"><h3 className="text-lg font-semibold">Communication Score</h3><h1 className="text-4xl font-bold mt-4">{report?.communicationScore}/10</h1></div>
              </div>
              <div className="mt-8 bg-white/10 rounded-[24px] p-6"><h3 className="text-xl font-bold">Summary</h3><p className="mt-4">{report?.summary}</p></div>
              <div className="mt-6 bg-white/10 rounded-[24px] p-6"><h3 className="text-xl font-bold">Areas To Improve</h3><ul className="mt-4 space-y-2">{report?.improvements?.map((item, index) => <li key={index}>• {item}</li>)}</ul></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceInterview;