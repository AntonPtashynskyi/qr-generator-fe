import React from "react";

interface ILoginForm {
  title: string;
}

export const LoginForm = ({ title }: ILoginForm) => {
  async function createInvoice(formData: FormData) {
    "use server";
    const { email, password } = Object.fromEntries(formData);
    console.log("FormData", { email, password });

    // mutate data
    // revalidate the cache
  }

  return (
    <form
      action={createInvoice}
      className="flex flex-col gap-3 pt-10 pb-4 px-4 rounded-b-md rounded-tr-md shadow-black/50 bg-[white]"
    >
      <p className="text-center">{title}</p>
      <label className="relative">
        <input
          className="peer border border-button-active bg-white text-[14px] p-2 focus:shadow-md rounded-md w-full focus:border-green-600 focus:outline-green-900/50"
          type="email"
          name="email"
          placeholder=""
        />
        <p className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-black/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:bg-white peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-[10px]">
          Username
        </p>
      </label>
      <label className="relative">
        <input
          className="peer border border-button-active bg-white text-[14px] p-2 focus:shadow-md rounded-md w-full focus:border-green-600 focus:outline-green-900/50"
          type="password"
          name="password"
          placeholder=""
        />
        <p className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-black/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:bg-white peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-[10px]">
          Password
        </p>
      </label>
      <button
        type="submit"
        className="bg-button-green hover:bg-button-hover hover:shadow-cyan-500/50; hover:shadow-lg focus:border-green-600 focus:outline-green-900/50 transition-all duration-200 text-white font-semibold rounded-md text-xs py-3 cursor-pointer"
      >
        Send
      </button>
    </form>
  );
};
