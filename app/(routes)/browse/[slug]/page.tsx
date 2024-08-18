import BrowseGrade from "@/components/Browse/BrowseGrade";
import Category from "@/components/Category/Category";
import React from "react";

// Dinamik rota parametrelerini props olarak alıyoruz
const BrowseDetailPage = ({ params }: { params: { slug: number } }) => {
  const { slug } = params;


  return (
    <div className="mt-4">
      <Category />

      <div className="grid grid-cols-1 gap-2 mt-2 border-2 border-rose-500">
        <BrowseGrade slug={slug} />
      </div>
    </div>
  );
};

export default BrowseDetailPage;
