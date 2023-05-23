import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  searchClick?: () => void;
  passwordEyeClick?: () => void;
  sizeInput?: "sm" | "md" | "lg";
  placeholder?: string;
  name?: string;
  label?: string;
  errorText?: string;
  error?: boolean;
  type?: string;
  variant?: "search" | "email" | 'phone' | 'password';
  value: string | number;
}

export type { InputProps };
