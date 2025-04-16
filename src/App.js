import React from 'react';
import { useState } from "react";
// import { Button } from "@/components/ui/button";

export default function NutritionCommunity() {
  const [lang, setLang] = useState("he");

  const isHebrew = lang === "he";

  const content = {
    he: {
      title: "תכנים לקהילת תזונה",
      intro: "ברוכים הבאים! כאן תמצאו את כל הפוסטים והתכנים ששותפרו בקהילה שלנו.",
      posts: [
        {
          title: "חלבון – מרכיב חיוני לבריאות ולכושר",
          body: "\u05d7\u05dc\u05d1\u05d5\u05df \u05d4\u05d5\u05d0 \u05d0\u05d7\u05d3 \u05de\u05d0\u05d1\u05d5\u05ea \u05d4\u05de\u05d6\u05d5\u05df \u05d4\u05d7\u05e9\u05d5\u05d1\u05d9\u05dd... (\u05e2\u05d5\u05d3 \u05e8\u05d0\u05e9 \u05e4\u05d5\u05e1\u05d8 \u05de\u05dc\u05d0\u05d4 \u05db\u05d0\u05df \u05dc\u05d4\u05e9\u05dc\u05d9\u05dd \u05d3\u05e4\u05d9 \u05e0\u05e4\u05e8\u05d3\u05d9)"
        },
        {
          title: "השילוש הקדוש: תזונה, פעילות גופנית ושינה",
          body: "\u05e9\u05de\u05d9\u05e8\u05d4 \u05e2\u05dc \u05d1\u05e8\u05d9\u05d0\u05d5\u05ea \u05d0\u05d5\u05e4\u05d8\u05d9\u05de\u05dc\u05d9\u05ea \u05d3\u05d5\u05e8\u05e9\u05ea \u05d2\u05d9\u05e9\u05d4 \u05e8\u05d1-\u05de\u05e2\u05e8\u05db\u05ea..."
        }
      ]
    },
    en: {
      title: "Nutrition Community Content",
      intro: "Welcome! Here you’ll find all the posts and tips shared in our nutrition community.",
      posts: [
        {
          title: "Protein – A Key Nutrient for Health and Fitness",
          body: "Protein is one of the most important macronutrients... (Let me know if you want full English post content added)"
        },
        {
          title: "The Holy Trinity of Healthy Living: Nutrition, Exercise, Sleep",
          body: "Maintaining optimal health requires a multi-system approach..."
        }
      ]
    }
  };

  const current = content[lang];

  return (
    <div dir={isHebrew ? "rtl" : "ltr"} className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{current.title}</h1>
        <div>
          <button onClick={() => setLang("he")} className="border px-3 py-1 rounded-md hover:bg-gray-100">עברית</button>
          <button onClick={() => setLang("en")} className="border px-3 py-1 rounded-md hover:bg-gray-100 ml-2">English</button>

        </div>
      </div>
      <p className="mb-6 text-lg">{current.intro}</p>
      <div className="space-y-6">
        {current.posts.map((post, idx) => (
          <div key={idx} className="border rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
