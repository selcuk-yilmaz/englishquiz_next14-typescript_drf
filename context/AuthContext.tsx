"use client";

import axios from "axios";
import React, { createContext, useState } from "react";
interface AuthContextType {
  // quizzes: Questions[];
  // setQuizzes: React.Dispatch<React.SetStateAction<Questions[]>>;
  loading: boolean;
  error: string | null;
  studentResponses: StudentResType[];
  setStudentResponses: React.Dispatch<React.SetStateAction<StudentResType[]>>;
  handleSubmitPost: () => Promise<void>;
  quizScore: ResultOfQuiz; // this is a single object
  setQuizScore: React.Dispatch<React.SetStateAction<ResultOfQuiz>>;
  solvedTenQue: QuizResponse["results"];
  setSolvedTenQue: React.Dispatch<
    React.SetStateAction<QuizResponse["results"]>
  >;
}
// const url = 'https://fatihg.pythonanywhere.com/';
// const url = 'http://127.0.0.1:8000/';
const url = "http://localhost:8000/";

export const AuthContextProv = createContext<AuthContextType | undefined>(undefined);


const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser")) || false
  );
  const token = sessionStorage.getItem("token");
  const [myToken, setMyToken] = useState(token && window.atob(token));

  const createUser = async (userInfo, navigate) => {
    try {
      const res = await axios.post(`${url}auth/register/`, userInfo);
      if (res.data.token) {
        setMyToken(res.data.token);
        const userData = { ...res.data, token: "" };
        setCurrentUser({ ...res.data, token: "" });
        sessionStorage.setItem("currentUser", JSON.stringify(userData));
        const token = window.btoa(res.data.token);
        sessionStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (userLoginInfo, navigate) => {
    try {
      const res = await axios.post(`${url}auth/login/`, userLoginInfo);
      if (res.data.key) {
        setMyToken(res.data.key);
        setCurrentUser(res.data.user);
        sessionStorage.setItem("currentUser", JSON.stringify(res.data.user));
        const token = window.btoa(res.data.key);
        sessionStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (updateInfo, id, navigate) => {
    const config = {
      method: "put",
      url: `${url}auth/update-profile/${id}`,
      headers: {
        Authorization: `Token ${myToken}`,
        "Content-Type": "application/json",
        Cookie:
          "csrftoken=hg8jtk9cKr6iaVG9AY6j7ynqx0s18Ulx; sessionid=crcnox2a76sf9d54b1bga52ksj7yxpwt",
      },
      data: updateInfo,
    };
    try {
      const res = await axios(config);
      setCurrentUser(res.data);
      sessionStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (navigate) => {
    try {
      const config = {
        method: "post",
        url: `${url}auth/logout/`,
        headers: {
          Authorization: `Token ${myToken}`,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        setCurrentUser(false);
        setMyToken("");
        sessionStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    createUser,
    signIn,
    currentUser,
    logout,
    updateUser,
  };
  return (
    <AuthContextProv.Provider value={value}>
      {children}
    </AuthContextProv.Provider>
  );
};

export default AuthContext;
