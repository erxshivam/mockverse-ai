const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {

  try {

    const completion =
      await groq.chat.completions.create({

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

      });

    const response =
      completion.choices[0].message.content;

    console.log(response);

    const jsonMatch =
      response.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {

      throw new Error(
        "Invalid JSON Response"
      );

    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {

    console.log(error);

    throw new Error("AI Analysis Failed");

  }
};

module.exports = {
  analyzeResume,
};