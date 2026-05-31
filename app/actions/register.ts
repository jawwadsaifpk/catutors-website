"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ALL_SUBJECTS } from "@/lib/subjects";

const VALID_CLASS_LEVELS = [
  "Elementary (K–5)", "Middle School (6–8)", "High School (9–12)",
  "AP / IB", "SAT / ACT Prep", "College / University",
];

export async function registerTutor(formData: FormData) {
  const name  = (formData.get("name")  as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const city  = (formData.get("city")  as string)?.trim() || "Los Angeles";
  const bio   = (formData.get("bio")   as string)?.trim();

  const subjects = (formData.getAll("subjects") as string[]).filter((s) => ALL_SUBJECTS.includes(s));

  const area1 = (formData.get("area1") as string)?.trim();
  const area2 = (formData.get("area2") as string)?.trim();
  const area3 = (formData.get("area3") as string)?.trim();
  const areas = [area1, area2, area3].filter(Boolean) as string[];

  const gender        = (formData.get("gender")        as string)?.trim() || null;
  const teachingMode  = (formData.get("teachingMode")  as string)?.trim() || null;
  const availability  = (formData.get("availability")  as string)?.trim() || null;
  const qualification = (formData.get("qualification") as string)?.trim() || null;
  const experience    = (formData.get("experience")    as string)?.trim() || null;
  const classLevels   = (formData.getAll("classLevels") as string[]).filter((c) => VALID_CLASS_LEVELS.includes(c));

  const password        = (formData.get("password")        as string)?.trim() || null;
  const confirmPassword = (formData.get("confirmPassword") as string)?.trim() || null;

  if (!name || !phone || !email || !bio || subjects.length === 0 || areas.length === 0) {
    redirect("/register?error=missing-fields");
  }

  if (password && password.length < 6) redirect("/register?error=password-too-short");
  if (password && password !== confirmPassword) redirect("/register?error=password-mismatch");

  const existing = await db.tutor.findUnique({ where: { email } });
  if (existing) redirect("/register?error=duplicate-email");

  const passwordHash = password ? await bcrypt.hash(password, 10) : null;

  await db.tutor.create({
    data: {
      name, phone, email, city, bio, subjects, areas, status: "pending",
      gender, teachingMode, availability, qualification, experience,
      classLevels: classLevels.length > 0 ? classLevels : [],
      passwordHash,
    },
  });

  redirect("/register?success=1");
}
