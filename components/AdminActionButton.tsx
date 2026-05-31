"use client";

import { useTransition } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  tutorId: number;
  label: string;
  variant: "approve" | "reject";
};

export default function AdminActionButton({ action, tutorId, label, variant }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={(fd) => startTransition(() => action(fd))}>
      <input type="hidden" name="tutorId" value={tutorId} />
      <button
        type="submit"
        disabled={isPending}
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
          variant === "approve"
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        {isPending ? "…" : label}
      </button>
    </form>
  );
}
