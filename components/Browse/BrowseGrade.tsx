
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
// import { usePathname } from "next/navigation";
interface BrowseProps {
  slug: number;
}
const BrowseGrade: React.FC<BrowseProps> = async ({ slug }) => {
  const quizzesByGrade: SelectedGrade[] = await fetchQuizByGrade(slug);
  //   const quizzesBySubject: SelectedSubject = await fetchQuizBySubject("flags");

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2">
        {quizzesByGrade?.map((product) => (
          <div key={product.id}>
            <BrowseItem
              id={product.id}
              lesson_name={product.lesson_name}
              grade_level={product.grade_level}
              title={product.title}
              question_count={product.question_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseGrade;
