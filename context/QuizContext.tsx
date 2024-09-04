"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {QuizResponse, ResultOfQuiz } from "../types/quizTypes";
import {
  postStudentResponses,
} from "../actions/quizActions";

interface StudentResType {
  id: number;
  selectedOption: string;
}


interface QuizContextType {
  loading: boolean;
  error: string | null;
  studentResponses: StudentResType[];
  setStudentResponses: React.Dispatch<React.SetStateAction<StudentResType[]>>;
  handleSubmitPost: (user: string) => Promise<void>; // `user` parametresini ekledik
  quizScore: ResultOfQuiz;
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

const handleSubmitPost = async (user: string): Promise<void> => {
  try {
    // console.log(studentResponses);
    // console.log(user);
    const response = await postStudentResponses(user, studentResponses);
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
