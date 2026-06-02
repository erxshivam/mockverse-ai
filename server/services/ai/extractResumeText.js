const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const extractResumeText = async (filePath) => {

  try {

    const ext =
      path.extname(filePath)
      .toLowerCase();

    if (ext === ".pdf") {

      const pdfModule =
        require("pdf-parse");

      const pdf =
        pdfModule.default ||
        pdfModule;

      const dataBuffer =
        fs.readFileSync(
          filePath
        );

      const data =
        await pdf(
          dataBuffer
        );

      return data.text;

    }

    if (ext === ".docx") {

      const result =
        await mammoth
          .extractRawText({

            path:
              filePath,

          });

      return result.value;

    }

    if (ext === ".txt") {

      return fs.readFileSync(

        filePath,

        "utf8"

      );

    }

    throw new Error(
      "Unsupported file format"
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