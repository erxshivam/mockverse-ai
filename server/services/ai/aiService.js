const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
            You are an ATS Resume Analyzer.
            Analyze this resume carefully.
            Keep the response concise and short.
            Rules:
            - ATS Score only out of 100
            - Maximum 3 strengths
            - Maximum 3 improvements
            - Each point should be short
            - Return ONLY valid JSON

            JSON format:
            {
              "ATS Score": number,
              "Strengths": [],
              "Improvements": []
            }

            Resume:
            ${resumeText}
            `,
        },
      ],
      model: "llama-3.3-70b-versatile",
      // FIX: Ye AI ko strictly proper JSON dene pe majboor karega
      response_format: { type: "json_object" }, 
    });

    const response = completion.choices[0].message.content;
    console.log("Clean AI Response:", response);

    // Direct parse, koi regex ki zarurat nahi ab
    return JSON.parse(response);

  } catch (error) {
    console.log("Groq API Error:", error);
    throw new Error("AI Analysis Failed");
  }
};

module.exports = {
  analyzeResume,
};