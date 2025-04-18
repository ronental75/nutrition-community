import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './styles.css';

const categories = [
  { key: "all", label: "הכל" },
  { key: "תזונה", label: "תזונה" },
  { key: "דיאטה", label: "דיאטה" },
  { key: "ספורט", label: "ספורט" },
  { key: "אורח חיים בריא", label: "אורח חיים בריא" },
];


const posts = [
  {
    slug: "protein",
    he: "חלבון – מרכיב חיוני לבריאות ולכושר",
    summary: "למה חלבון כל כך חשוב? ואיך הוא תומך בבניית שריר, התאוששות ובריאות כללית.",
    image: "/images/image_01.jpg",
    file: "/posts/protein.html",
    categories: ["תזונה", "ספורט"]
  },
  {
    slug: "protein-guide-full",
    he: "כל מה שרציתם לדעת על חלבון – הרחבה חשובה!",
    summary: "מה באמת חשוב לדעת על צריכת חלבון? מיתוסים, מחקרים והמלצות עדכניות.",
    image: "/images/image_02.jpg",
    file: "/posts/protein-guide-full.html",
    categories: ["תזונה", "ספורט"]
  },
  {
    slug: "mediterranean-diet",
    he: "דיאטה הים-תיכונית – הדרך המאוזנת לבריאות, ביצועים ואיזון קלורי",
    summary: "הכרת עקרונות הדיאטה הים-תיכונית, תועלותיה הבריאותיות והמלצות מותאמות.",
    image: "/images/image_03.jpg",
    file: "/posts/mediterranean-diet.html",
    categories: ["דיאטה", "תזונה"]
  },
  {
    slug: "diet-guide",
    he: "עושים סדר בדיאטות – מה באמת עובד?",
    summary: "ניתוח גישות שונות לירידה במשקל – היתרונות, החסרונות והאמת שמאחוריהן.",
    image: "/images/image_04.jpg",
    file: "/posts/diet-guide.html",
    categories: ["דיאטה"]
  },
  {
    slug: "pre-workout-strategy",
    he: "ירידה במשקל או הגדלת השרירים?",
    summary: "איך להתאים תזונה לפי מטרת האימון: חיטוב או היפרטרופיה.",
    image: "/images/image_05.jpg",
    file: "/posts/pre-workout-strategy.html",
    categories: ["ספורט", "דיאטה"]
  },
  {
    slug: "nutrition-for-runners",
    he: "איך לאכול נכון בריצות – לפי המאמר Nutrition Recommendations for Distance Running?",
    summary: "המלצות תזונתיות מבוססות מחקר לרצי סיבולת לפי סוג אימון ומרחק.",
    image: "/images/image_06.jpg",
    file: "/posts/nutrition-for-runners.html",
    categories: ["ספורט"]
  },
  {
    slug: "strength-training-nutrition",
    he: "תזונה בזמן ואחרי אימון כוח – איך לתמוך בתהליך ולמקסם תוצאות?",
    summary: "איך לתמוך בבניית שריר והתאוששות באמצעות תזונה מותאמת לאימון.",
    image: "/images/image_07.jpg",
    file: "/posts/strength-training-nutrition.html",
    categories: ["ספורט"]
  },
  {
    slug: "muscle-growth-tips",
    he: "טיפים מעשיים להגדלת מסת השריר!",
    summary: "מה נדרש כדי להשיג היפרטרופיה אפקטיבית? שילוב נכון של אימון ותזונה.",
    image: "/images/image_08.jpg",
    file: "/posts/muscle-growth-tips.html",
    categories: ["ספורט"]
  },
  {
    slug: "pre-strength-nutrition",
    he: "תזונה לפני אימון כוח – איך להכין את הגוף לביצועים מיטביים?",
    summary: "איך לתכנן תזונה לפני אימון כוח – פחמימות, קפאין ועיתוי אכילה.",
    image: "/images/image_09.jpg",
    file: "/posts/pre-strength-nutrition.html",
    categories: ["ספורט"]
  },
  {
    slug: "sports-nutrition-guide",
    he: "תזונת ספורט חכמה: איך להתאים תזונה להצלחה באימונים?",
    summary: "מדריך להתאמת תזונה לפי סוג האימון והמטרה – כוח, קרדיו והיברידי.",
    image: "/images/image_10.jpg",
    file: "/posts/sports-nutrition-guide.html",
    categories: ["תזונה", "ספורט"]
  },
  {
    slug: "high-heart-rate-fat-burn",
    he: "שריפת שומן מקסימלית: למה אימון בדופק גבוה הוא הנשק הסודי שלך??",
    summary: "איך אימון עצים בדופק גבוה שורף יותר שומן ומשפר את הכושר.",
    image: "/images/image_11.jpg",
    file: "/posts/high-heart-rate-fat-burn.html",
    categories: ["ספורט"]
  },
  {
    slug: "fat-in-weight-loss",
    he: "שומן – חבר או אויב בתהליך הירידה במשקל?",
    summary: "הבדלים בין סוגי שומן והשפעתם על ירידה במשקל ובריאות כללית.",
    image: "/images/image_12.jpg",
    file: "/posts/fat-in-weight-loss.html",
    categories: ["דיאטה"]
  },
  {
    slug: "tee-and-weight-loss-plan",
    he: "איך לחשב את ההוצאה הקלורית היומית ולבנות תפריט לירידה במשקל",
    summary: "מדריך לחישוב BMR ו-TEE לבניית תפריט מדויק לפי מטרה.",
    image: "/images/image_12.jpg",
    file: "/posts/tee-and-weight-loss-plan.html",
    categories: ["דיאטה"]
  },
  {
    slug: "garlic-antioxidants-health",
    he: "לא על השום לבדו!",
    summary: "שום כנוגד חמצון עוצמתי – מנגנון פעולה, תועלות וטיפים לצריכה.",
    image: "/images/image_13.jpg",
    file: "/posts/garlic-antioxidants-health.html",
    categories: ["אורח חיים בריא"]
  },
  {
    slug: "dietary-fiber-guide",
    he: "כל מה שצריך לדעת על סיבים תזונתיים",
    summary: "תפקידי הסיבים בתזונה, יתרונותם לעיכול, שובע וירידה במשקל.",
    image: "/images/image_14.jpg",
    file: "/posts/dietary-fiber-guide.html",
    categories: ["תזונה"]
  },
  {
    slug: "quality-sleep-tips",
    he: "טיפים מעשיים לשינה איכותית",
    summary: "איך לשפר את איכות השינה, להפחית סטרס ולשמור על תפקוד מיטבי.",
    image: "/images/image_15.jpg",
    file: "/posts/quality-sleep-tips.html",
    categories: ["אורח חיים בריא"]
  },
  {
    slug: "holy-triad-nutrition-sleep-fitness",
    he: "השילוש הקדוש לאורך חיים בריא : תזונה, פעילות גופנית ושינה",
    summary: "שילוב בין תזונה, פעילות גופנית ושינה לאיזון מטבולי ובריאות אופטימלית.",
    image: "/images/image_16.jpg",
    file: "/posts/holy-triad-nutrition-sleep-fitness.html",
    categories: ["אורח חיים בריא", "תזונה", "ספורט"]
  }
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
  const isHebrew = lang === "he";
  const [selectedCategory, setSelectedCategory] = useState("תזונה");

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((post) => post.categories.includes(selectedCategory));

  return (
    <div dir={isHebrew ? "rtl" : "ltr"} className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
          {isHebrew ? "Eat smart , Live strong" : "Nutrition Community Content"}
        </h1>
        {/* <div className="flex gap-2">
          <Link to="/he" className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">Heb</Link>
          <Link to="/en" className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">En</Link>
        </div> */}
      </header>

      <CategoryButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Link to={`/${lang}/${post.slug}`} key={post.slug} className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
            <img src={post.image} alt={post.he} className="w-full h-48 object-cover" />
            <div className="p-4 text-right">
              <h2 className="text-lg font-semibold mb-2">{post.he}</h2>
              <p className="text-sm text-gray-600 mb-2">{post.summary}</p>
              <span className="text-blue-600 text-sm">למאמר המלא...</span>
            </div>
          </Link>
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
