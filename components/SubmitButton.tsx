"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
};

export function SubmitButton({ children, loadingText = "Please wait…", className = "", disabled = false }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending || disabled}
      className={`${className} ${pending ? "opacity-70 cursor-not-allowed" : ""}`}>
      {pending ? loadingText : children}
    </button>
  );
}
