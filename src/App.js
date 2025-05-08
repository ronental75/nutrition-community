import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import './styles.css';
import About from './About';
import Contact from './contact';
import classNames from 'classnames';
import LikeDislike from './LikeDislike';
import LikeDisplay from './LikeDisplay';
import AnimatedBanner from './AnimatedBanner';
import SubmitPost from './SubmitPost';
import Share from './share';
import TdeeCalculator from './TdeeCalculator';
import PrintTips from './PrintTips';
import BMICalculator from './BMICalculator';
import SuccessStories from './components/SuccessStories';
import AccessibilityWidget from './AccessibilityWidget';
import TipsPopupModal from './TipsPopupModal';
import './styles/auth-styles.css';
import { AuthProvider, useAuth, UserIcon, LoginModal, UnauthorizedAccess } from './components/auth/AuthComponents';
import AdminPanel from './components/admin/AdminPanel';
import './styles/auth-styles.css';
import './styles/admin-panel.css';
import PersonalDashboard from './components/dashboard/PersonalDashboard';

// קומפוננטת עטיפה להגנה על נתיבים שדורשים התחברות
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  if (loading) {
    return <div className="loading-screen">טוען...</div>;
  }
  
  if (!currentUser) {
    // במקום לפתוח את חלונית ההתחברות, נציג את דף הגישה המוגבלת
    return <UnauthorizedAccess />;
  }
  
  return children;
};

