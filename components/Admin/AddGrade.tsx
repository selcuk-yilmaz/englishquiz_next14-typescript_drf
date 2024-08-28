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
import { fetchAllSubjects, postCreateGrade, postCreateQuestion } from "@/actions/quizActions";
import { AllSubjects } from "@/types/quizTypes";

const formSchema = z.object({
  level: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Please provide a valid number." })
  ),
});

export function AddGrade() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: 1,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submission data", data);

    try {
      const formData = new FormData();
      formData.append("level", data.level.toString());
      // Call the postCreateQuestion function with the populated FormData
      const createdGrade = await postCreateGrade(formData);

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
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add grade</FormLabel>
              <FormControl>
                <Input
                  placeholder="wanted unique grade "
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormDescription>
                Select the grade you want to add.
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

export default AddGrade;

