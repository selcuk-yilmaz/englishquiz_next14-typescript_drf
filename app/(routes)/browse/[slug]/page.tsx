import Browse from "@/components/Browse/Browse";
import Category from "@/components/Category/Category";
import React from "react";

const BrowseDetailPage = () => {
  return (
    <div className="mt-4">
      <Category />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        <Browse/>
      </div>
    </div>
  );
};

export default BrowseDetailPage;
