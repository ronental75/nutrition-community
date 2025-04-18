import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const posts = [
  {
    slug: "protein",
    he: "חלבון – מרכיב חיוני לבריאות ולכושר",
    en: "Protein – A Key Nutrient for Health and Fitness",
    file: "/posts/protein.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "protein-guide-full",
    he: "כל מה שרציתם לדעת על חלבון – הרחבה חשובה!",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/protein-guide-full.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "mediterranean-diet",
    he: "דיאטה הים-תיכונית – הדרך המאוזנת לבריאות, ביצועים ואיזון קלורי",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/mediterranean-diet.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "diet-guide",
    he: "עושים סדר בדיאטות – מה באמת עובד?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/diet-guide.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "pre-workout-strategy",
    he: "ירידה במשקל או הגדלת השרירים?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/pre-workout-strategy.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "nutrition-for-runners",
    he: "איך לאכול נכון בריצות – לפי המאמר Nutrition Recommendations for Distance Running?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/nutrition-for-runners.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "strength-training-nutrition",
    he: "תזונה בזמן ואחרי אימון כוח – איך לתמוך בתהליך ולמקסם תוצאות?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/strength-training-nutrition.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "muscle-growth-tips",
    he: "טיפים מעשיים להגדלת מסת השריר!",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/muscle-growth-tips.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "pre-strength-nutrition",
    he: "תזונה לפני אימון כוח – איך להכין את הגוף לביצועים מיטביים?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/pre-strength-nutrition.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "sports-nutrition-guide",
    he: "תזונת ספורט חכמה: איך להתאים תזונה להצלחה באימונים?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/sports-nutrition-guide.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "high-heart-rate-fat-burn",
    he: "שריפת שומן מקסימלית: למה אימון בדופק גבוה הוא הנשק הסודי שלך??", 
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/high-heart-rate-fat-burn.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "fat-in-weight-loss",
    he: "שומן – חבר או אויב בתהליך הירידה במשקל?",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/fat-in-weight-loss.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "tee-and-weight-loss-plan",
    he: "איך לחשב את ההוצאה הקלורית היומית ולבנות תפריט לירידה במשקל",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/tee-and-weight-loss-plan.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "garlic-antioxidants-health",
    he: "לא על השום לבדו!",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/garlic-antioxidants-health.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "dietary-fiber-guide",
    he: "כל מה שצריך לדעת על סיבים תזונתיים ",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/dietary-fiber-guide.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "quality-sleep-tips",
    he: "טיפים מעשיים לשינה איכותית",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/quality-sleep-tips.html",
    category: { he: "אורח חיים בריא", en: "Healthy Lifestyle" }
  },
  {
    slug: "holy-triad-nutrition-sleep-fitness",
    he: "השילוש הקדוש לאורך חיים בריא : תזונה, פעילות גופנית ושינה",
    en: "The Health Triad: Nutrition, Exercise & Sleep",
    file: "/posts/holy-triad-nutrition-sleep-fitness.html",
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
          {isHebrew ? "Eat smart , Live strong" : "Nutrition Community Content"}
        </h1>
        {/* <div className="flex gap-2">
          <Link to="/he" className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">Heb</Link>
          <Link to="/en" className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">En</Link>
        </div> */}
      </header>

      {categories.map((category) => (
        <div key={category.he} className="mb-8">
          {/* <h2 className="text-xl font-semibold mb-4 border-b pb-1">
            {isHebrew ? category.he : category.en}
          </h2> */}
          <ul className="space-y-3">
            {posts
              .filter((post) => post.category.he === category.he)
              .map((post, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${lang}/${post.slug}`}
                    className="block bg-white border rounded-xl shadow-md hover:shadow-lg transition p-4"
                  >
                    {isHebrew ? post.he : post.en}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}


      {/* Footer Feedback Form
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
      </footer> */}
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
    <div dir="rtl" className="w-full px-0 sm:px-0 py-6 text-right">
      {/* Load HTML in iframe */}
      <div className="mb-8">
        <iframe
          src={post.file}
          className="w-full rounded-none shadow-none"
          style={{
            height: "1000px",
            border: "none",
            padding: 0,
            margin: 0,
            display: "block",
            width: "100vw",
          }}
          title={post.slug}
        />
      </div>

      {/* Disqus embed */}
      <div id="disqus_thread" className="mt-12 px-4 sm:px-6" />
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
