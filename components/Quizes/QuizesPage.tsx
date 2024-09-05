"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation"; // redirect fonksiyonu import edildi
import QuizesPageItem from "./QuizesPageItem";
import { Button } from "../ui/button";
import { useQuizContext } from "@/context/QuizContext";
import { fetchQuizBySubject } from "@/actions/quizActions";
import { QuizResponse } from "@/types/quizTypes";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface BrowseProps {
  slug: string;
}

// SEO Metadata function
export async function generateMetadata({ params }: { params: BrowseProps }) {
  const { slug } = params;
  const data: QuizResponse = await fetchQuizBySubject(slug);
  const quizData = data.results;

  if (!quizData || quizData.length === 0) {
    return {
      title: "THIS QUIZ HAS NOT BEEN UPLOADED YET",
      description: "No project data available",
    };
  }

  return {
    title: quizData[0].subject_title,
    description: quizData[0].difficulty,
  };
}

const QuizesPage: React.FC<BrowseProps> = ({ slug }) => {
  const { handleSubmitPost, setSolvedTenQue } = useQuizContext();
  const { currentUser } = useAuthContext();
  const user =
    typeof currentUser !== "boolean" && currentUser.username
      ? currentUser.username
      : "Anonymous user";

  const [quizData, setQuizData] = useState<QuizResponse["results"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data: QuizResponse = await fetchQuizBySubject(slug);
        setQuizData(data.results);
        setSolvedTenQue(data.results);
      } catch (err) {
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, [slug, setSolvedTenQue]);

  useEffect(() => {
    if (!currentUser) {
      toast({
        title: "Kayıt ve login işlemlerini yapınız",
        description: "Lütfen önce giriş yapınız veya kaydolunuz.",
        variant: "destructive",
        duration: 5000, // Toast'ın kaç milisaniye görüneceğini belirtir.
      });
      redirect("/"); // Ana sayfaya yönlendirme
    }
  }, [currentUser]); // Dependency array'ine router eklenmedi

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !quizData || quizData.length === 0) {
    return (
      <div className="flex justify-center items-center text-base font-semibold">
        THIS QUIZ HAS NOT BEEN UPLOADED YET
      </div>
    );
  }

  if (!currentUser) {
    return null; // Kullanıcı mevcut değilse içerik render edilmez
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        {quizData.map((question) => (
          <div key={question.id}>
            <QuizesPageItem
              id={question.id}
              subject_title={question.subject_title}
              difficulty={question.difficulty}
              url={question.url}
              number_of_options={question.number_of_options}
            />
          </div>
        ))}
      </div>
      <div
        className="bg-mycolor-400 dark:bg-mycolor-100 border-b-2
      dark:border-b-mycolor-400/30 h-16 mx-auto flex justify-end pr-2 items-center"
      >
        <div className="justify-end items-center">
          <Link href={"/score"}>
            <Button
              variant="mybutton"
              onClick={() => {
                if (user) {
                  handleSubmitPost(user);
                } else {
                  console.error("User is not available");
                }
              }}
            >
              Complete the Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizesPage;
