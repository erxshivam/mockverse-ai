const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const Tesseract = require("tesseract.js"); 

const extractResumeText = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // 1. PDF FILES KE LIYE
    if (ext === ".pdf") {
      const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
      const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
      const pdfDocument = await loadingTask.promise;
      
      let fullText = "";
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item) => item.str).join(" ") + "\n";
      }
      return fullText;
    }

    // 2. WORD FILES (.DOCX) KE LIYE
    if (ext === ".docx" || ext === ".doc") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    }

    // 3. IMAGE FILES (.PNG, .JPG) KE LIYE (OCR ka use karke)
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      console.log("Image detect hui, Tesseract OCR se text nikal raha hu...");
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      return text;
    }

    // 4. NORMAL TEXT YA HTML FILES KE LIYE
    return fs.readFileSync(filePath, "utf8");

  } catch (error) {
    console.log("Universal Extraction Error:", error);
    throw new Error("Resume Extraction Failed");
  }
};

module.exports = extractResumeText;