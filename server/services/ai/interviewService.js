const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateInterviewQuestions =
  async (
    resumeText,
    count = 5
  ) => {

    try {

      const prompt = `

You are an expert senior technical interviewer at top product companies like Google, Amazon, Microsoft, and Meta.

Your task is to generate HIGH QUALITY technical interview questions based on the candidate's resume.

IMPORTANT RULES:

1. Analyze the resume deeply.
2. Detect:
   - tech stack
   - frameworks
   - programming languages
   - projects
   - experience level
   - backend/frontend/devops/database concepts
3. Questions should feel REAL and PROFESSIONAL.
4. Questions must test:
   - practical knowledge
   - real-world problem solving
   - project understanding
   - core fundamentals
5. Avoid generic beginner questions unless the resume itself is beginner-level.
6. Include:
   - scenario based questions
   - project related questions
   - optimization questions
   - debugging questions
7. Keep questions concise but strong.
8. Generate EXACTLY ${count} questions.
9. Do NOT number questions.
10. Return ONLY valid JSON array.
11. No explanation.
12. No markdown.

EXAMPLE FORMAT:

[
  "Explain how JWT authentication works in your MERN project.",
  "How would you optimize MongoDB queries for large datasets?"
]

RESUME:

${resumeText}

`;

      const completion =
        await groq.chat.completions.create({

          messages: [

            {
              role: "system",

              content:
                "You are a professional technical interviewer.",
            },

            {
              role: "user",

              content: prompt,
            },

          ],

          model:
            "llama-3.3-70b-versatile",

          temperature: 0.7,

          max_tokens: 1200,

        });

      const response =
        completion.choices[0]
        .message.content;

      console.log(response);

      const jsonMatch =
        response.match(/\[[\s\S]*\]/);

      if (!jsonMatch) {

        throw new Error(
          "Invalid JSON response"
        );

      }

      const parsedQuestions =
        JSON.parse(
          jsonMatch[0]
        );

      return parsedQuestions;

    } catch (error) {

      console.log(error);

      throw new Error(
        "Question Generation Failed"
      );

    }

};

module.exports = {
  generateInterviewQuestions,
};