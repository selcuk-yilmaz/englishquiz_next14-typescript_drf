"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface QuizesItemProps {
  id: number;
  subject_title: string;
  difficulty: string;
  url: string;
}

const WrongAndEmpty = ({ subject_title, difficulty, url }: QuizesItemProps) => {
  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          <Image
            alt={subject_title}
            src={url}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          />
        </CardHeader>
        <CardTitle className="flex justify-center items-center text-base font-semibold">
          Question Features
        </CardTitle>
        <CardContent className="p-0 grid gap-0 ">
          <div className="flex items-center space-x-4 rounded-md p-1">
            <p className="text-sm font-medium leading-none">Subject:</p>
            <div className="flex-1">
              <Badge>{subject_title}</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-md p-1">
            <p className="text-sm text-muted-foreground">Difficulty:</p>
            <div className="flex-1">
              <Badge>{difficulty}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WrongAndEmpty;
