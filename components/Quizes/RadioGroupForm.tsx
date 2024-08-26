"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import React from "react";

const FormSchema = z.object({
  selectedOption: z.enum(["A", "B", "C", "D", "E"], {
    required_error: "Please select an option",
  }),
});

interface RadioGroupFormProps {
  onSubmitAnswer: (data: { selectedOption: string }) => void;
  number_of_options: number;
}

export function RadioGroupForm({
  onSubmitAnswer,
  number_of_options,
}: RadioGroupFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSubmitAnswer(data);
    toast({
      title: "Answer Submitted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const options = ["A", "B", "C", "D", "E"].slice(0, number_of_options);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="selectedOption"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select the correct answer</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value)}
                  className="flex items-center space-x-12"
                >
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default RadioGroupForm;
