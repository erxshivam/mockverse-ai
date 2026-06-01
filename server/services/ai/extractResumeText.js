const fs = require("fs");

const extractResumeText =
  async (filePath) => {

    try {

      const text =
        fs.readFileSync(
          filePath
        );

      return text.toString();

    } catch (error) {

      console.log(error);

      throw new Error(
        "Resume Extraction Failed"
      );

    }

};

module.exports =
  extractResumeText;