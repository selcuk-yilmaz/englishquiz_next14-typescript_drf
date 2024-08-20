import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";

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
  return (
    <div className="col-span-1">
      {/* <Link href={"/"}> */}
        <Card>
          {/* <CardHeader className="relative w-full h-[500px]"></CardHeader> */}
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
          </CardContent>
        </Card>
      {/* </Link> */}
    </div>
  );
};

export default QuizesPageItem;
