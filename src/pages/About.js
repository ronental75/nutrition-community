// src/About.js
import React from 'react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-6" dir="rtl">
      <iframe
        src="/About.html"
        title="אודות"
        className="w-full rounded-lg"
        style={{ height: "100vh", width: "100%", border: "none" }}
        // className="w-full h-[80vh] border-0 rounded-md shadow-sm"
      />
    </div>
  );
}
