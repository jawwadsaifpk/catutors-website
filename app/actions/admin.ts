"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function adminLogin(formData: FormData) {
  const password = (formData.get("password") as string)?.trim();
  if (password !== process.env.ADMIN_PASSWORD) redirect("/admin?error=wrong-password");

  const cookieStore = await cookies();
  cookieStore.set("admin_auth", "1", { httpOnly: true, maxAge: 60 * 60 * 24, path: "/" });
  redirect("/admin");
}

export async function approveTutor(formData: FormData) {
  const id = parseInt(formData.get("tutorId") as string);
  await db.tutor.update({ where: { id }, data: { status: "approved" } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectTutor(formData: FormData) {
  const id = parseInt(formData.get("tutorId") as string);
  await db.$transaction(async (tx) => {
    await tx.message.deleteMany({ where: { tutorId: id } });
    await tx.review.deleteMany({ where: { tutorId: id } });
    await tx.tutor.delete({ where: { id } });
  });
  revalidatePath("/admin");
}

export async function removeTutor(formData: FormData) {
  const id = parseInt(formData.get("tutorId") as string);
  await db.$transaction(async (tx) => {
    await tx.message.deleteMany({ where: { tutorId: id } });
    await tx.review.deleteMany({ where: { tutorId: id } });
    await tx.tutor.delete({ where: { id } });
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function approveReview(id: number) {
  const review = await db.review.findUnique({ where: { id } });
  await db.review.update({ where: { id }, data: { status: "approved" } });
  revalidatePath("/admin");
  if (review) revalidatePath(`/tutors/${review.tutorId}`);
}

export async function rejectReview(id: number) {
  await db.review.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function approveLead(id: number) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") redirect("/admin");
  await db.lead.update({ where: { id }, data: { status: "open" } });
  revalidatePath("/admin");
  revalidatePath("/jobs");
}

export async function expireLead(id: number) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") redirect("/admin");
  await db.lead.update({ where: { id }, data: { status: "filled" } });
  revalidatePath("/admin");
  revalidatePath("/jobs");
}

export async function deleteLead(id: number) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") redirect("/admin");
  await db.$transaction(async (tx) => {
    await tx.message.deleteMany({ where: { leadId: id } });
    await tx.lead.delete({ where: { id } });
  });
  revalidatePath("/admin");
  revalidatePath("/jobs");
}

export async function updateLead(formData: FormData) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") redirect("/admin");

  const leadId     = parseInt(formData.get("leadId")     as string);
  const subject    = (formData.get("subject")    as string)?.trim();
  const classLevel = (formData.get("classLevel") as string)?.trim();
  const area       = (formData.get("area")       as string)?.trim();
  const status     = (formData.get("status")     as string)?.trim();

  if (isNaN(leadId) || !subject || !classLevel || !area) redirect("/admin?tab=jobs&error=invalid-lead");

  await db.lead.update({ where: { id: leadId }, data: { subject, classLevel, area, status } });
  revalidatePath("/admin");
  revalidatePath("/jobs");
  redirect("/admin?tab=jobs");
}
