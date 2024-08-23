"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuizContext } from "@/context/QuizContext";

const ScoreTable = () => {
  const { quizScore } = useQuizContext();

  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          {/* <Image
            alt={quizScore}
            src={url}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          /> */}
          <p className="mt-2 text-base font-semibold">
            score: {quizScore.user}
          </p>
          <p className="mt-2 text-base font-semibold">
            correct: {quizScore.correct}
          </p>
          <p className="mt-2 text-base font-semibold">
            wrong: {quizScore.wrong}
          </p>
          <p className="mt-2 text-base font-semibold">
            empty: {quizScore.empty}
          </p>
          <p className="mt-2 text-base font-semibold">
            score: {quizScore.score}
          </p>
        </CardHeader>
        <CardContent>
          <span>status</span>
          <Badge>{quizScore.status}</Badge>
        </CardContent>
      </Card>
      <div>
        {quizScore.wrong_questions?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              {/* <Image
            alt={quizScore}
            src={url}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          /> */}
            </CardHeader>
            <CardContent>
              <span>{item.id} </span>
              <Badge>{item.subject_name}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScoreTable;
