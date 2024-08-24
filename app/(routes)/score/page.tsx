"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuizContext } from "@/context/QuizContext";
import QuizesPageItem from "@/components/Quizes/QuizesPageItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ScoreTable = () => {
  const { quizScore, quizDataGlobal } = useQuizContext();
  const questionOfWrongAndEmpty = quizDataGlobal.filter((item) =>
    quizScore.wrong_questions.some((que) => que.id === item.id)
  );

  console.log("questionOfWrongAndEmpty", questionOfWrongAndEmpty);
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
          <span>status=</span>
          <Badge>{quizScore.status}</Badge>
        </CardContent>
      </Card>
      <div>
        <Card>
          <CardHeader className=" flex justify-center  items-center">
            <p>wrongly answered questions Answers</p>
          </CardHeader>
          <div className="flex">
            {questionOfWrongAndEmpty?.map((item) => (
              <CardContent key={item.id}>
                <span>{item.id} </span>
                <span>{item.correct} </span>
                {/* <Badge>{item.subject_title}</Badge> */}
              </CardContent>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader className=" flex justify-center  items-center">
            <p>wrongly answered questions</p>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
          {questionOfWrongAndEmpty.map((question) => (
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
                {/* <CardContent className="mx-auto flex justify-end items-center">
                  <span className="border-2 border-orange-500">
                    correct answer
                  </span>
                  <Badge>{question.correct}</Badge>
                </CardContent> */}
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
  );
};

export default ScoreTable;
