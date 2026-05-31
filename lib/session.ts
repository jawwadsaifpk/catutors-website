import { cookies } from "next/headers";
import { db } from "./db";

// Returns the logged-in tutor, or null if not logged in / not approved.
export async function getTutorSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("tutor_session")?.value;
  if (!raw) return null;
  const id = parseInt(raw);
  if (isNaN(id)) return null;
  const tutor = await db.tutor.findUnique({ where: { id } });
  if (!tutor || tutor.status !== "approved") return null;
  return tutor;
}
