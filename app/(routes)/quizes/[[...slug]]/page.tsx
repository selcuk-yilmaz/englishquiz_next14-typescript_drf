import BrowseGrade from "@/components/Browse/BrowseGrade";
import Category from "@/components/Category/Category";
import QuizesPage from "@/components/Quizes/QuizesPage";
import { QuizProvider } from "@/context/QuizContext";
import React from "react";

// Dinamik rota parametrelerini props olarak alıyoruz
const Quiz = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  console.log("slug", slug);
  return (
    <div className="mt-4">
      <Category />
      <QuizProvider>
        <div className="grid grid-cols-1 gap-2 mt-2 border-2 border-rose-500">
          <QuizesPage slug={slug} />
        </div>
      </QuizProvider>
    </div>
  );
};

export default Quiz;
