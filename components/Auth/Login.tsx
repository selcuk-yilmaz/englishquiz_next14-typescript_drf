"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

// Zod validation schema
const formSchema = z
  .object({
    username: z.string().min(2, { message: "Username is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })


const Register = () => {
  const { loginContext } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form configuration
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Form data submitted: ", data);
      loginContext(data);

      toast({
        title: "Login process!",
        description: "Login created successfully",
      });
      form.reset();
    } catch (error) {
      console.error("Error during Login:", error);
      toast({
        title: "Login process",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      });
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="mybutton">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Dialog</DialogTitle>
          <DialogDescription>
            Please enter your profile information in the fields below. Click
            save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Username Field */}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="wanted Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      write the Username you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          {...field}
                          placeholder="password"
                          type={showPassword ? "text" : "password"}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="ml-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Password must be at least 6 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogClose asChild>
              <DialogFooter>
                <Button type="submit">Login</Button>
              </DialogFooter>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
