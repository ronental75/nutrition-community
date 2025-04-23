  import React, { useState } from "react";
  import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
  import './styles.css';
  import About from './About';
  import Contact from './contact';
  import classNames from 'classnames';


  const categories = [
    // { key: "all", label: "הכל" },
    { key: "ספורט", label: "ספורט" },
    { key: "דיאטה", label: "דיאטה" },
    { key: "תזונה", label: "תזונה" },
    { key: "אורח חיים בריא", label: "אורח חיים בריא" }
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
    createPost('stack', 'תקועים על אותו משקל? זו לא אשמתכם – זה הגוף שלכם!', ['תזונה', 'דיאטה']),
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
    createPost('holy-triad-nutrition-sleep-fitness', 'השילוש הקדוש לאורך חיים בריא : תזונה, פעילות גופנית ושינה', ['אורח חיים בריא', 'תזונה', 'ספורט']),
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

    const filteredPosts =
      selectedCategory === 'תזונה'
        ? posts
        : posts.filter((post) =>
            post.categories?.includes(selectedCategory)
          );

    return (


    <div className="top-bar-wrapper" dir="rtl">
      {/* dir={isHebrew ? 'rtl' : 'ltr'} */}
         <div className="menu-wrapper" >
      <button
        // className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      {menuOpen && (
    <div className="menu-dropdown" >
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
  <h1 className="page-title">
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
        <hr className="border-gray-300 mx-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white mt-8"
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
                  לפוסט המלא...
                </Link>
                <hr className="border-gray-300 mx-4" />

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
            style={{ height: "95vh", width: "100%", border: "none" }}
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




