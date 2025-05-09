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
// import TipsPopupModal from './TipsPopupModal';
import ProgramPopupModal from './ProgramPopupModal'; // וודא שהנתיב נכון
import './ProgramPopupModal.css'
import './styles/auth-styles.css';
import { AuthProvider, useAuth, UserIcon, LoginModal, UnauthorizedAccess } from './components/auth/AuthComponents';
import AdminPanel from './components/admin/AdminPanel';
import './styles/auth-styles.css';
import './components/admin/AdminPanel.css';
import PersonalDashboard from './components/dashboard/PersonalDashboard';
import InstallAppButton from './InstallAppButton'; // נדרש לייבא את הרכיב
import './InstallAppButton.css'; // נדרש לייבא את הרכיב
import { getAuth } from 'firebase/auth';


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
  return (
    <div className="overflow-x-auto scrollbar-hide">

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
    </div>
  );

}



function isNewPost(dateStr) {
const postDate = new Date(dateStr);
const now = new Date();
const diffInDays = (now - postDate) / (1000 * 60 * 60 * 24);
return diffInDays <= 7;
}

function formatDate(dateStr) {
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const dateObj = new Date(dateStr);
return dateObj.toLocaleDateString('he-IL', options);
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
              <InstallAppButton />
            </div>
            {menuOpen && (        
            <div className="menu-dropdown">
              <Link to="/about" className="menu-item">
                {isHebrew ? 'תוכנית ליווי תזונה וספורט' : 'About'}
              </Link>
              <Link to="/success-stories" className="menu-item">
                {isHebrew ? 'סיפורי לקוחות' : 'Success Stories'}
              </Link>
              <Link to="/dashboard" className="menu-item">
                {isHebrew ? 'דאשבורד מעקב' : 'Personal Dashboard'}
              </Link>
              <Link to="/TdeeCalculator" className="menu-item">
                {isHebrew ? 'מחשבון הוצאה קלורית יומית ': "TdeeCalculator"}
              </Link>
              <Link to="/BMICalculator" className="menu-item">
                {isHebrew ? 'מחשבון BMI ': "BMICalculator"}
              </Link>
              
              <Link to="/print-tips" className="menu-item">הדפס ותלה</Link>
              
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
          <div className="subtle-links-container">
            <Link to="/about" className="subtle-link">
              <strong>תוכנית ליווי תזונה וספורט</strong>
            </Link>
            <span className="link-separator">|</span>
            <Link to="/success-stories" className="subtle-link">
              <strong>סיפורי לקוחות</strong>
            </Link>
          </div>
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
  const post = posts.find((p) => p.slug === slug);
  const navigate = useNavigate();

  if (!post) return <div className="p-6 text-center">Post not found</div>;

  const goBack = () => {
    navigate('/');
  };

  return (
    <div dir="rtl" className="post-page-container">
      {/* Top blue bar fixed at the top */}
      <div className="post-top-bar">
        <div className="post-top-bar-buttons">
          {/* Back button */}
          <div className="back-button-wrapper">
            <button className="back-button" onClick={goBack}>
              &#8592; {/* Left arrow */}
            </button>
          </div>
          
          {/* Share button */}
          <div className="share-wrapper">
            <Share />
          </div>
          
          {/* Accessibility button */}
          <div className="accessibility-wrapper">
            <AccessibilityWidget />
          </div>
        </div>
      </div>
      
      {/* מעטפת חדשה לכותרת עם מרווח מהחלק העליון */}
      <div className="title-wrapper">
        {/* Sticky title section */}
        <div className="post-title-container">
          <h1 className="post-page-title">{post.he}</h1>
          {/* <div className="post-meta">
            <span className="post-date">{formatDate(post.date)}</span>
            <span className="post-author">· {post.author}</span>
            <div className="post-categories">
              {post.categories.map(cat => (
                <span key={cat} className="post-category">
                  {categoryIcons[cat]} {cat}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="post-content-container">
        <iframe
          src={post.file}
          className="post-iframe"
          title={post.slug}
        />
      </div>
      <br></br>
      {/* Fixed like/dislike section at the bottom */}
      <div className="post-actions-container">
        <LikeDislike slug={post.slug} />
      </div>
    </div>
  );
}
// const { currentUser, loading } = useAuth(); // הוק אימות קיים
export default function App() {
  const [showTipsPopup, setShowTipsPopup] = useState(false);
  
  useEffect(() => {
    // בדיקה אם הפופאפ כבר הוצג בסשן זה
    const hasSeenPopup = sessionStorage.getItem('hasSeenTipsPopup');
    if (hasSeenPopup) return; // אם כבר ראה, לא צריך להמשיך
    
    try {
      // קבלת האובייקט auth - אם יש בעיה, נתפוס אותה ב-catch
      const auth = getAuth();
      
      // בדיקה פשוטה אם המשתמש מחובר - בדיקה חד פעמית
      const isLoggedIn = !!auth.currentUser;
      
      console.log("מצב התחברות:", isLoggedIn ? "מחובר" : "לא מחובר");
      
      // אם המשתמש לא מחובר, מציגים את הפופאפ
      if (!isLoggedIn) {
        const timer = setTimeout(() => {
          console.log("מציג פופאפ - המשתמש לא מחובר");
          setShowTipsPopup(true);
          sessionStorage.setItem('hasSeenTipsPopup', 'true');
        }, 1300);
        
        return () => clearTimeout(timer);
      } else {
        console.log("לא מציג פופאפ - המשתמש מחובר");
      }
    } catch (error) {
      // במקרה של שגיאה, נרשום אותה ולא נציג את הפופאפ
      console.error("שגיאה בבדיקת מצב התחברות:", error);
    }
  }, []); // ריצה פעם אחת בלבד
  
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
        {showTipsPopup && <ProgramPopupModal onClose={closeTipsPopup} />}
      </Router>
    </AuthProvider>
  );
}