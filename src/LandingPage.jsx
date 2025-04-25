import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from 'classnames';

const categories = [
  { key: "ספורט", label: "ספורט" },
  { key: "דיאטה", label: "דיאטה" },
  { key: "תזונה", label: "תזונה" },
  { key: "אורח חיים בריא", label: "אורח חיים בריא" }
];

function CategoryButtons({ selectedCategory, setSelectedCategory }) {
  return (
    <div
      className="sticky top-0 z-10 bg-white py-4 px-4 shadow-sm border-b flex flex-wrap justify-center gap-2"
      style={{ direction: 'ltr' }}
    >
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => setSelectedCategory(cat.key)}
          className={classNames('px-4 py-1 rounded-full border text-sm transition', {
            'bg-blue-600 text-white font-semibold': selectedCategory === cat.key,
            'bg-gray-100 text-gray-700': selectedCategory !== cat.key
          })}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default function LandingPage({ posts, lang }) {
  const isHebrew = lang === 'he';
  const [selectedCategory, setSelectedCategory] = useState('תזונה');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts =
    selectedCategory === 'תזונה'
      ? posts
      : posts.filter(post => post.categories?.includes(selectedCategory));

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div dir="rtl" className="max-w-5xl mx-auto px-4">
      <header className="text-center my-10">
        <h1 className="text-3xl font-bold">{isHebrew ? 'Eat smart , Live strong' : 'Nutrition Community Content'}</h1>
        <p className="mt-2 text-gray-600">
          {isHebrew
            ? 'טיפים, מחקרים ומידע מקצועי על אורח חיים בריא'
            : 'Tips, research, and professional info about healthy living'}
        </p>
      </header>

      <CategoryButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="space-y-8 mt-8">
        {visiblePosts.map(post => (
          <div
            key={post.slug}
            className="flex flex-col md:flex-row gap-4 border-b pb-6 transition-transform hover:scale-[1.01] duration-150"
          >
            <img
              src={post.image}
              alt={post.he}
              className="w-full md:w-48 h-auto rounded-md object-cover"
            />
            <div className="flex-1 text-right">
              <h2 className="text-xl font-semibold mb-2">{post.he}</h2>
              <p className="text-sm text-gray-500 mb-1">מאת צוות התזונה | 2024</p>
              <p className="text-gray-700 text-sm mb-2">{post.summary}</p>
              <Link
                to={`/${lang}/${post.slug}`}
                className="text-blue-600 text-sm hover:underline"
              >
                לפוסט המלא...
              </Link>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredPosts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm transition"
          >
            טען עוד
          </button>
        </div>
      )}
    </div>
  );
}
