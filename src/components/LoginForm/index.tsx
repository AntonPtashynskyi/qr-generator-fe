'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ILoginForm {
  title: string;
  mode: 'login' | 'register';
}

export const LoginForm = ({ title, mode }: ILoginForm) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError("Please provide email and password");
      setLoading(false);
      return;
    }

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
        setLoading(false);
        return;
      }

      // Redirect to dashboard on success
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 pt-10 pb-4 px-4 rounded-b-md rounded-tr-md shadow-black/50 bg-[white]"
    >
      <p className="text-center">{title}</p>
      {error && (
        <div className="text-red-600 text-xs text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      <label className="relative">
        <input
          className="peer border border-button-active bg-white text-[14px] p-2 focus:shadow-md rounded-md w-full focus:border-green-600 focus:outline-green-900/50"
          type="email"
          name="email"
          placeholder=""
          disabled={loading}
        />
        <p className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-black/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:bg-white peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-[10px]">
          Email
        </p>
      </label>
      <label className="relative">
        <input
          className="peer border border-button-active bg-white text-[14px] p-2 focus:shadow-md rounded-md w-full focus:border-green-600 focus:outline-green-900/50"
          type="password"
          name="password"
          placeholder=""
          disabled={loading}
        />
        <p className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-black/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:bg-white peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-[10px]">
          Password
        </p>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="bg-button-green hover:bg-button-hover hover:shadow-cyan-500/50 hover:shadow-lg focus:border-green-600 focus:outline-green-900/50 transition-all duration-200 text-white font-semibold rounded-md text-xs py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Send'}
      </button>
    </form>
  );
};
