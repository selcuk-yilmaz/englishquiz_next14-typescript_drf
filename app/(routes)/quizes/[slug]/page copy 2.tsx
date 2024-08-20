import Category from "@/components/Category/Category";
import { Button } from "@/components/ui/button";
import { AppWindow, Code, Coins, TimerIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiYoutube } from "react-icons/fi";
import axios from "axios";
import { SelectedSubject } from "@/types/quizTypes";
import { fetchQuizBySubject } from "@/actions/quizActions";

interface ProjectPageDetailProps {
  slug: string;
}

const ProjectPageDetail: React.FC<ProjectPageDetailProps> = async ({
  slug,
}) => {
  const quizData = await fetchQuizBySubject(slug);
console.log("quizData",quizData);
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
        <div className="lg:col-span-5">
          <div className="bg-mycolor-400 dark:bg-mycolor-100 border-2 dark:border-mycolor-400/20 p-3 rounded-lg">
            <Image
              src={quizData[0]?.url} 
              alt="quiz image"
              className="w-full rounded-xl"
              width={500}
              height={500}
            />

            <h2 className="text-3xl mt-4 font-semibold py-4">
              {quizData[0]?.subject_title}
            </h2>
            <div className="space-y-3">
              <p>Difficulty: {quizData[0]?.difficulty}</p>
              <p>Correct Answer: {quizData[0]?.correct}</p>

              <div className="h-8"></div>

              <div className="flex flex-row gap-12 items-center mt-12">
                <div className="flex items-center justify-center gap-3 text-base">
                  <Coins /> {"Price not available"}{" "}
                  {/* Add real data if available */}
                </div>

                <div className="flex items-center justify-center gap-3 text-base">
                  <TimerIcon /> {"Published Date"}{" "}
                  {/* Add real data if available */}
                </div>

                <div className="flex items-center justify-center gap-3 text-base">
                  <User /> {"Author"} {/* Add real data if available */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-mycolor-400 dark:bg-mycolor-100 border-2 dark:border-mycolor-400/20 p-3 rounded-lg">
            <p>Watch This Course For Free on Youtube</p>
            <p className="font-semibold">Subscribe to Our Youtube Channel</p>
            <Button variant="destructive" className="w-full mt-3 gap-4" asChild>
              <Link href={quizData[0]?.url} target="_blank">
                {" "}
                {/* Assuming this is the video URL */}
                <FiYoutube /> Watch on youtube
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3 text-center">
            <Button variant="mybutton" className="h-14 font-semibold">
              <Code className="mr-2 font-semibold" /> Code
            </Button>

            <Button variant="mybutton" className="h-14 font-semibold">
              <AppWindow className="mr-2 font-semibold" /> Demo
            </Button>

            <Button variant="mybutton" className="h-14 font-semibold">
              <FiYoutube className="mr-2 font-semibold" /> Youtube
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageDetail;
