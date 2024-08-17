import {
  fetchQuizByGrade,
  fetchQuizBySubject,
  fetchQuizzes,
} from "@/actions/quizActions";
// import BrowseItem from "@/components/Browse/BrowseItem";
// import Category from "@/components/Category/Category";
import { Questions, SelectedGrade, SelectedSubject } from "@/types/quizTypes";
import React from "react";



const Browse = async () => {
  const quizzesses: Questions[] = await fetchQuizzes();
  const quizzesByGrade: SelectedGrade = await fetchQuizByGrade(2);
//   const quizzesBySubject: SelectedSubject = await fetchQuizBySubject("flags");
console.log(quizzesByGrade);
// console.log(quizzesBySubject);
  return (
    <div className="mt-4">
      {/* <Category /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        {/* {filtedProdoucts.map((product) => (
          <>
            <BrowseItem
              key={product.id}
              image={product.image}
              price={product.price}
              title={product.title}
              url={product.href}
              description={product.description}
            />
          </>
        ))} */}
        {/* <p> {quizzesByGrade} </p> */}
        {/* <p> {quizzesBySubject} </p> */}
      </div>
    </div>
  );
};

export default Browse;
