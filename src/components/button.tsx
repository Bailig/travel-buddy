import type React from "react";
import type { FC } from "react";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = (props) => {
  const { className = "", children, ...others } = props;
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 duration-200 active:scale-95 disabled:scale-100 disabled:opacity-40 ${className}`}
      type="button"
      {...others}
    >
      {children}
    </button>
  );
};
