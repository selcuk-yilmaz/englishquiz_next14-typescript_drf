import axios from "../utils/axiosInstance";
import { Quiz, Question, Category, Questions, SelectedSubject, SelectedGrade, Grade } from "../types/quizTypes";

export const fetchGrades = async (): Promise<Grade[]> => {
  const response = await axios.get("/api/grade/");
  // console.log(response);
  return response.data;
};

export const fetchQuizByGrade = async (id: number): Promise<SelectedGrade[]> => {
  const response = await axios.get(`/api/grade/${id}/`);
  return response.data;
};

export const fetchQuizBySubject = async (
  slug: string
): Promise<SelectedSubject[]> => {
  try {
    const response = await axios.get(`/api/subject/${slug}/`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`Subject with slug "${slug}" not found.`);
    }
    throw error; // rethrow the error to be caught by your page component
  }
};




export const fetchQuizzes = async (): Promise<Questions[]> => {
  const response = await axios.get("/api/questions/");
  // console.log(response);
  return response.data;
};



//!belows are example
export const createQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const response = await axios.post("/quizzes/", quiz);
  return response.data;
};

export const updateQuiz = async (id: number, quiz: Quiz): Promise<Quiz> => {
  const response = await axios.put(`/quizzes/${id}/`, quiz);
  return response.data;
};

export const deleteQuiz = async (id: number): Promise<void> => {
  await axios.delete(`/quizzes/${id}/`);
};
