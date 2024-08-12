import React from "react";
import { Quiz } from "../../../types/quizTypes";
import { fetchQuizzes } from "../../../actions/quizActions";
import Image from "next/image";

const QuizPage = async () => {
  const quizzes: Quiz[] = await fetchQuizzes();
  console.log(quizzes);
  return (
    <div>
      <h1>Quiz List</h1>
      <ul>
        {quizzes.map((quiz) => (
          <div key={quiz.id}>
            <li>{quiz.name}</li>
            <li>{quiz.description}</li>
            <li>{quiz.url}</li>
            <Image alt={quiz.name} src={quiz.url} width={500} height={500} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuizPage;
