"use client";

import { User } from "@/types/quizTypes";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  currentUser: User | boolean;
  registerContext: (formData: any) => Promise<void>;
  loading: boolean;
  error: string | null;
  // Add any other properties your context should provide
}


const url = "http://localhost:8000/";

export const AuthContextProv = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | boolean>(
    JSON.parse(sessionStorage.getItem("currentUser") || "false")
  );
  const token = sessionStorage.getItem("token");
  const [myToken, setMyToken] = useState<string | null>(
    token ? window.atob(token) : null
  );

  // Add missing state variables
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const registerContext = async (formData: any) => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}auth/register/`, formData);
      if (res.data.token) {
        setMyToken(res.data.token);
        const userData = { ...res.data, token: "" };
        setCurrentUser(userData);
        sessionStorage.setItem("currentUser", JSON.stringify(userData));
        const token = window.btoa(res.data.token);
        sessionStorage.setItem("token", token);
      }
      setError(null); // Reset error on successful registration
    } catch (error) {
      console.log(error);
      setError("Registration failed"); // Set error state
    } finally {
      setLoading(false); // Stop loading when request is complete
    }
  };

  const value: AuthContextType = {
    currentUser,
    registerContext,
    loading,
    error,
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
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
