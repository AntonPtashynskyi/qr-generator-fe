"use client";
import React, { ReactElement, useState } from "react";

interface BlockSwitcherProps {
  children: [ReactElement, ReactElement];
}

export const BlockSwitcher = ({ children }: BlockSwitcherProps) => {
  const [login, registration] = children;
  const [mode, setMode] = useState<"login" | "register">("login");
  const isLogin = mode === "login" ? true : false;

  return (
    <div className="">
      <div className="relative w-[95%] md:w-[400px] mx-auto pt-6">
        <button
          className={`cursor-pointer relative top-0.5 rounded-t-md  text-[12px] px-2 border-0 mr-1.5 ${
            isLogin ? "bg-[white]" : "bg-white/50"
          }`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`cursor-pointer relative top-0.5 rounded-t-md text-[12px] px-2 border-0 ${
            isLogin ? "bg-white/50 " : "bg-[white]"
          }`}
          onClick={() => setMode("register")}
        >
          Registration
        </button>
        {mode === "login" ? login : registration}
      </div>
    </div>
  );
};