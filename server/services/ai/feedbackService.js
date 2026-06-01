const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateFeedback =
  async (
    question,
    answer
  ) => {

    try {

      const prompt = `

You are a senior technical interviewer at top product companies like Google, Amazon, Microsoft, and Meta.

Your task is to professionally evaluate the candidate's interview answer.

INTERVIEW QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

EVALUATION RULES:

1. Analyze the answer deeply.
2. Evaluate:
   - technical accuracy
   - clarity
   - communication
   - confidence
   - practical understanding
   - real-world knowledge
3. Detect:
   - missing concepts
   - incorrect statements
   - weak explanations
4. Be professional and constructive.
5. Give realistic score.
6. Do NOT always give high score.
7. Score should be between 1-10.
8. Correct answer should be technically strong but concise.
9. Feedback should sound like a real interviewer.
10. Return ONLY valid JSON.
11. No markdown.
12. No extra explanation.

JSON FORMAT:

{
  "score": "8",
  "feedback": "Your answer demonstrates good understanding of JWT authentication and middleware handling. However, you missed discussing token expiration and refresh token strategies. Communication was clear but the explanation could be more structured.",
  "correctAnswer": "JWT authentication works by generating a signed token after login which is stored on the client side. The token is sent with requests and verified using middleware on the server. Best practices include token expiration, refresh tokens, secure HTTP-only cookies, and proper authorization checks."
}

`;

      const completion =
        await groq.chat.completions.create({

          messages: [

            {
              role: "system",

              content:
                "You are an expert technical interviewer and evaluator.",
            },

            {
              role: "user",

              content: prompt,
            },

          ],

          model:
            "llama-3.3-70b-versatile",

          temperature: 0.5,

          max_tokens: 1200,

        });

      const response =
        completion.choices[0]
        .message.content;

      const jsonMatch =
        response.match(
          /\{[\s\S]*\}/
        );

      if (!jsonMatch) {

        throw new Error(
          "Invalid JSON response"
        );

      }

      return JSON.parse(
        jsonMatch[0]
      );

    } catch (error) {

      console.log(error);

      throw new Error(
        "Feedback Failed"
      );

    }

};

const generateFinalInterviewReport =
  async (
    questions,
    answers
  ) => {

    try {

      const prompt = `

You are a Senior Technical Interview Panel.

Evaluate the complete interview.

QUESTIONS:
${JSON.stringify(
  questions,
  null,
  2
)}

ANSWERS:
${JSON.stringify(
  answers,
  null,
  2
)}

RULES:

1. Evaluate the entire interview.
2. Act like a real hiring panel.
3. Do not inflate scores.
4. Technical accuracy is most important.
5. Communication is second.
6. Confidence is third.
7. Evaluate project understanding.
8. Evaluate problem solving ability.
9. Give realistic recommendation.
10. Return ONLY JSON.

JSON FORMAT:

{
  "overallScore": 8,
  "technicalScore": 8,
  "communicationScore": 7,
  "confidenceScore": 8,
  "strengths": [
    "Strong React knowledge",
    "Good JWT understanding"
  ],
  "improvements": [
    "Improve system design",
    "Explain concepts more clearly"
  ],
  "summary": "Candidate demonstrated good practical knowledge and project experience. Some areas require deeper understanding.",
  "recommendation": "Hire"
}

`;

      const completion =
        await groq.chat.completions.create({

          messages: [

            {
              role: "system",

              content:
                "You are a senior engineering hiring panel.",
            },

            {
              role: "user",

              content: prompt,
            },

          ],

          model:
            "llama-3.3-70b-versatile",

          temperature: 0.3,

          max_tokens: 1500,

        });

      const response =
        completion.choices[0]
        .message.content;

      const jsonMatch =
        response.match(
          /\{[\s\S]*\}/
        );

      if (!jsonMatch) {

        throw new Error(
          "Invalid JSON response"
        );

      }

      return JSON.parse(
        jsonMatch[0]
      );

    } catch (error) {

      console.log(error);

      throw new Error(
        "Final Report Failed"
      );

    }

};

module.exports = {
  generateFeedback,
  generateFinalInterviewReport,
};