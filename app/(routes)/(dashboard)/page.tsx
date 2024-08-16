import React from "react";
import { Questions } from "../../../types/quizTypes";
import { fetchQuizzes } from "../../../actions/quizActions";
import Image from "next/image";
import Category from "@/components/Category/Category";

const QuizPage = async () => {
  const quizzesses: Questions[] = await fetchQuizzes();
  console.log(quizzesses);
  return (
    <div className="mt-4">
      <Category />
      <h1>Quiz List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        <ul>
          {quizzesses.map((quiz) => (
            <div key={quiz.id}>
              <li>{quiz.subject}</li>
              <li>{quiz.difficulty}</li>
              <li>{quiz.url}</li>
              <Image
                alt={quiz.subject}
                src={quiz.url}
                width={500}
                height={500}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizPage;
