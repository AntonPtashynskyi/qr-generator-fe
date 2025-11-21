import React from "react";

export interface IButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...rest }) => {
  return (
    <button
      className={`p-2 bg-button-green rounded-sm text-white text-sm font-semibold cursor-pointer hover:bg-button-hover active:bg-button-active transition-all ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const MenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...rest }) => {
  return (
    <button className={`w-full p-3 text-black cursor-pointer hover:bg-black/10 transition-all ${className}`} {...rest}>
      {children}
    </button>
  );
};