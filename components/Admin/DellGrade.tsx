"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { deleteGrade, fetchGrades } from "@/actions/quizActions";
import { Grade } from "@/types/quizTypes";

const formSchema = z.object({
  level: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Please provide a valid number." })
  ),
});

export function DellGrade() {
  // Silinecek sınıfları tutan state
  const [grades, setGrades] = useState<{ level: number; id: number }[]>([]);

  // Kullanılabilir sınıfları yükleyen useEffect
  useEffect(() => {
    async function GradesForDell() {
      try {
        const data: Grade[] = await fetchGrades();
        setGrades(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }

    GradesForDell();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: 0,
    },
  });

  // Form gönderme işlevi
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submission data", data);

    try {
      const gradeId = grades.find((grade) => grade.level === data.level)?.id;
      if (gradeId) {
        await deleteGrade(gradeId); // DellGrade fonksiyonunu burada çağırdık

        toast({
          title: "Grade deleted successfully!",
          description: "The selected grade has been deleted.",
        });

        // Sınıfları yeniden yükleyin
        const updatedGrades = await fetchGrades();
        setGrades(updatedGrades);
      } else {
        toast({
          title: "Grade not found",
          description: "The selected grade could not be found.",
        });
      }
    } catch (error) {
      console.error("Error deleting grade:", error);
      toast({
        title: "Failed to delete grade",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delete Grades</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val)}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {grades?.map((grade) => (
                    <SelectItem key={grade.id} value={grade.level.toString()}>
                      {grade.level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                You can manage grades in your.{" "}
                <Link href="/grade/">Browse Grades</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="destructive" type="submit">
          Delete
        </Button>
      </form>
    </Form>
  );
}

export default DellGrade;
