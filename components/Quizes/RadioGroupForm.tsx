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
import { useState } from "react";

const FormSchema = z.object({
  selectedOption: z.enum(["A", "B", "C", "D"], {
    required_error: "Please select an option",
  }),
});

interface RadioGroupFormProps {
  onSubmitAnswer: (data: { selectedOption: string }) => void;
}

export function RadioGroupForm({ onSubmitAnswer }: RadioGroupFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

// console.log("selectedOption", selectedOption);
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
                  onValueChange={(value) => {
                    field.onChange(value); // react-hook-form'dan gelen field onChange fonksiyonu
                    // setSelectedOption(value); // Seçilen opsiyonu güncelle
                  }}
                  className="flex items-center space-x-12"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="A" />
                    <Label htmlFor="A">A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id="B" />
                    <Label htmlFor="B">B</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="C" />
                    <Label htmlFor="C">C</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D" id="D" />
                    <Label htmlFor="D">D</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Submit
        </Button>
        {/* <Button className={selectedOption ? "bg-green-500" : ""} type="submit">
          Submit
        </Button> */}
      </form>
    </Form>
  );
}

export default RadioGroupForm;
