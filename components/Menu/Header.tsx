"use client";

import React from "react";
import { Button } from "../ui/button";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const { currentUser } = useAuthContext();

  return (
    <div
      className="bg-mycolor-400 dark:bg-mycolor-100 border-b-2
    dark:border-b-mycolor-400/30 h-16 mx-auto flex justify-end pr-2 items-center"
    >
      <div className="justify-end items-center">
        {/* <Button variant="mybutton">Login</Button> */}
        {currentUser ? (
          <>
            {/* currentUser bir User objesi ise, username'i göster */}
            {typeof currentUser !== "boolean" && <p>{currentUser.username}</p>}
          </>
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
