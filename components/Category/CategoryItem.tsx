'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

interface CategoryItemProps {
  route: string;
  label: string;
}

const CategoryItem = ({ route, label }: CategoryItemProps) => {
  const pathname = usePathname();

  const isActive = route === pathname;
  return (
    <Button asChild variant={isActive ? "secondary" : "outline"}>
      <Link href={route}>{label}</Link>
    </Button>
  );
};

export default CategoryItem