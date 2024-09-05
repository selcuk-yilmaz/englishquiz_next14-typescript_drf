import BrowseGrade from "@/components/Browse/BrowseGrade";
import Category from "@/components/Category/Category";
import QuizesPage from "@/components/Quizes/QuizesPage";
import React from "react";

// Dinamik rota parametrelerini props olarak alıyoruz
const Quiz = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  // console.log("slug", slug);
  return (
    <div className="mt-4">
      <Category />
        <div className="grid grid-cols-1 gap-2 mt-2">
          <QuizesPage slug={slug} />
        </div>
    </div>
  );
};

export default Quiz;
