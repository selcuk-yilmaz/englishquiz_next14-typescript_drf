"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";
// import { createUser } from "@/actions/authActions";
import { useAuthContext } from "@/context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { registerContext } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü durumu

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(formData);
      registerContext(formData);

      // Formu temizle
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: ""
      });
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
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
