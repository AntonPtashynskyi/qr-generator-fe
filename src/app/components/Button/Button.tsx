import React, { ButtonHTMLAttributes } from "react";

// interface IButton extends HTMLElement {
// }

const Button = ({children }: ButtonHTMLAttributes<HTMLElement> ) => {
  return (
    <button className="p-3 bg-spicy-paprika rounded-sm text-white font-semibold cursor-pointer hover:bg-button-hover active:bg-button-active transition-all">
      {children}
    </button>
  );
};

export default Button;
