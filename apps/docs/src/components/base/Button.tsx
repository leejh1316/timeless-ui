import React from "react";

// 버튼의 기본 스타일과 종류별 스타일을 정의합니다.
const variants = {
  default: "bg-gray-200 border-gray-300 hover:bg-gray-300 text-gray-800",
  primary: "bg-blue-500 text-white font-semibold hover:bg-blue-600",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary";
}
const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
  return (
    <button className={`cursor-pointer rounded-md px-5 py-2 text-sm transition-colors ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
