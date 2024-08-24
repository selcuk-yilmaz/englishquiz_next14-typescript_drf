"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import RadioGroupForm from "./RadioGroupForm";
import { useQuizContext } from "@/context/QuizContext";

interface QuizesItemProps {
  id: number;
  subject_title: string;
  difficulty: string;
  url: string;
}

const QuizesPageItem = ({
  id,
  subject_title,
  difficulty,
  url,
}: QuizesItemProps) => {
  const { studentResponses, setStudentResponses } = useQuizContext();

  const handleAnswerSubmit = (data: { selectedOption: string }) => {
    setStudentResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(
        (response) => response.id === id
      );

      if (existingResponseIndex >= 0) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = {
          id,
          selectedOption: data.selectedOption,
        };
        return updatedResponses;
      } else {
        return [...prevResponses, { id, selectedOption: data.selectedOption }];
      }
    });
  };

  // // useEffect to log studentResponses after each update
  // useEffect(() => {
  //   console.log(studentResponses);
  // }, [studentResponses]); // Runs every time studentResponses changes

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
          <p className="mt-2 text-base font-semibold">
            Subject: {subject_title}
          </p>
        </CardHeader>
        <CardContent>
          <span>Difficulty degree </span>
          <Badge>{difficulty}</Badge>
          <RadioGroupForm onSubmitAnswer={handleAnswerSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizesPageItem;
