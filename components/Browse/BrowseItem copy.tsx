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

interface BrowseItemProps {
  title: string;
  grade: number;
  image: string;
  difficulty: string;
  correct: string;
  number_of_options: string;
}

const BrowseItem = ({
  title,
  grade,
  image,
  difficulty,
  correct,
  number_of_options,
}: BrowseItemProps) => {
  return (
    <div className="col-span-1">
      <Link href={`/quizes/${title}`}>
        <Card>
          {/* <CardHeader className="relative w-full h-[500px]"></CardHeader> */}
          <CardHeader>
            {/* <Image
              alt={title}
              src={image}
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
            /> */}
            <p className="mt-2 text-base font-semibold">{title}</p>
          </CardHeader>
          <CardContent>
            <Badge>{title}</Badge>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default BrowseItem;
