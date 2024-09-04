"use client";

import { User } from "@/types/quizTypes";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | boolean;
  registerContext: (formData: any) => Promise<User | undefined>;
  loginContext: (formData: any) => Promise<User | undefined>;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>; // logout fonksiyonunun tipi eklendi
}

const url = "http://localhost:8000/";

export const AuthContextProv = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | boolean>(false);
  const [myToken, setMyToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(
        sessionStorage.getItem("currentUser") || "false"
      );
      setCurrentUser(storedUser);

      const storedToken = sessionStorage.getItem("token");
      setMyToken(storedToken ? window.atob(storedToken) : null);
    }
  }, []);

  const registerContext = async (formData: any): Promise<User | undefined> => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}users/auth/register/`, formData);
      if (res.data.token) {
        const token = res.data.token;
        const userData: User = { ...res.data, token: "" };

        setCurrentUser(userData);
        setMyToken(token);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("currentUser", JSON.stringify(userData));
          sessionStorage.setItem("token", window.btoa(token));
        }

        setError(null);

        return userData;
      }
    } catch (error) {
      console.log(error);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  const loginContext = async (formData: any): Promise<User | undefined> => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}users/auth/login/`, formData);
      if (res.data.key) {
        setMyToken(res.data.key);
        setCurrentUser(res.data.user);
        sessionStorage.setItem("currentUser", JSON.stringify(res.data.user));
        const token = window.btoa(res.data.key);
        sessionStorage.setItem("token", token);
      }
    } catch (error) {
      console.log(error);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  const logout = async (): Promise<void> => {
    try {
      const config = {
        method: "post",
        url: `${url}users/auth/logout/`,
        headers: {
          Authorization: `Token ${myToken}`,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        setCurrentUser(false);
        setMyToken("");
        sessionStorage.clear();
        toast({
          title: "Log out!",
          description: "User log out successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Log out!",
        description: error.message,
      });
    }
  };

  const value: AuthContextType = {
    currentUser,
    registerContext,
    loginContext,
    loading,
    error,
    logout,
  };

  return (
    <AuthContextProv.Provider value={value}>
      {children}
    </AuthContextProv.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContextProv);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
