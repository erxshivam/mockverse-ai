const fs = require("fs");

const Resume =
  require("../models/Resume");

const extractResumeText =
  require(
    "../services/ai/extractResumeText"
  );

const {
  analyzeResume,
} = require(
  "../services/ai/aiService"
);

const {
  generateInterviewQuestions,
} = require(
  "../services/ai/interviewService"
);

const {
  generateFeedback,
  generateFinalInterviewReport,
} = require(
  "../services/ai/feedbackService"
);

const uploadResume =
  async (req, res) => {

    try {

      const resumeText =
        await extractResumeText(
          req.file.path
        );

      const existingResume =
        await Resume.findOne({

          user:
            req.user.id,

          resumeText,

        });

      if (existingResume) {

        fs.unlinkSync(
          req.file.path
        );

        return res.status(200).json({

          message:
            "Resume already uploaded",

          duplicate:
            true,

          resume:
            existingResume,

          analysis: {

            "ATS Score":
              existingResume.atsScore,

            Strengths:
              existingResume.strengths || [],

            Improvements:
              existingResume.improvements || [],

          },

        });

      }

      const analysis =
        await analyzeResume(
          resumeText
        );

      const resume =
        await Resume.create({

          user:
            req.user.id,

          resumeUrl:
            req.file.path,

          resumeText,

          atsScore:
            analysis[
              "ATS Score"
            ],

          strengths:
            analysis.Strengths,

          improvements:
            analysis.Improvements,

        });

      fs.unlinkSync(
        req.file.path
      );

      res.status(201).json({

        message:
          "Resume uploaded",

        duplicate:
          false,

        resume,

        analysis,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

const getMyResumes =
  async (req, res) => {

    try {

      const resumes =
        await Resume.find({

          user:
            req.user.id,

        }).sort({

          createdAt: -1,

        });

      res.status(200).json(
        resumes
      );

    } catch (error) {

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

const getInterviewQuestions =
  async (req, res) => {

    try {

      const resume =
        await Resume.findById(
          req.params.id
        );

      if (!resume) {

        return res
          .status(404)
          .json({

            message:
              "Resume not found",

          });

      }

      const questions =
        await generateInterviewQuestions(

          resume.resumeText,

          req.query.count || 5

        );

      res.status(200).json({

        questions,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

const getAnswerFeedback =
  async (req, res) => {

    try {

      const {
        question,
        answer,
      } = req.body;

      const feedback =
        await generateFeedback(

          question,

          answer

        );

      res.status(200).json(
        feedback
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

const getFinalInterviewReport =
  async (req, res) => {

    try {

      const {
        questions,
        answers,
      } = req.body;

      const report =
        await generateFinalInterviewReport(

          questions,

          answers

        );

      res.status(200).json(
        report
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Final Report Failed",

      });

    }

};

const getDashboardStats =
  async (req, res) => {

    try {

      const resumes =
        await Resume.find({

          user:
            req.user.id,

        });

      const totalResumes =
        resumes.length;

      const totalInterviews =
        resumes.length;

      const averageATS =

        totalResumes > 0

        ? Math.round(

            resumes.reduce(

              (
                acc,
                curr
              ) =>

                acc +
                curr.atsScore,

              0

            ) / totalResumes

          )

        : 0;

      res.status(200).json({

        totalResumes,

        totalInterviews,

        averageATS,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

module.exports = {

  uploadResume,

  getMyResumes,

  getInterviewQuestions,

  getAnswerFeedback,

  getFinalInterviewReport,

  getDashboardStats,

};