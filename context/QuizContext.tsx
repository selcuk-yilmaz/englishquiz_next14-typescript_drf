"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Questions, QuizResponse, ResultOfQuiz } from "../types/quizTypes";
import { fetchAllQuestions, fetchQuizzes, postStudentResponses } from "../actions/quizActions";

interface StudentResType {
  id: number;
  selectedOption: string;
}

interface QuizContextType {
  // quizzes: Questions[];
  // setQuizzes: React.Dispatch<React.SetStateAction<Questions[]>>;
  loading: boolean;
  error: string | null;
  studentResponses: StudentResType[];
  setStudentResponses: React.Dispatch<React.SetStateAction<StudentResType[]>>;
  handleSubmitPost: () => Promise<void>;
  quizScore: ResultOfQuiz; // this is a single object
  setQuizScore: React.Dispatch<React.SetStateAction<ResultOfQuiz>>;
  solvedTenQue: QuizResponse["results"];
  setSolvedTenQue: React.Dispatch<
    React.SetStateAction<QuizResponse["results"]>
  >;
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

  //! below is post student responses for be for quizScore aşğaıyı context e koymamızın nedeni return eden datayı score page kullanacağımızdandır.
  const handleSubmitPost = async () => {
    try {
      const response = await postStudentResponses(studentResponses);
      console.log("Submitted successfully:", response);
      setQuizScore(response);
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };

  console.log("studentResponses", studentResponses);
  console.log("solvedTenQue", solvedTenQue);
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
