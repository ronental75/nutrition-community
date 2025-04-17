import React from "react";

const posts = [
  {
    title: "חלבון – מרכיב חיוני לבריאות ולכושר",
    url: "https://ring-bike-686.notion.site/1d7cf8832caf80c2ad4be31bffc6babb", // Replace with real Notion URL
  },
  {
    title: "השילוש הקדוש: תזונה, פעילות גופנית ושינה",
    url: "https://notion.so/your-trinity-post-url",
  },
  // Add more posts here
];

export default function Home() {
  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-right">
        תכנים לקהילת תזונה
      </h1>
      <ul className="space-y-3">
        {posts.map((post, idx) => (
          <li key={idx}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border rounded-xl shadow hover:bg-gray-50 text-right"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
