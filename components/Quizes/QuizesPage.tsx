import {
  fetchQuizByGrade,
  fetchQuizBySubject,
  fetchQuizzes,
} from "@/actions/quizActions";
import BrowseItem from "@/components/Browse/BrowseItem";
// import Category from "@/components/Category/Category";
import { Questions, SelectedGrade, SelectedSubject } from "@/types/quizTypes";
import { type } from "os";
import React from "react";
import QuizesPageItem from "./QuizesPageItem";
// import { usePathname } from "next/navigation";
interface BrowseProps {
  slug: string;

}
export async function generateMetadata({slug}: BrowseProps) {
  const quizData = await fetchQuizBySubject(slug);

  if (!quizData) {
    return <div>project not found</div>;
  }

  return {
    title: quizData[0].subject_title,
    description: quizData[0].difficulty,
  };
}

const QuizesPage: React.FC<BrowseProps> = async ({ slug }) => {
  const quizData = await fetchQuizBySubject(slug);
  if (!quizData) {
    return <div>project not found</div>;
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "quizData",
    title: quizData[0].subject_title,
    name: quizData[0].difficulty,
    image: quizData[0].url,
    //    publishedAt: project.publishedAt,
    //    updatedAt: project.updatedAt,
    //    author: project.author,
    //    isPublished: project.isPublished,
    //    tags: project.tags,
  };
//   console.log("quizData", quizData);

  return (
    <div className="mt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        {quizData?.map((question) => (
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
    </div>
  );
};

export default QuizesPage;
