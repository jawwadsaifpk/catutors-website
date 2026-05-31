"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function loginTutor(formData: FormData) {
  const email    = (formData.get("email")    as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) redirect("/tutor/login?error=missing-fields");

  const tutor = await db.tutor.findUnique({ where: { email } });
  if (!tutor) redirect("/tutor/login?error=invalid-credentials");
  if (!tutor.passwordHash) redirect(`/tutor/set-password?email=${encodeURIComponent(email)}`);

  const match = await bcrypt.compare(password, tutor.passwordHash);
  if (!match) redirect("/tutor/login?error=invalid-credentials");
  if (tutor.status !== "approved") redirect("/tutor/login?error=not-approved");

  const cookieStore = await cookies();
  cookieStore.set("tutor_session", String(tutor.id), { httpOnly: true, maxAge: 60 * 60 * 24 * 30, path: "/" });
  redirect("/tutor/dashboard");
}

export async function logoutTutor() {
  const cookieStore = await cookies();
  cookieStore.set("tutor_session", "", { maxAge: 0, path: "/" });
  redirect("/tutor/login");
}

export async function setTutorPassword(formData: FormData) {
  const email    = (formData.get("email")    as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();
  const confirm  = (formData.get("confirm")  as string)?.trim();

  if (!email || !password) redirect("/tutor/set-password?error=missing-fields");
  if (password.length < 6) redirect(`/tutor/set-password?email=${encodeURIComponent(email)}&error=too-short`);
  if (password !== confirm) redirect(`/tutor/set-password?email=${encodeURIComponent(email)}&error=mismatch`);

  const tutor = await db.tutor.findUnique({ where: { email } });
  if (!tutor) redirect("/tutor/set-password?error=not-found");

  const passwordHash = await bcrypt.hash(password, 10);
  await db.tutor.update({ where: { email }, data: { passwordHash } });

  if (tutor.status === "approved") {
    const cookieStore = await cookies();
    cookieStore.set("tutor_session", String(tutor.id), { httpOnly: true, maxAge: 60 * 60 * 24 * 30, path: "/" });
    redirect("/tutor/dashboard");
  }

  redirect("/tutor/login?success=password-set");
}
