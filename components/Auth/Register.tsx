"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü durumu

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch(
        "http://localhost:8000/users/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const token = data.token; // Token'ı JSON verisinden al
        if (token) {
          localStorage.setItem("token", token);
          toast({
            title: "User registered",
            description: "User registered successfully and token stored",
          });
        } else {
          toast({
            title: "Failed to Token",
            description: "Token is missing in the response.",
          });
        }

        // Formu temizle
        setFormData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password2: "",
        });
      } else {
        console.log("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                type="email"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1"
                  type={showPassword ? "text" : "password"} // Şifre gösterme/gizleme durumu
                />
                <Button
                  type="button"
                  variant="outline"
                  className="ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"} {/* Toggle düğmesi */}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password2" className="text-right">
                Password
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="flex-1"
                  type={showPassword ? "text" : "password"} // Şifre gösterme/gizleme durumu
                />
                <Button
                  type="button"
                  variant="outline"
                  className="ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"} {/* Toggle düğmesi */}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
