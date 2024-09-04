"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Questions, QuizResponse, ResultOfQuiz } from "../types/quizTypes";
import {
  fetchAllQuestions,
  fetchQuizzes,
  postStudentResponses,
} from "../actions/quizActions";

interface StudentResType {
  id: number;
  selectedOption: string;
  user: string; // Add the user field
}
interface CurrentUser {
  username: string;
  // Add other fields if needed
}

interface QuizContextType {
  loading: boolean;
  error: string | null;
  studentResponses: StudentResType[];
  setStudentResponses: React.Dispatch<React.SetStateAction<StudentResType[]>>;
  handleSubmitPost: () => Promise<void>;
  quizScore: ResultOfQuiz;
  setQuizScore: React.Dispatch<React.SetStateAction<ResultOfQuiz>>;
  solvedTenQue: QuizResponse["results"];
  setSolvedTenQue: React.Dispatch<
    React.SetStateAction<QuizResponse["results"]>
  >;
  user: string; // Add user to context type
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentResponses, setStudentResponses] = useState<StudentResType[]>(
    []
  );
  const [quizScore, setQuizScore] = useState<ResultOfQuiz>({
    id: 0,
    user: "",
    correct: 0,
    wrong: 0,
    empty: 0,
    score: 0,
    status: "",
    wrong_questions: [],
    correct_questions: [],
  });
  const [solvedTenQue, setSolvedTenQue] = useState<QuizResponse["results"]>([]);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser: CurrentUser = JSON.parse(storedUser);
        setUser(parsedUser.username); // Or setUser(parsedUser) if you need the whole object
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(
        sessionStorage.getItem("currentUser") || "false"
      );
      const parsedUser: CurrentUser = storedUser;
      setUser(parsedUser.username); // Or setUser(parsedUser) if you need the whole object
    }
  }, []);
  console.log(user);
  const handleSubmitPost = async () => {
    console.log(user);
    try {
      console.log(studentResponses);
      const response = await postStudentResponses(studentResponses);
      console.log("Submitted successfully:", response);
      setQuizScore(response);
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        loading,
        error,
        studentResponses,
        setStudentResponses,
        handleSubmitPost,
        quizScore,
        setQuizScore,
        solvedTenQue,
        setSolvedTenQue,
        user, // Provide user in context
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
