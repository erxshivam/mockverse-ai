const express = require("express");

const protect = require(
  "../middlewares/authMiddleware"
);

const upload = require(
  "../middlewares/uploadMiddleware"
);

const {

  uploadResume,

  getMyResumes,

  getInterviewQuestions,

  getAnswerFeedback,

  getFinalInterviewReport,

  getDashboardStats,

} = require(
  "../controllers/resumeController"
);

const router = express.Router();

router.post(

  "/upload",

  protect,

  upload.single("resume"),

  uploadResume

);

router.get(

  "/my-resumes",

  protect,

  getMyResumes

);

router.get(

  "/questions/:id",

  protect,

  getInterviewQuestions

);

router.post(

  "/feedback",

  protect,

  getAnswerFeedback

);

router.post(

  "/final-report",

  protect,

  getFinalInterviewReport

);

router.get(

  "/dashboard-stats",

  protect,

  getDashboardStats

);

module.exports = router;