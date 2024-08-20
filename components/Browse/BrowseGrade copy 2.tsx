
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
    <div className="mt-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        {quizzesByGrade?.map((product) => (
          <div key={product.id}>
            <BrowseItem
              key={product.id}
              title={product.subject_title}
              grade={product.grade}
              image={product.url}
              difficulty={product.difficulty}
              correct={product.correct}
              number_of_options={product.number_of_options}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseGrade;
