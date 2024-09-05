import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ResultOfQuiz } from "@/types/quizTypes"; // Import your type
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";
interface PanelGroupProps {
  quizScore: ResultOfQuiz; // Define the prop type
}

// Map the quiz statuses to image URLs
const statusImageMap: { [key: string]: string } = {
  bad: "/images/resultQuiz/bad.jpeg",
  poor: "/images/resultQuiz/poor.jpeg",
  good: "/images/resultQuiz/good.jpeg",
  better: "/images/resultQuiz/better.jpeg",
  perfect: "/images/resultQuiz/perfect.jpeg",
};

export function PanelGroup({ quizScore }: PanelGroupProps) {
  // Get the image URL based on the quizScore.status, fallback to a default image if status is unknown
  const imageUrl =
    statusImageMap[quizScore.status] || "/images/resultQuiz/sorry.jpeg";

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg  md:min-w-[650px]"
    >
      <ResizablePanel defaultSize={50}>
        {/* <div className="flex h-[200px] items-center justify-center border-2 border-orange-500"> */}
        <Card>
          <CardHeader>
            <p className="mt-2 text-base font-semibold">
              user: {quizScore.user}
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
              score: {quizScore.score} puan
            </p>
          </CardHeader>
        </Card>
        {/* </div> */}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={30}>
            {/* <div className="h-full w-full flex items-center justify-center  border-2 border-red-500 "> */}
            <Card>
              <CardHeader>
                {/* <CardHeader>
                <span className="font-semibold">score=</span>
              </CardHeader> */}
                <CardContent>
                  <div className="flex justify-center items-center">
                    <span className="font-semibold">status=</span>
                    <Badge>{quizScore.status}</Badge>
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            {/* </div> */}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full w-full items-center justify-center">
              {/* <Card>
                <CardHeader>
                  <CardContent> */}
                    <Image
                      alt={imageUrl}
                      src={imageUrl}
                      width={500}
                      height={500}
                      style={{ objectFit: "cover" }}
                    />
                  {/* </CardContent>
                </CardHeader>
              </Card> */}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default PanelGroup;
