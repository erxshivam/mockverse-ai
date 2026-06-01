import axios from "axios";

const API =
  "http://localhost:5000/api/resume";

export const uploadResume =
  async (formData) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(

        `${API}/upload`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

};

export const getMyResumes =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(

        `${API}/my-resumes`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

};

export const getInterviewQuestions =
  async (resumeId, count) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(

        `${API}/questions/${resumeId}?count=${count}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

};

export const getAnswerFeedback =
  async (
    question,
    answer
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(

        `${API}/feedback`,

        {
          question,
          answer,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

};

export const getFinalInterviewReport =
  async (
    questions,
    answers
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(

        `${API}/final-report`,

        {
          questions,
          answers,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

};

export const getDashboardStats =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(

        `${API}/dashboard-stats`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

};

export default API;