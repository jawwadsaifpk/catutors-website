"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function submitRequest(formData: FormData) {
  const studentName  = (formData.get("studentName")  as string)?.trim();
  const studentPhone = (formData.get("studentPhone") as string)?.trim();
  const subject      = (formData.get("subject")      as string)?.trim();
  const classLevel   = (formData.get("classLevel")   as string)?.trim();
  const area         = (formData.get("area")         as string)?.trim();
  const city         = (formData.get("city")         as string)?.trim() || null;
  const mode         = (formData.get("mode")         as string)?.trim() || null;
  const gender       = (formData.get("gender")       as string)?.trim() || null;
  const budget       = (formData.get("budget")       as string)?.trim() || null;
  const notes        = (formData.get("notes")        as string)?.trim() || null;

  if (!studentName || !studentPhone || !subject || !classLevel || !area) {
    redirect("/request?error=missing-fields");
  }

  await db.lead.create({
    data: {
      studentName,
      studentPhone,
      subject,
      classLevel,
      area,
      city: city || "",
      mode,
      gender,
      budget,
      notes,
      status: "pending",
    },
  });

  revalidatePath("/jobs");
  redirect("/request?success=1");
}
