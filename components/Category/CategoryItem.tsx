"use client"; // Ensure this component is a Client Component

import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategoryItemProps {
  id: number;
  level: number;
}

const CategoryItem = ({ id, level }: CategoryItemProps) => {
  const pathname = usePathname();

  const linkHref = level !== undefined ? `/browse/${level}` : "#";
  const isActive = linkHref === pathname;

  return (
    <Button asChild variant={isActive ? "secondary" : "outline"}>
      <Link href={linkHref}>Grade {level ?? "Unknown"}</Link>
    </Button>
  );
};

export default CategoryItem;
