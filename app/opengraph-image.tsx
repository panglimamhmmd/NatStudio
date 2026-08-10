import { ImageResponse } from "next/og";

export const alt = "NatStudio · Social Content, Photography & Motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1012",
          backgroundImage:
            "radial-gradient(circle at 50% 38%, #113038 0%, #0c1012 62%)",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32" style={{ marginBottom: 32 }}>
          <path
            d="M16 4 C17.1 12.6 19.4 14.9 28 16 C19.4 17.1 17.1 19.4 16 28 C14.9 19.4 12.6 17.1 4 16 C12.6 14.9 14.9 12.6 16 4 Z"
            fill="#0cc0df"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#0cc0df" }}>Nat</span>
          <span style={{ color: "#f5f7f7" }}>Studio</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#9aa5a5",
          }}
        >
          Social Content · Photography · Motion
        </div>
      </div>
    ),
    { ...size }
  );
}
