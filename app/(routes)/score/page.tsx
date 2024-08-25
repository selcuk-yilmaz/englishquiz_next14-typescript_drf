"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuizContext } from "@/context/QuizContext";
import QuizesPageItem from "@/components/Quizes/QuizesPageItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PanelGroup from "@/components/score/PanelGroup";

const ScoreTable = () => {
  const { quizScore, solvedTenQue } = useQuizContext();

  const questionOfEmpty = solvedTenQue.filter(
    (item) =>
      !quizScore.correct_questions.some((que) => que.id === item.id) &&
      !quizScore.wrong_questions.some((que) => que.id === item.id)
  );

  console.log("quizScore", quizScore);
  console.log("questionOfEmpty", questionOfEmpty);
  return (
    <>
      <div className="col-span-1 border-2 border-red-500">
        <div className="flex justify-center items-center border-2 border-green-500">
          <Card>
            <CardHeader>
              <CardContent>
                <PanelGroup quizScore={quizScore} />
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader className=" flex justify-center  items-center">
              <p>Mistakes Questions</p>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
            {quizScore.wrong_questions?.map((question) => (
              <div className="border-2" key={question.id}>
                <QuizesPageItem
                  id={question.id}
                  subject_title={question.subject_title}
                  difficulty={question.difficulty}
                  url={question.url}
                />
                <Card>
                  <CardHeader>
                    <span className="flex justify-end">
                      correct answer=
                      <Badge>{question.correct}</Badge>
                    </span>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader className=" flex justify-center  items-center">
              <p>Skipped Questions</p>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
            {questionOfEmpty?.map((question) => (
              <div className="border-2" key={question.id}>
                <QuizesPageItem
                  id={question.id}
                  subject_title={question.subject_title}
                  difficulty={question.difficulty}
                  url={question.url}
                />
                <Card>
                  <CardHeader>
                    <span className="flex justify-end">
                      correct answer=
                      <Badge>{question.correct}</Badge>
                    </span>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
          <div
            className="bg-mycolor-400 dark:bg-mycolor-100 border-b-2
      dark:border-b-mycolor-400/30 h-16 mx-auto flex justify-end pr-2 items-center"
          >
            <div className="justify-end items-center">
              <Link href={"/"}>
                <Button variant="mybutton">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreTable;
