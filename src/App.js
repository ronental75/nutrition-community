import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './styles.css';

const categories = [
  // { key: "all", label: "הכל" },
  { key: "תזונה", label: "תזונה" },
  { key: "דיאטה", label: "דיאטה" },
  { key: "ספורט", label: "ספורט" },
  { key: "אורח חיים בריא", label: "אורח חיים בריא" },
];

async function extractSummaryFromHTML(filePath) {
  try {
    const response =await   fetch(filePath);
    const html = await  response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const paragraphs = Array.from(doc.querySelectorAll('p'));
    const lines = paragraphs.map(p => p.textContent.trim()).filter(Boolean).slice(0, 2);
    const all_lines=lines.join(' ') + '...';
    return all_lines;
  } catch (error) {
    console.error(`Error extracting summary from ${filePath}:`, error);
    return '';
  }
}

function createPost(slug, title, categories) {
  const filePath = `/posts/${slug}.html`;
  const summary =  extractSummaryFromHTML(filePath);

  return {
    slug,
    he: title,
    summary,
    image: `/images/${slug}.jpg`,
    file: filePath,
    categories
  };
}


const posts = [
  createPost('protein', 'חלבון – מרכיב חיוני לבריאות ולכושר', ['תזונה', 'ספורט']),
  createPost('protein-guide-full', 'כל מה שרציתם לדעת על חלבון – הרחבה חשובה!', ['תזונה', 'ספורט']),
  createPost('mediterranean-diet', 'דיאטה הים-תיכונית – הדרך המאוזנת לבריאות, ביצועים ואיזון קלורי', ['דיאטה', 'תזונה']),
  createPost('diet-guide', 'עושים סדר בדיאטות – מה באמת עובד?', ['דיאטה']),
  createPost('pre-workout-strategy', 'ירידה במשקל או הגדלת השרירים?', ['ספורט', 'דיאטה']),
  createPost('nutrition-for-runners', 'איך לאכול נכון בריצות – לפי המאמר Nutrition Recommendations for Distance Running?', ['ספורט']),
  createPost('strength-training-nutrition', 'תזונה בזמן ואחרי אימון כוח – איך לתמוך בתהליך ולמקסם תוצאות?', ['ספורט']),
  createPost('muscle-growth-tips', 'טיפים מעשיים להגדלת מסת השריר!', ['ספורט']),
  createPost('pre-strength-nutrition', 'תזונה לפני אימון כוח – איך להכין את הגוף לביצועים מיטביים?', ['ספורט']),
  createPost('sports-nutrition-guide', 'תזונת ספורט חכמה: איך להתאים תזונה להצלחה באימונים?', ['תזונה', 'ספורט']),
  createPost('high-heart-rate-fat-burn', 'שריפת שומן מקסימלית: למה אימון בדופק גבוה הוא הנשק הסודי שלך??', ['ספורט']),
  createPost('fat-in-weight-loss', 'שומן – חבר או אויב בתהליך הירידה במשקל?', ['דיאטה']),
  createPost('tee-and-weight-loss-plan', 'איך לחשב את ההוצאה הקלורית היומית ולבנות תפריט לירידה במשקל', ['דיאטה']),
  createPost('garlic-antioxidants-health', 'לא על השום לבדו!', ['אורח חיים בריא']),
  createPost('dietary-fiber-guide', 'כל מה שצריך לדעת על סיבים תזונתיים', ['תזונה']),
  createPost('quality-sleep-tips', 'טיפים מעשיים לשינה איכותית', ['אורח חיים בריא']),
  createPost('holy-triad-nutrition-sleep-fitness', 'השילוש הקדוש לאורך חיים בריא : תזונה, פעילות גופנית ושינה', ['אורח חיים בריא', 'תזונה', 'ספורט']),
];


function CategoryButtons({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`button ${isActive ? 'button-active' : ''}`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}





function LandingPage({ lang }) {
  const isHebrew = lang === 'he';
  const [selectedCategory, setSelectedCategory] = useState('תזונה');
  const [menuOpen, setMenuOpen] = useState(false); // <-- Required for dropdown toggle

  const filteredPosts =
    selectedCategory === 'תזונה'
      ? posts
      : posts.filter((post) =>
          post.categories?.includes(selectedCategory)
        );

  return (
    <div
      dir={isHebrew ? 'rtl' : 'ltr'}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6"
    >
      {/* ✅ Top Bar */}
      <div className="flex justify-between items-center border-b py-3 relative">
        {/* Right – Welcome text */}
        <span className="text-gray-700 text-lg font-medium">
          {isHebrew ? 'ברוכים הבאים ל' : 'Welcome to'}
        </span>

        {/* Left – Hamburger menu & dropdown */}
        <div className="relative">
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </button>

          {/* Inline Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 mt-2 w-32 bg-white border rounded shadow z-10">
              <a
                href="#about"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {isHebrew ? 'אודות' : 'About'}
              </a>
              {/* You can add more items here */}
            </div>
          )}
        </div>
      </div>

      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="page-title">
        {isHebrew ? 'Eat smart , Live strong' : 'Nutrition Community Content'}
      </h1>
      <p className="page-subtitle">
        {isHebrew
          ? 'טיפים, מחקרים ומידע מקצועי על אורח חיים בריא'
          : 'Tips, research, and professional info about healthy living'}
      </p>
        {/* Language selection links can be added here if needed */}
      </header>

      <CategoryButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
          >
            <img
              src={post.image}
              alt={post.he}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 text-right">
              <h2 className="text-lg font-semibold mb-2">{post.he}</h2>
              <p className="text-sm text-gray-600 mb-2">{post.summary}</p>
              <Link
                to={`/${lang}/${post.slug}`}
                className="text-blue-600 text-sm"
              >
                למאמר המלא...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostPage({ slug }) {
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <div className="p-6 text-center">Post not found</div>;

  return (
    <div dir="rtl" className="w-full px-4 sm:px-6 py-6 text-right">
      <div className="w-full max-w-7xl mx-auto">
        <iframe
          src={post.file}
          className="w-full rounded-lg"
          style={{ height: "100vh", width: "100%", border: "none" }}
          title={post.slug}
        />
      </div>
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
          <Route key={post.slug + "-he"} path={`/he/${post.slug}`} element={<PostPage slug={post.slug} />} />
        ))}
        {posts.map((post) => (
          <Route key={post.slug + "-en"} path={`/en/${post.slug}`} element={<PostPage slug={post.slug} />} />
        ))}
      </Routes>
    </Router>
  );
}




