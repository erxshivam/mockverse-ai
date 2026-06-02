const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const extractResumeText = async (filePath) => {
  try {

    const ext =
      path.extname(filePath)
      .toLowerCase();

    if (ext === ".docx") {

      const result =
        await mammoth.extractRawText({
          path: filePath,
        });

      return result.value;
    }

    if (ext === ".pdf") {

      return fs.readFileSync(
        filePath,
        "latin1"
      );

    }

    return fs.readFileSync(
      filePath,
      "utf8"
    );

  } catch (error) {

    console.log(error);

    throw new Error(
      "Resume Extraction Failed"
    );

  }
};

module.exports =
  extractResumeText;