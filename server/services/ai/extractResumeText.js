const fs = require("fs");

const path = require("path");

const pdfPoppler = require("pdf-poppler");

const Tesseract = require("tesseract.js");

const extractResumeText = async (filePath) => {

  try {

    const outputDir = path.join(
      __dirname,
      "../../temp"
    );

    if (!fs.existsSync(outputDir)) {

      fs.mkdirSync(outputDir);

    }

    const options = {
      format: "png",
      out_dir: outputDir,
      out_prefix: "resume",
      page: null,
    };

    await pdfPoppler.convert(
      filePath,
      options
    );

    const files = fs.readdirSync(outputDir);

    let extractedText = "";

    for (const file of files) {

      const imagePath = path.join(
        outputDir,
        file
      );

      const result =
        await Tesseract.recognize(
          imagePath,
          "eng"
        );

      extractedText +=
        result.data.text + " ";

    }

    return extractedText;

  } catch (error) {

    console.log(error);

    throw new Error(
      "Resume OCR Extraction Failed"
    );

  }
};

module.exports = extractResumeText;