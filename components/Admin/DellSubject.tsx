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
import {
  deleteGrade,
  deleteLesson,
  deleteSubject,
  fetchAllSubjects,
  fetchGrades,
  fetchLessons,
} from "@/actions/quizActions";
import { AllSubjects, Grade, Lessons } from "@/types/quizTypes";

const formSchema = z.object({
  title: z.string({
    required_error: "Please select a lesson to delete.",
  }),
});

export function DellSubject() {
  // Silinecek sınıfları tutan state
  const [subj, setSubj] = useState<{ title: string; id: number }[]>([]);

  // Kullanılabilir sınıfları yükleyen useEffect
  useEffect(() => {
    async function SubjectsForDell() {
      try {
        const data: AllSubjects[] = await fetchAllSubjects();
        setSubj(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }

    SubjectsForDell();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // Form gönderme işlevi
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submission data", data);

    try {
      const dellSubjId = subj.find((item) => item.title === data.title)?.id;
      if (dellSubjId) {
        await deleteSubject(dellSubjId); // DellGrade fonksiyonunu burada çağırdık

        toast({
          title: "Grade deleted successfully!",
          description: "The selected grade has been deleted.",
        });

        // Sınıfları yeniden yükleyin
        const updatedSubjects = await fetchAllSubjects();
        setSubj(updatedSubjects);
      } else {
        toast({
          title: "Lessons not found",
          description: "The selected lesson could not be found.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delete Subject</FormLabel>
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
                  {subj?.map((sub) => (
                    <SelectItem key={sub.id} value={sub.title}>
                      {sub.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                You can manage lessons in your.{" "}
                <Link href="/lessons/">Browse Grades</Link>.
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

export default DellSubject;
