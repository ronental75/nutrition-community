import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const posts = [
  {
    slug: "protein",
    he: "חלבון – מרכיב חיוני לבריאות ולכושר",
    en: "Protein – A Key Nutrient for Health and Fitness",
    file: "/posts/protein.html",
    category: { he: "תזוןה", en: "Nutrition" }
  },
  {
    slug: "health-triad",
    he: "השילוש הקדוש: תזונה, פעילות גופנית ושינה",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/health-triad.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  }
];

function LandingPage({ lang }) {
  const isHebrew = lang === "he";
  const categories = Array.from(new Set(posts.map((p) => JSON.stringify(p.category)))).map(JSON.parse);

  return (
    <div dir={isHebrew ? "rtl" : "ltr"} className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isHebrew ? "תכנים לקהילת תזונה" : "Nutrition Community Content"}
        </h1>
        <div className="flex gap-2">
          <Link to="/he" className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">Heb</Link>
          <Link to="/en" className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">En</Link>
        </div>
      </header>

      {categories.map((category) => (
        <div key={category.he} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {isHebrew ? category.he : category.en}
          </h2>
          <ul className="space-y-2">
            {posts
              .filter((post) => post.category.he === category.he)
              .map((post, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}/${post.slug}`}
                    className="block p-4 border rounded-xl shadow hover:bg-gray-50"
                  >
                    {isHebrew ? post.he : post.en}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Footer Feedback Form */}
      <footer className="mt-16 border-t pt-8">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfsdibZGQi3LeuByt6DPYnAtnEJg8m1FcJ7ikchXNJJ9UDahg/viewform?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Feedback Form"
        />
      </footer>
    </div>
  );
}

function PostPage({ slug, lang }) {
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    const disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = slug;
    };

    const d = document;
    const s = d.createElement('script');
    s.src = 'https://eatsmartlivestrong.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    s.async = true;

    const disqusDiv = d.getElementById('disqus_thread');
    if (disqusDiv) {
      disqusDiv.innerHTML = '';
      disqusDiv.appendChild(s);
    }

    return () => {
      if (disqusDiv) disqusDiv.innerHTML = '';
    };
  }, [slug]);

  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-right">
      <h1 className="text-3xl font-bold mb-6">{lang === "he" ? post.he : post.en}</h1>

      {/* Load HTML in iframe */}
      <div className="mb-8">
        <iframe
          src={post.file}
          className="w-full max-w-3xl mx-auto rounded-lg shadow"
          style={{
            height: "1000px",
            border: "none",
            padding: "16px",
            overflow: "auto",
            background: "#fff",
          }}
          title={post.slug}
        />
      </div>

      {/* Disqus embed */}
      <div id="disqus_thread" className="mt-12" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage lang="he" />} />
        <Route path="/he" element={<LandingPage lang="he" />} />
        <Route path="/en" element={<LandingPage lang="en" />} />
        {posts.map((post) => (
          <Route
            key={post.slug + "-he"}
            path={`/he/${post.slug}`}
            element={<PostPage slug={post.slug} lang="he" />}
          />
        ))}
        {posts.map((post) => (
          <Route
            key={post.slug + "-en"}
            path={`/en/${post.slug}`}
            element={<PostPage slug={post.slug} lang="en" />}
          />
        ))}
      </Routes>
    </Router>
  );
}