// להגבלת גישה למנהלים בלבד
const AdminRoute = ({ children }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">טוען...</div>;
  }
  
  if (!currentUser || userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// שאר הקוד שלך...

const categories = [
  // { key: "all", label: "הכל" },
  { key: "אורח חיים בריא", label: "אורח חיים בריא" },
  { key: "ספורט", label: "תזונה וספורט" },
  // { key: "דיאטה", label: "דיאטה" },
  { key: "תזונה", label: "דיאטה" },
  { key: "חדש", label: "חדש" } // Added new category
];

const categoryIcons = {
  'תזונה': '🥗',
  'ספורט': '🏋️',
  'אורח חיים בריא': '🌿',
  'חדש': '🔥' // Added icon for the new category
};

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

function createPost(slug, title, categories, date) {
  const filePath = `/posts/${slug}.html`;
  const summary = extractSummaryFromHTML(filePath);

  return {
    slug,
    he: title,
    summary,
    image: `/images/${slug}.jpg`,
    file: filePath,
    categories,
    date: date || new Date().toISOString().split('T')[0], // אם אין, קח תאריך של היום
    author: "רונן טל" // ✅ קבוע
  };
}

const posts = [
  createPost('fatmuscle', '"אי אפשר להפוך שומן לשריר – אבל הנה מה שכן אפשר לעשות"', ['ספורט'],'2025-05-03'),
  createPost('berlin', '"המטרה ברלין"', ['אורח חיים בריא'],'2025-05-01'),
  createPost('stack', 'תקועים על אותו משקל? זו לא אשמתכם – זה הגוף שלכם!', ['תזונה'],'2025-04-21'),
  createPost('setpoint2', 'מה הסוד לשינוי נקודת שיווי המשקל של הגוף?', ['תזונה'],'2025-04-28'),
  createPost('protein', 'חלבון – מרכיב חיוני לבריאות ולכושר', ['תזונה', 'ספורט'],'2025-03-03'),
  createPost('protein-guide-full', 'כל מה שרציתם לדעת על חלבון – הרחבה חשובה!', ['תזונה', 'ספורט'],'2025-03-04'),
  createPost('mediterranean-diet', 'דיאטה הים-תיכונית – הדרך המאוזנת לבריאות, ביצועים ואיזון קלורי', ['תזונה'],'2025-03-06'),
  createPost('diet-guide', 'עושים סדר בדיאטות – מה באמת עובד?', ['תזונה'],'2025-03-07'),
  createPost('pre-workout-strategy', 'ירידה במשקל או הגדלת השרירים?', ['ספורט'],'2025-03-08'),
  createPost('nutrition-for-runners','איך לאכול נכון בריצות – לפי המאמר Nutrition Recommendations for Distance Running?', ['ספורט'],'2025-03-12'),
  createPost('strength-training-nutrition', 'תזונה בזמן ואחרי אימון כוח – איך לתמוך בתהליך ולמקסם תוצאות?', ['ספורט'],'2025-03-13'),
  createPost('muscle-growth-tips', 'טיפים מעשיים להגדלת מסת השריר!', ['ספורט'],'2025-03-20'),
  createPost('sports-nutrition-guide','תזונת ספורט חכמה: איך להתאים תזונה להצלחה באימונים?', ['תזונה', 'ספורט'],'2025-03-23'),
  createPost('high-heart-rate-fat-burn', 'שריפת שומן מקסימלית: למה אימון בדופק גבוה הוא הנשק הסודי שלך??', ['ספורט'],'2025-03-28'),
  createPost('fat-in-weight-loss', 'שומן – חבר או אויב בתהליך הירידה במשקל?', ['תזונה'],'2025-04-03'),
  createPost('tee-and-weight-loss-plan', 'איך לחשב את ההוצאה הקלורית היומית ולבנות תפריט לירידה במשקל', ['תזונה'],'2025-04-10'),
  createPost('holy-triad-nutrition-sleep-fitness', 'השילוש הקדוש לאורך חיים בריא : תזונה, פעילות גופנית ושינה', ['אורח חיים בריא'],'2025-04-11'),
  createPost('garlic-antioxidants-health', 'לא על השום לבדו!', ['אורח חיים בריא'],'2025-04-14'),
  createPost('dietary-fiber-guide', 'כל מה שצריך לדעת על סיבים תזונתיים', ['תזונה'],'2025-03-23'),
  createPost('quality-sleep-tips', 'טיפים מעשיים לשינה איכותית', ['אורח חיים בריא'],'2025-03-24'),
];

function CategoryButtons({ selectedCategory, setSelectedCategory }) {
  // ... הקוד הקיים ...
}

function isNewPost(dateStr) {
  // ... הקוד הקיים ...
}

function formatDate(dateStr) {
  // ... הקוד הקיים ...
}

function LandingPage({ lang }) {
  const isHebrew = lang === 'he';
  const [selectedCategory, setSelectedCategory] = useState('חדש');
  const [menuOpen, setMenuOpen] = useState(false);
  const bannerText = "🔥ליווי אישי לאורח חיים בריא - הנחה מיוחדת לזוגות - מוזמנים ליצור קשר ⏰";

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overscrollBehavior = 'none';
    return () => {
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  const latestPosts = [...posts]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 4);

  const filteredPosts = selectedCategory === 'חדש'
  ? latestPosts
  : posts
      .filter((post) => post.categories?.includes(selectedCategory))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <div className="top-bar-wrapper" dir="rtl">
      <div className="top-screen">
        <div className="top-section">
          <div className="top-bar-buttons">
            <div className="menu-wrapper">        
              <button
                className="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
              &#9776;
              </button> 
            </div>
            {menuOpen && (        
            <div className="menu-dropdown">
              <Link to="/success-stories" className="menu-item">
                {isHebrew ? 'סיפורי הצלחה' : 'Success Stories'}
              </Link>
              <Link to="/TdeeCalculator" className="menu-item">
                {isHebrew ? 'מחשבון הוצאה קלורית יומית ': "TdeeCalculator"}
              </Link>
              <Link to="/BMICalculator" className="menu-item">
                {isHebrew ? 'מחשבון BMI ': "BMICalculator"}
              </Link>
              <Link to="/dashboard" className="menu-item">
                {isHebrew ? 'דאשבורד אישי' : 'Personal Dashboard'}
              </Link>
              <Link to="/print-tips" className="menu-item">הדפס ותלה</Link>
              <Link to="/about" className="menu-item">
                {isHebrew ? 'אודות' : 'About'}
              </Link>
              <Link to="/submit" className="menu-item">
                {isHebrew ? 'שלחו פוסט' : 'About'}
              </Link>
              <Link to="/contact" className="menu-item">
                {isHebrew ? 'צור קשר' : 'Contact'}
              </Link>
            </div>
            )}
            <div className="share-wrapper">
              <Share />
            </div> 
            <div className="accessibility-wrapper" style={{ margin: '0 10px' }}>
              <AccessibilityWidget />
            </div>
            <div className="user-icon-wrapper" style={{ margin: '0 10px' }}>
              <UserIcon />
            </div>
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
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <AnimatedBanner text={bannerText} />
          </Link>
        </div>
      </div>
      <div className="posts-container">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/${lang}/${post.slug}`}
              className="post-link"
            >
              <div>
                <img
                  src={post.image}
                  alt={post.he}
                  className="post-image"
                  loading="lazy"
                />
              </div>
              <div className="post-content">
                <div className="post-tags">
                  {post.categories.map(cat => (
                    <span key={cat}></span>
                  ))}
                </div>
                <h2 className="post-title">
                  {post.categories?.map((cat) => categoryIcons[cat]).join(' ')} {post.he}
                  {isNewPost(post.date) && <span className="new-badge">חדש!</span>}
                </h2>
                <div className="post-meta-wrapper">
                  <div className="post-meta-info">
                    <span className="post-date">{formatDate(post.date)}</span>
                    <span className="post-author">· {post.author}</span>
                  </div>
                  <div className="post-meta-likes">
                    <LikeDisplay slug={post.slug} />
                  </div>
                </div>
                <p className="post-summary">
                  {post.summary}
                </p>
                <span className="post-read-more">
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
  // ... הקוד הקיים ...
}

export default function App() {
  const [showTipsPopup, setShowTipsPopup] = useState(false);
  
  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenTipsPopup');
    
    if (!hasSeenPopup) {
      // Show popup after a short delay to let the page load first
      const timer = setTimeout(() => {
        setShowTipsPopup(true);
        sessionStorage.setItem('hasSeenTipsPopup', 'true');
      }, 1300);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const closeTipsPopup = () => {
    setShowTipsPopup(false);
  };
  
  return (
    <AuthProvider>
      <Router>
        <LoginModal />
        <Routes>
          <Route path="/" element={<LandingPage lang="he" />} />
          <Route path="/he" element={<LandingPage lang="he" />} />
          <Route path="/en" element={<LandingPage lang="en" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/submit" element={<SubmitPost />} />
          <Route path="/TdeeCalculator" element={<TdeeCalculator />} />
          <Route path="/print-tips" element={<PrintTips />} />
          <Route path="/BMICalculator" element={<BMICalculator />}/>
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/unauthorized" element={<UnauthorizedAccess />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <PersonalDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
          {posts.map((post) => (
            <Route key={post.slug + "-he"} path={`/he/${post.slug}`} element={<PostPage slug={post.slug} />} />
          ))}
          {posts.map((post) => (
            <Route key={post.slug + "-en"} path={`/en/${post.slug}`} element={<PostPage slug={post.slug} />} />
          ))}
        </Routes>
        {showTipsPopup && <TipsPopupModal onClose={closeTipsPopup} />}
      </Router>
    </AuthProvider>
  );
}