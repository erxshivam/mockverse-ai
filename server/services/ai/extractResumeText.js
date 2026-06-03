const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const axios = require("axios"); // Naya package
const FormData = require("form-data"); // Naya package

const extractResumeText = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // 1. WORD FILES (.DOCX) - Tumhara purana perfect logic
    if (ext === ".docx" || ext === ".doc") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    }

    // 2. NORMAL TEXT YA HTML FILES - Tumhara purana logic
    if (ext === ".txt" || ext === ".html") {
      return fs.readFileSync(filePath, "utf8");
    }

    // 3. PDF AUR IMAGES KE LIYE (OCR.Space API)
    if (ext === ".pdf" || ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      console.log(`${ext} file detect hui, Text nikal raha hu...`);
      
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      formData.append('apikey', 'helloworld'); // Free API key
      formData.append('isOverlayRequired', 'false');

      const response = await axios.post('https://api.ocr.space/parse/image', formData, {
        headers: formData.getHeaders()
      });

      // Agar API ke end se koi error aaya
      if (response.data.IsErroredOnProcessing) {
        console.log("OCR Error details:", response.data.ErrorMessage);
        throw new Error("OCR Failed");
      }

      // Final text return kar dega
      return response.data.ParsedResults[0].ParsedText;
    }

  } catch (error) {
    console.log("Universal Extraction Error:", error);
    throw new Error("Resume Extraction Failed");
  }
};

module.exports = extractResumeText;