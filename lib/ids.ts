// Human-readable IDs for display (e.g. tutor dashboard, admin panel)
export function tutorCode(id: number): string {
  return `CT-${String(id).padStart(4, "0")}`;
}
