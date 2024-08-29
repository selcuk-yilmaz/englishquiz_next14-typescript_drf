"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { fetchGrades, fetchLessons, postCreateSubject } from "@/actions/quizActions";
import { useEffect, useState } from "react";
import { Grade, Lessons } from "@/types/quizTypes";

const formSchema = z.object({
  lesson_id: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Please provide a valid number." })
  ),
  grade_id: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Please provide a valid number." })
  ),
  title: z.string({
    required_error: "Please select lesson name for create subject.",
  }),
});

export function AddSubject() {
  const [lesson, setLesson] = useState<{ name: string; id: number }[]>([]);
  const [grade, setGrade] = useState<{ level: number; id: number }[]>([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const dataLes: Lessons[] = await fetchLessons();
        const dataGrad: Grade[] = await fetchGrades();
        setLesson(dataLes);
        setGrade(dataGrad);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    }

    fetchSubjects();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lesson_id: 0,
      grade_id: 0,
      title: "",
    },
  });

async function onSubmit(data: z.infer<typeof formSchema>) {
  console.log("Form submission data", data);

  try {
    const formData = new FormData();
    formData.append("lesson", data.lesson_id.toString()); // Match 'lesson' field
    formData.append("grade", data.grade_id.toString()); // Match 'grade' field
    formData.append("title", data.title.toString());

    // Convert FormData entries to an array to use a simple forEach or for...of loop
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(key, value);
    });

    const createdSubject = await postCreateSubject(formData);
    toast({
      title: "Subject created successfully!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(createdSubject, null, 2)}
          </code>
        </pre>
      ),
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    toast({
      title: "Failed to create subject",
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
          name="lesson_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Subject</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val)}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lesson?.map((less) => (
                    <SelectItem key={less.id} value={less.id.toString()}>
                      {less.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                You can manage subjects in your{" "}
                <Link href="/browse/2">Browse subjects</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Grades</FormLabel>
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
                  {grade?.map((grad) => (
                    <SelectItem key={grad.id} value={grad.id.toString()}>
                      {grad.level}
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

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Subject</FormLabel>
              <FormControl>
                <Input placeholder="wanted unique subject name" {...field} />
              </FormControl>
              <FormDescription>
                write the subject name you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddSubject;
