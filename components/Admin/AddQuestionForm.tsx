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
import { Input } from "@/components/ui/input";
import { fetchAllSubjects, postCreateQuestion } from "@/actions/quizActions";
import { AllSubjects } from "@/types/quizTypes";

const formSchema = z.object({
  subject: z.string({
    required_error: "Please select a subject to display.",
  }),
  image: z.string().min(2, {
    message: "Please select your file.",
  }),
  number_of_options: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Please provide a valid number." })
  ),
  correct: z.string().min(1, { message: "Please select the correct answer." }),
  difficulty: z
    .string()
    .min(1, { message: "Please select a difficulty level." }),
});

export function AddQuestionForm() {
  const [subjects, setSubjects] = useState<{ title: string; id: number }[]>([]);

  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const correctOptions = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const data: AllSubjects[] = await fetchAllSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }

    fetchSubjects();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      image: "",
      number_of_options: 4,
      correct: "",
      difficulty: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submission data", data);

    try {
      const formData = new FormData();
      formData.append("subject", data.subject);
      formData.append("difficulty", data.difficulty);
      formData.append("correct", data.correct);
      formData.append("number_of_options", data.number_of_options.toString());

      // Append file
      const fileInput = (
        document.querySelector('input[name="image"]') as HTMLInputElement
      )?.files?.[0];
      if (fileInput) {
        formData.append("image", fileInput);
      }

      // Call the postCreateQuestion function with the populated FormData
      const createdQuestion = await postCreateQuestion(formData);

      toast({
        title: "Question created successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(createdQuestion, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error creating question:", error);
      toast({
        title: "Failed to create question",
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
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
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
                  {subjects?.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.title}
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screen Shot</FormLabel>
              <FormControl>
                <Input
                  placeholder="Screen Shot"
                  {...form.register("image")}
                  {...field}
                  type="file"
                />
              </FormControl>
              <FormDescription>
                This is your question image file.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number_of_options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Options</FormLabel>
              <FormControl>
                <Input
                  placeholder="Number of options"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormDescription>
                This is the number of options for the question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="correct"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the correct answer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {correctOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddQuestionForm;
