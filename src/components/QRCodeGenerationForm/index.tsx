"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const QRCodeGenerationForm = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const formHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/codes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target_url: targetUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create QR code");
        setIsLoading(false);
        return;
      }

      setTargetUrl("");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error creating QR code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetUrl(e.currentTarget.value);
    setError("");
  };

  return (
    <div className=" bg-gray-200 p-5 rounded-md max-w-[500px]">
      <form className="" onSubmit={formHandler}>
        <fieldset id="commentFS" className="mb-4">
          <legend className="font-bold uppercase">Generate QR Code</legend>
          <label className="p-1">
            <div className="mb-2">
              <p className="text-xsm">
                <span className="text-white bg-green-950 p-0.5 rounded-sm px-2">
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
              disabled={isLoading}
            />
          </label>
        </fieldset>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="mb-4">
          <p className="text-xsm">
            <span className="text-white bg-green-950 p-0.5 rounded-sm px-2 mr-1">
              2
            </span>
            Click to get your code
          </p>
        </div>
        <Button type="submit" className="w-full mx-auto" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create QR Code"}
        </Button>
      </form>
    </div>
  );
};
