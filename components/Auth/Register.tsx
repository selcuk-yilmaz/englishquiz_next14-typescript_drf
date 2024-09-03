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
    first_name: z.string().min(1, { message: "First name is required." }),
    last_name: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    password2: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords must match.",
    path: ["password2"],
  });

const Register = () => {
  const { registerContext } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form configuration
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Form data submitted: ", data);
      registerContext(data);

      toast({
        title: "Register process!",
        description: "register created successfully",
      });
      form.reset();
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Register process",
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
        <Button variant="mybutton">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Dialog</DialogTitle>
          <DialogDescription>
            Please enter your profile information in the fields below. Click
            save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Username Field */}
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input {...form.register("username")} className="col-span-3" />
              </div> */}
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

              {/* First Name Field */}
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="first_name" className="text-right">
                  First Name
                </Label>
                <Input
                  {...form.register("first_name")}
                  className="col-span-3"
                />
              </div> */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="first Name" {...field} />
                    </FormControl>
                    <FormDescription>write the first name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="last_name" className="text-right">
                  Last Name
                </Label>
                <Input {...form.register("last_name")} className="col-span-3" />
              </div> */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="last name" {...field} />
                    </FormControl>
                    <FormDescription>write the last name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  {...form.register("email")}
                  className="col-span-3"
                  type="email"
                />
              </div> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email addres"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormDescription>write the email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    {...form.register("password")}
                    className="flex-1"
                    type={showPassword ? "text" : "password"}
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
              </div> */}

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

              {/* Confirm Password Field */}
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password2" className="text-right">
                  Confirm Password
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    {...form.register("password2")}
                    className="flex-1"
                    type={showPassword ? "text" : "password"}
                  />
                </div>
              </div> */}
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password2">Password Confirm</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          {...field}
                          placeholder="password confirm"
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
                      Must match the password above one.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogClose asChild>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
