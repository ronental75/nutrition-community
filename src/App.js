  import React, { useState } from "react";
  import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
  import './styles.css';
  import About from './About';
  import Contact from './contact';
  import classNames from 'classnames';
  import LikeDislike from './LikeDislike';
  
  const categories = [
    // { key: "all", label: "הכל" },
    { key: "אורח חיים בריא", label: "אורח חיים בריא" },

    { key: "ספורט", label: "פעילות גופנית" },
    // { key: "דיאטה", label: "דיאטה" },
    { key: "תזונה", label: "תזונה" }
  ];

  async function extractSummaryFromHTML(filePath) {
    try {
      const response =await   fetch(filePath);
      const html = await  response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const paragraphs = Array.from(doc.querySelectorAll('p'));
      const lines = paragraphs.map(p => p.textContent.trim()).filter(Boolean).slice(0,1);
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
    createPost('stack', 'תקועים על אותו משקל? זו לא אשמתכם – זה הגוף שלכם!', ['תזונה']),
    createPost('protein', 'חלבון – מרכיב חיוני לבריאות ולכושר', ['תזונה', 'ספורט']),
    createPost('protein-guide-full', 'כל מה שרציתם לדעת על חלבון – הרחבה חשובה!', ['תזונה', 'ספורט']),
    createPost('mediterranean-diet', 'דיאטה הים-תיכונית – הדרך המאוזנת לבריאות, ביצועים ואיזון קלורי', ['תזונה']),
    createPost('diet-guide', 'עושים סדר בדיאטות – מה באמת עובד?', ['תזונה']),
    createPost('pre-workout-strategy', 'ירידה במשקל או הגדלת השרירים?', ['ספורט']),
    createPost('nutrition-for-runners', 'איך לאכול נכון בריצות – לפי המאמר Nutrition Recommendations for Distance Running?', ['ספורט']),
    createPost('strength-training-nutrition', 'תזונה בזמן ואחרי אימון כוח – איך לתמוך בתהליך ולמקסם תוצאות?', ['ספורט']),
    createPost('muscle-growth-tips', 'טיפים מעשיים להגדלת מסת השריר!', ['ספורט']),
    createPost('pre-strength-nutrition', 'תזונה לפני אימון כוח – איך להכין את הגוף לביצועים מיטביים?', ['ספורט']),
    createPost('sports-nutrition-guide', 'תזונת ספורט חכמה: איך להתאים תזונה להצלחה באימונים?', ['תזונה', 'ספורט']),
    createPost('high-heart-rate-fat-burn', 'שריפת שומן מקסימלית: למה אימון בדופק גבוה הוא הנשק הסודי שלך??', ['ספורט']),
    createPost('fat-in-weight-loss', 'שומן – חבר או אויב בתהליך הירידה במשקל?', ['תזונה']),
    createPost('tee-and-weight-loss-plan', 'איך לחשב את ההוצאה הקלורית היומית ולבנות תפריט לירידה במשקל', ['תזונה']),
    createPost('holy-triad-nutrition-sleep-fitness', 'השילוש הקדוש לאורך חיים בריא : תזונה, פעילות גופנית ושינה', ['אורח חיים בריא']),
    createPost('garlic-antioxidants-health', 'לא על השום לבדו!', ['אורח חיים בריא']),
    createPost('dietary-fiber-guide', 'כל מה שצריך לדעת על סיבים תזונתיים', ['תזונה']),
    createPost('quality-sleep-tips', 'טיפים מעשיים לשינה איכותית', ['אורח חיים בריא']),
  ];


  function CategoryButtons({ selectedCategory, setSelectedCategory }) {
    return (
      <div
        className="flex justify-center flex-wrap gap-2 my-6"
        style={{ direction: 'ltr' }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={classNames('button text-sm px-3 py-1', {
                'button-active': isActive
              })}
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
    const bannerText = "🔥 מבצע מיוחד! 🔥 הנחה מיוחדת לליווי זוגות לאורח חיים בריא - נותרו רק 3 מקומות אחרונים! הזדרזו ליצור קשר ⏰";


    const filteredPosts =
      selectedCategory === 'תזונה'
        ? posts
        : posts.filter((post) =>
            post.categories?.includes(selectedCategory)
          );

    return (
      
    <div className="top-bar-wrapper" dir="rtl" >
      <div className="top-screen">

      {/* dir={isHebrew ? 'rtl' : 'ltr'} */}
         <div className="menu-wrapper" >
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      {menuOpen && (
    <div className="menu-dropdown"  >
      <Link to="/about" className="menu-item">
        {isHebrew ? 'אודות' : 'About'}
      </Link>
      <Link to="/contact" className="menu-item">
        {isHebrew ? 'צור קשר' : 'Contact'}
      </Link>
     
    </div>
  )}
    </div>


    <header className="flex-col items-center text-center mb-10">
  <h1 className="page-title" >
    {isHebrew ? 'Eat smart , Live strong' : 'Nutrition Community Content'}
  </h1>
  <p className="page-subtitle mt-2">
    {isHebrew
      ? 'טיפים, מחקרים ומידע מקצועי על אורח חיים בריא'
      : 'Tips, research, and professional info about healthy living'}
  </p>
</header>
        <CategoryButtons
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
                <AnimatedBanner text={bannerText} />

        {/* <hr className="border-gray-300 mx-4" /> */}
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-10">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/${lang}/${post.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'flex-start',
                gap: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                backgroundColor: 'white',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s ease-in-out'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.08)'}
            >
              <div style={{ flexShrink: 0 }}>
                <img
                  src={post.image}
                  alt={post.he}
                  style={{
                    width: '96px',
                    height: 'auto',
                    maxHeight: '120px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    display: 'block',
                    marginTop: '30px'
                  }}
                />
              </div>
              <div style={{ textAlign: 'right', flex: 1 }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: '1.4' }}>{post.he}</h2>
                <p style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '0.25rem', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {post.summary}
                </p>
                <span style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 500 }}>
                  לפוסט המלא...
                </span>
              </div>
              </Link>
          ))}
        </div>
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
            style={{ height: "95vh", width: "100%", border: "none" }}
            title={post.slug}
          />
        <div
          className="w-full mt-4 pr-6"
          dir="rtl"
        >
          <LikeDislike slug={post.slug} />
        </div>
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />


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


  function AnimatedBanner({ text }) {
    return (
      <div className="banner-container">
        <div className="animated-banner">
          <span>{text}</span>
        </div>
        <style jsx>{`
          .banner-container {
            width: 100%;
            overflow: hidden;
            background-color: #f0f4f8;
            padding: 10px 0;
            margin: 10px 0;
            border-radius: 4px;
          }
          
          .animated-banner {
            display: inline-block;
            white-space: nowrap;
            animation: moveRightToLeft 25s linear infinite;
          }
          
          .animated-banner span {
            padding: 5px;
            font-weight: 500;
            color: #2563eb;
          }
          
          @keyframes moveRightToLeft {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    );
  }

