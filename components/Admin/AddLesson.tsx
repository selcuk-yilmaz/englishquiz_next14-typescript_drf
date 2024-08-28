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
import {
  fetchAllSubjects,
  postCreateGrade,
  postCreateLesson,
  postCreateQuestion,
} from "@/actions/quizActions";
import { AllSubjects } from "@/types/quizTypes";

const formSchema = z.object({
  name: z.string({
    required_error: "Please write lesson name correctly.",
  }),
});

export function AddLesson() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submission data", data);

    try {
      const formData = new FormData();
      formData.append("name", data.name.toString());
      // Call the postCreateQuestion function with the populated FormData
      const createdGrade = await postCreateLesson(formData);

      toast({
        title: "Question created successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(createdGrade, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error creating question:", error);
      toast({
        title: "Failed to create lesson",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Lesson</FormLabel>
              <FormControl>
                <Input placeholder="wanted unique lesson name" {...field} />
              </FormControl>
              <FormDescription>
                write the lesson name you want to add.
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

export default AddLesson;
