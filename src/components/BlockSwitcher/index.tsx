"use client";
import React, { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BlockSwitcherProps {
  children: [ReactElement, ReactElement];
}

export const BlockSwitcher = ({ children }: BlockSwitcherProps) => {
  const [login, registration] = children;
  const [mode, setMode] = useState<"login" | "register">("login");
  const isLogin = mode === "login" ? true : false;

  return (
    <Card className="md:w-100 pt-6 mt-7 mx-3 md:mx-auto">
      <div className="px-4 mx-a flex gap-1 justify-center flex-wrap">
        <Button
          className={` ${isLogin ? "bg-[black]" : "bg-black/50"}`}
          onClick={() => setMode("login")}
        >
          Login
        </Button>
        <Button
          className={` ${isLogin ? "bg-black/50 " : "bg-[black]"}`}
          onClick={() => setMode("register")}
        >
          Registration
        </Button>
      </div>
      {mode === "login" ? login : registration}
    </Card>
  );
};
