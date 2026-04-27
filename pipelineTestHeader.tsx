import { useState, useEffect } from "react";

const letters = "CHILET WELCOMES YOU TO EDDY'S PIPELINE LAUNCH EVENT".split("");

const glitchChars = "!<>-_\\/[]{}—=+*^?#ΧΩΔΣΠΘΛΦΨ01";

function useGlitch(text, trigger) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = 18;
    const chars = text.split("");
    const interval = setInterval(() => {
      frame++;
      const next = chars.map((c, i) => {
        if (c === " ") return " ";
        const reveal = Math.floor((frame / total) * chars.length);
        if (i < reveal) return c;
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      });
      setDisplayed(next.join(""));
      if (frame >= total) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [trigger]);

  return displayed;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const headline = useGlitch("CHILET WELCOMES YOU TO EDDY'S PIPELINE LAUNCH EVENT", ready || hovered);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      overflow: "hidden",
      position: "relative",
      cursor: "crosshair",
    }}>

      {/* Grid overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,255,170,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,170,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Main hero */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "1000px",
        width: "90%",
        textAlign: "center",
        padding: "60px 32px",
        border: "1px solid rgba(0,255,170,0.15)",
        background: "rgba(0,255,170,0.015)",
        boxShadow: "0 0 80px rgba(0,255,170,0.04), inset 0 0 60px rgba(0,255,170,0.02)",
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* Corner brackets */}
        {[
          { top: -2, left: -2, borderTop: "2px solid #00ffaa", borderLeft: "2px solid #00ffaa" },
          { top: -2, right: -2, borderTop: "2px solid #00ffaa", borderRight: "2px solid #00ffaa" },
          { bottom: -2, left: -2, borderBottom: "2px solid #00ffaa", borderLeft: "2px solid #00ffaa" },
          { bottom: -2, right: -2, borderBottom: "2px solid #00ffaa", borderRight: "2px solid #00ffaa" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s }} />
        ))}

        {/* Status tag */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 40,
          padding: "6px 16px",
          border: "1px solid rgba(0,255,170,0.3)",
          background: "rgba(0,255,170,0.05)",
          color: "#00ffaa",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#00ffaa",
            boxShadow: "0 0 8px #00ffaa",
            display: "inline-block",
            animation: "pulse 1.4s ease-in-out infinite",
          }} />
          LIVE TRANSMISSION
        </div>

        {/* MAIN HEADLINE */}
        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 62px)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            color: "#e8ffe8",
            textShadow: "0 0 40px rgba(0,255,170,0.25), 0 0 80px rgba(0,255,170,0.1)",
            margin: "0 0 32px",
            fontFamily: "'Courier New', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {headline}
        </h1>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,255,170,0.4), transparent)",
          margin: "0 auto 32px",
          width: "60%",
        }} />

        {/* Sub-label */}
        <p style={{
          color: "rgba(0,255,170,0.45)",
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          margin: 0,
        }}>
          EST. 2025 &nbsp;·&nbsp; PIPELINE v1.0 &nbsp;·&nbsp; LAUNCH SEQUENCE INITIATED
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 3,
        borderTop: "1px solid rgba(0,255,170,0.1)",
        background: "rgba(5,5,8,0.9)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 32px",
        fontSize: 9,
        color: "rgba(0,255,170,0.3)",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}>
        <span>EDDY'S PIPELINE</span>
        <span>◈ LAUNCH EVENT</span>
        <span>CHILET © 2025</span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
