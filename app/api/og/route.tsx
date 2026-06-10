import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  // Article OG image
  if (title) {
    const truncatedTitle = title.length > 80 ? title.slice(0, 77) + "…" : title;
    const truncatedDesc = description
      ? description.length > 120 ? description.slice(0, 117) + "…" : description
      : null;

    return new ImageResponse(
      (
        <div style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif", padding: "72px 80px",
        }}>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 22, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            catutors.com · California Education News
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: "white", lineHeight: 1.2 }}>
              {truncatedTitle}
            </div>
            {truncatedDesc && (
              <div style={{ fontSize: 26, color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>
                {truncatedDesc}
              </div>
            )}
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 20 }}>
            catutors.com/news
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const headline = type === "join"
    ? "Get More Students. List Free."
    : "Find Tutors Across California";

  const subtext = type === "join"
    ? "Join California's tutor directory — it only takes 5 minutes"
    : "Los Angeles · San Francisco · San Diego · Sacramento & more";

  return new ImageResponse(
    (
      <div style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "sans-serif", padding: "80px",
      }}>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 22, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 28 }}>
          catutors.com
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.15, marginBottom: 24 }}>
          {headline}
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)", textAlign: "center", marginBottom: 48 }}>
          {subtext}
        </div>
        <div style={{ background: "white", color: "#1d4ed8", padding: "18px 48px", borderRadius: 16, fontSize: 24, fontWeight: 700 }}>
          {type === "join" ? "Register Free →" : "Search Tutors →"}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
