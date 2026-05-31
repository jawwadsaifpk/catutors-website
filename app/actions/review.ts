"use server";

import { db } from "@/lib/db";

type ReviewState = { success?: boolean; error?: string } | null;

export async function submitReview(prevState: ReviewState, formData: FormData): Promise<ReviewState> {
  const tutorId      = parseInt(formData.get("tutorId")      as string);
  const rating       = parseInt(formData.get("rating")       as string);
  const reviewText   = (formData.get("reviewText")   as string)?.trim();
  const reviewerName = (formData.get("reviewerName") as string)?.trim();
  const classLevel   = (formData.get("classLevel")   as string)?.trim() || null;

  if (!tutorId || !rating || rating < 1 || rating > 5 || !reviewText || !reviewerName) {
    return { error: "missing-fields" };
  }

  const tutor = await db.tutor.findUnique({ where: { id: tutorId } });
  if (!tutor || tutor.status !== "approved") return { error: "invalid-tutor" };

  await db.review.create({
    data: { tutorId, rating, reviewText, reviewerName, classLevel, status: "pending" },
  });

  return { success: true };
}
