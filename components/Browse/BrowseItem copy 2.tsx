import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="col-span-1 border-2 border-lime-500">
    <Card>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-xs"
        >
          <CarouselContent className="-mt-1 h-[200px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-2">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <CardHeader className="border-2 border-orange-500">
          <p className="mt-2 text-base font-semibold">
            lesson_name: {lesson_name}
          </p>
          <p className="mt-2 text-base font-semibold">konu: {title}</p>
          <p className="mt-2 text-base font-semibold">sınıf: {grade_level}</p>
          <p className="mt-2 text-base font-semibold">
            soru sayısı: {question_count}
          </p>
        </CardHeader>
        <CardContent>
          <span>konu</span>
          <Badge>{title}</Badge>
        </CardContent>
      </CardContent>
    </Card>
     </div>
  );
};

export default BrowseItem;
