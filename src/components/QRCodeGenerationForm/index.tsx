"use client";
import React, { useState } from "react";
import { Button } from "../Button";

export const QRCodeGenerationForm = () => {
  const [targetUrl, setTargetUrl] = useState("");

  const formHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setTargetUrl("");
    console.log("targetURL", targetUrl);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetUrl(e.currentTarget.value);
  };

  return (
    <div className=" bg-sea-green p-5 rounded-md max-w-[500px]">
      <form className="" onSubmit={formHandler}>
        <fieldset id="commentFS" className="mb-4">
          <legend className="font-bold uppercase">Generate QR Code</legend>
          <label className="p-1">
            <div className="mb-2">
              <p className="text-xsm">
                <span className="text-white bg-indigo-950 p-0.5 rounded-sm px-2">
                  1
                </span>{" "}
                Complete the content
              </p>
              <p className="text-xs">Enter your Website</p>
            </div>
            <input
              type="text"
              name="targetURL"
              value={targetUrl}
              onChange={onChangeHandler}
              className="bg-white p-2 rounded-lg ml-1s max-w-150 w-full mx-auto focus-within:bg-amber-100"
            />
          </label>
        </fieldset>
        <div className="mb-4">
          <p className="text-xsm">
            <span className="text-white bg-indigo-950 p-0.5 rounded-sm px-2 mr-1">
              2
            </span>
            Click to get your code
          </p>
        </div>
        <Button type="submit" className="max-w-60 w-full mx-auto">
          Create QR Code
        </Button>
      </form>
    </div>
  );
};
