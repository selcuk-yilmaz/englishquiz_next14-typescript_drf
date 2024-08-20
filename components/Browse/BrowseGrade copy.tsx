import {
  fetchQuizByGrade,
  fetchQuizBySubject,
  fetchQuizzes,
} from "@/actions/quizActions";
import BrowseItem from "@/components/Browse/BrowseItem";
import { SelectedGrade } from "@/types/quizTypes";
import React from "react";

interface BrowseProps {
  slug: number;
}

const BrowseGrade: React.FC<BrowseProps> = async ({ slug }) => {
  const quizzesByGrade: SelectedGrade[] = await fetchQuizByGrade(slug);

  // Create a Set to store unique subject titles
  const uniqueSubjects = new Set(
    quizzesByGrade.map((product) => product.subject_title)
  );

  // Convert Set back to array for further processing
  const uniqueQuizzes = Array.from(uniqueSubjects);
console.log(uniqueQuizzes);
  return (
    <div className="mt-4">
      {/* Display the number of unique subject titles */}
      <p className="text-lg font-semibold">
        {uniqueSubjects.size} unique subjects found.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        {quizzesByGrade
          .filter(
            (product, index, self) =>
              self.findIndex(
                (p) => p.subject_title === product.subject_title
              ) === index
          )
          .map((product) => (
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
