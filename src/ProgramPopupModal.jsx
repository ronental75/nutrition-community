import React, { useEffect, useState } from 'react';
import './ProgramPopupModal.css';

const ProgramPopupModal = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  
  useEffect(() => {
    // טיימר שיסגור את הפופאפ אחרי 15 שניות
    const timer = setTimeout(() => {
      onClose();
    }, 20000);
    
    // טיימר לעדכון הספירה לאחור
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    
    // ניקוי הטיימרים בעת עזיבת הקומפוננטה
    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [onClose]);
  const shareWithFriend = () => {
    // הכנת טקסט להודעה
    const shareText = "היי, חשבתי שזה יעניין אותך - תוכנית ליווי של 13 שבועות לאורח חיים בריא ולהשגת היעדים שלך: https://yourdomain.com/about";
    
    // בדיקה אם יש תמיכה ב-Web Share API
    if (navigator.share) {
      navigator.share({
        title: 'תוכנית ליווי לאורח חיים בריא',
        text: shareText,
        url: 'https://nutrition-community.vercel.app/about',
      })
      .catch((error) => console.log('שגיאה בשיתוף:', error));
    } else {
      // גיבוי למקרה שאין תמיכה ב-Web Share API - פתיחת WhatsApp
      const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappLink, '_blank');
    }
  };
  return (
    <div className="program-popup-overlay">
      <div className="program-popup-modal">
        <div className="program-popup-content">
          <button className="program-popup-close" onClick={onClose}>✕</button>
          
          <h2 className="program-popup-title">תוכנית ליווי אישית לאורח חיים בריא</h2>
          
          <div className="program-popup-details">
          <div className="program-popup-highlight">
          <span className="program-popup-duration">13 שבועות</span> להשגת היעדים שלך בליווי מקצועי ומוכח
          </div>
            
            <ul className="program-popup-features">
              <li><span className="program-popup-checkmark">✓</span> תפריט תזונה מותאם אישית</li>
              <li><span className="program-popup-checkmark">✓</span> תוכנית אימונים משולבת (כוח + אירובי)</li>
              <li><span className="program-popup-checkmark">✓</span> פגישות מעקב ותמיכה שוטפת</li>
              <li><span className="program-popup-checkmark">✓</span> דשבורד מעקב דיגיטלי אישי לניטור התקדמות</li>
              <li><span className="program-popup-checkmark">✓</span> זמינות מלאה לתמיכה בWhatsApp</li>
            </ul>
          </div>
          
          <div className="program-popup-cta">
            <a 
              href="https://wa.me/972544974531?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A8%D7%95%D7%A0%D7%9F%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%9E%D7%99%D7%93%D7%A2%20%D7%A0%D7%95%D7%A1%D7%A3%20%D7%A2%D7%9C%20%D7%94%D7%9C%D7%99%D7%95%D7%95%D7%99%20%D7%9C%D7%90%D7%95%D7%A8%D7%97%20%D7%97%D7%99%D7%99%D7%9D%20%D7%91%D7%A8%D7%99%D7%90%20%D7%A9%D7%90%D7%AA%D7%94%20%D7%9E%D7%A6%D7%99%D7%A2." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="program-popup-button"
            >
              דבר\י איתי עכשיו
            </a>
            <a 
              href="/about" 
              className="program-popup-link"
            >
              למידע נוסף
            </a>
            <span className="program-popup-link-separator">|</span>
              
              <button 
                onClick={shareWithFriend}
                className="program-popup-share-link"
              >
                מכיר\ה מישהו שזקוק לשינוי?
              </button>
          </div>
          
          <div className="program-popup-timer">
            החלון ייסגר בעוד {timeLeft} שניות
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPopupModal;