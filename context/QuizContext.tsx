"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Quiz, Questions } from "../types/quizTypes";
import { fetchQuizzes, postStudentResponses } from "../actions/quizActions";

interface StudentResponse {
  id: number;
  selectedOption: string;
}

interface QuizContextType {
  quizzes: Questions[];
  loading: boolean;
  error: string | null;
  studentResponses: StudentResponse[];
  setStudentResponses: React.Dispatch<React.SetStateAction<StudentResponse[]>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quizzes, setQuizzes] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define state to store student responses
  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>(
    []
  );

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);
//! below is post student responses for be
  useEffect(() => {
    console.log(studentResponses);
  }, [studentResponses]);


  const handleSubmitPost = async () => {
    try {
      const response = await postStudentResponses(studentResponses);
      console.log("Submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };

  return (
    <QuizContext.Provider
      value={{ quizzes, loading, error, studentResponses, setStudentResponses }}
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
