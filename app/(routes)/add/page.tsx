import AddQuestionForm from "@/components/Add/AddQuestionForm";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const AddQuestionPage = () => {



  return (
    <div className="flex justify-center items-center gap-2 mt-2">
      <Card className="w-10/12 p-8">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-base font-semibold">
            Add Question
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 grid gap-0">
          <AddQuestionForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddQuestionPage;
