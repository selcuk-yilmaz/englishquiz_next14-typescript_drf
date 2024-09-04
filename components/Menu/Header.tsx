"use client";

import React from "react";
import { Button } from "../ui/button";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-mycolor-400 dark:bg-mycolor-100 border-b-2 dark:border-b-mycolor-400/30 h-16 mx-auto flex justify-end pr-2 items-center">
      <div className="justify-end items-center">
        {currentUser ? (
          <div className="flex items-center gap-2">
            {typeof currentUser !== "boolean" && <p>{currentUser.username}</p>}
            <Button variant="mybutton" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Login />
            <Register />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
