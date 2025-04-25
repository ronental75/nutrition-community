import React from "react";

export default function StickyTest() {
  return (
    <div style={{ height: "200vh", backgroundColor: "#f0f0f0" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "white",
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0 }}>🔥 I am sticky</h1>
      </div>

      <div style={{ padding: "2rem" }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>Scroll to see if the header sticks — line {i + 1}</p>
        ))}
      </div>
    </div>
  );
}
