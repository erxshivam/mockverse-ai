const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
// pdf-parse hata diya, ab tere installed pdfjs-dist ka use kar rahe hain
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const extractResumeText = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".pdf") {
      const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
      const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
      const pdfDocument = await loadingTask.promise;
      
      let fullText = "";
      
      // Har page se text nikalne ke liye loop
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }
      
      return fullText;
    }

    if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    }

    return fs.readFileSync(filePath, "utf8");

  } catch (error) {
    console.log("PDFJS Extraction Error:", error);
    throw new Error("Resume Extraction Failed");
  }
};

module.exports = extractResumeText;