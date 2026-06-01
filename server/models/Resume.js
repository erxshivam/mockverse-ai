const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resumeUrl: {
      type: String,
    },

    atsScore: {
      type: Number,
      default: 0,
    },
    resumeText: {
  type: String,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Resume",
  resumeSchema
);