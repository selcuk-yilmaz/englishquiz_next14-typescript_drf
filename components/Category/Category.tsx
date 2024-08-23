import React from 'react'
import CategoryItem from './CategoryItem'
import { fetchGrades } from '@/actions/quizActions';
import { Grade } from '@/types/quizTypes';

const Category = async () => {
  const grades: Grade[] = await fetchGrades();
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {grades.map((item) => (
        <CategoryItem key={item.id} level={item.level} id={item.id} />
      ))}
    </div>
  );
}

export default Category