import {
  fetchQuizByGrade,
  fetchQuizBySubject,
  fetchQuizzes,
} from "@/actions/quizActions";
import BrowseItem from "@/components/Browse/BrowseItem";
// import Category from "@/components/Category/Category";
import { Questions, QuizResponse, SelectedGrade, SelectedSubject } from "@/types/quizTypes";
import { type } from "os";
import React from "react";
import QuizesPageItem from "./QuizesPageItem";
import { Button } from "../ui/button";
// import { usePathname } from "next/navigation";
interface BrowseProps {
  slug: string;
}


export async function generateMetadata({ slug }: BrowseProps) {
  const data: QuizResponse = await fetchQuizBySubject(slug);
  const quizData = data.results;

  if (!quizData || quizData.length === 0) {
    return {
      title: "THIS QUIZ HAS NOT BEEN UPLOADED YET",
      description: "No project data available",
    };
  }

  return {
    title: quizData[0].subject_title,
    description: quizData[0].difficulty,
  };
}


const QuizesPage: React.FC<BrowseProps> = async ({ slug }) => {
  const data: QuizResponse = await fetchQuizBySubject(slug);
  const quizData = data.results;

  if (!quizData || quizData.length === 0) {
    return (
      <div className="flex justify-center items-center text-base font-semibold">
        THIS QUIZ HAS NOT BEEN UPLOADED YET
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "quizData",
    title: quizData[0].subject_title,
    name: quizData[0].difficulty,
    image: quizData[0].url,
  };

  return (
    <div className="mt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        {quizData.map((question) => (
          <div key={question.id}>
            <QuizesPageItem
              id={question.id}
              subject_title={question.subject_title}
              difficulty={question.difficulty}
              url={question.url}
            />
          </div>
        ))}
      </div>
      <div
        className="bg-mycolor-400 dark:bg-mycolor-100 border-b-2
    dark:border-b-mycolor-400/30 h-16 mx-auto flex justify-end pr-2 items-center"
      >
        <div className="justify-end items-center">
          <Button variant="mybutton">Complate the Quiz</Button>
        </div>
      </div>
    </div>
  );
};


export default QuizesPage;
