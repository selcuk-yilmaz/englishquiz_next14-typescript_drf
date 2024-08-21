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
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
interface BrowseItemProps {
  id: number;
  lesson_name: string;
  grade_level: number;
  title: string;
  question_count: number;
}

const BrowseItem = ({
  id,
  lesson_name,
  grade_level,
  title,
  question_count,
}: BrowseItemProps) => {
  return (
    <div className="col-span-1">
      <Card className="">
        <CardHeader className="">
          <p className="mt-2 text-base font-semibold">SUBJECT: {title}</p>
          <p className="mt-2 text-base font-semibold">
            QUESTİON COUNT: {question_count}
          </p>
        </CardHeader>
        <CardContent>
          <ToggleGroup type="single">
            <Link href={`/quizes/${title}/10`}>
              <ToggleGroupItem value="a">TEST-1</ToggleGroupItem>
            </Link>
            <Link href={`/quizes/${title}/20`}>
              <ToggleGroupItem value="b">TEST-2</ToggleGroupItem>
            </Link>
            <Link href={`/quizes/${title}/30`}>
              <ToggleGroupItem value="c">TEST-3</ToggleGroupItem>
            </Link>
          </ToggleGroup>
        </CardContent>
        {/* <CardContent>
          <span>konu</span>
          <Badge>{title}</Badge>
        </CardContent> */}
      </Card>
    </div>
  );
};

export default BrowseItem;
