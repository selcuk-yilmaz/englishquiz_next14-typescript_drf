import axios from "../utils/axiosInstance";
import { Quiz, Question, Category } from "../types/quizTypes";

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const response = await axios.get("/quiz/photos/");
  console.log(response)
  return response.data;
};

export const fetchQuizById = async (id: number): Promise<Quiz> => {
  const response = await axios.get(`/quizzes/${id}/`);
  return response.data;
};

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
