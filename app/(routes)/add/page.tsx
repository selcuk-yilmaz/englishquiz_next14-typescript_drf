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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AddGrade from "@/components/Add/AddGrade";
import AddLesson from "@/components/Add/AddLesson";
import AddSubject from "@/components/Add/AddSubject";



const AddQuestionPage = () => {



  return (
    <div className="flex justify-center items-center gap-2 mt-2">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border-2 border-red-500 md:min-w-full"
      >
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center p-4">
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
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex flex-col items-center justify-center gap-3 border-2 border-red-500 p-6">
            <div className="flex w-10/12 h-full items-center justify-center p-2 border-2 border-red-500">
              <Card className="w-10/12 p-4">
                <CardHeader>
                  <CardTitle className="flex justify-center items-center text-base font-semibold">
                    Add Lesson
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid gap-0">
                  {/* <AddLesson /> */}
                  <AddGrade />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <div className="flex w-10/12 h-full items-center justify-center p-2 border-2 border-red-500">
              <Card className="w-10/12 p-4">
                <CardHeader>
                  <CardTitle className="flex justify-center items-center text-base font-semibold">
                    Add Grade
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid gap-0">
                  <AddGrade />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <div className="flex w-10/12 h-full items-center justify-center p-2 border-2 border-red-500">
              <Card className="w-10/12 p-4">
                <CardHeader>
                  <CardTitle className="flex justify-center items-center text-base font-semibold">
                    Add Subject
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid gap-0">
                  {/* <AddSubject /> */}
                  <AddGrade />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AddQuestionPage;
