import { ImageResponse } from "next/og";

export const alt = "CandorCheck — See when AI starts guessing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171a17",
          color: "#f4f5ed",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              background: "#c9ff4a",
              color: "#171a17",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            CC
          </div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>CandorCheck</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: "-4px" }}>
              See when AI starts guessing.
            </div>
            <div style={{ color: "#bcc3bc", fontSize: 27 }}>
              Open prompts. Local scoring. No model leaderboard.
            </div>
          </div>
          <div style={{ color: "#c9ff4a", fontSize: 118, fontWeight: 900, letterSpacing: "-10px" }}>
            12
          </div>
        </div>
      </div>
    ),
    size,
  );
}
