// TipsPopupModal.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TipsPopupModal.css';

export default function TipsPopupModal({ onClose }) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Clean up timers
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [onClose]);

  return (
    <div className="tips-modal-overlay" onClick={onClose}>
      <div className="tips-modal-content" dir="rtl" onClick={(e) => e.stopPropagation()}>
        <button className="tips-close-button" onClick={onClose}>✕</button>
        <div className="tips-countdown-timer">{countdown}</div>
        
        <h1 className="tips-poster-title">8 טיפים לאורח חיים בריא</h1>

        <ol className="tips-list-rtl">
          <li><span>תזונה מאוזנת:</span> שלבו ירקות, חלבון איכותי ופחמימות מלאות בכל ארוחה.</li>
          <li><span>פעילות גופנית:</span> הכניסו לשגרה פעילות גופנית שכוללת אימוני כוח ואירובי.</li>
          <li><span>שינה איכותית:</span> 7–9 שעות בלילה תורמות לבריאות פיזית ונפשית.</li>
          <li><span>שתייה מרובה:</span> לפחות 8 כוסות מים ביום לשמירה על ריכוז ואנרגיה.</li>
          <li><span>צריכת חלבון:</span> התאימו את כמות החלבון למטרה האישית שלכם.</li>
          <li><span>ניהול מתחים:</span> מצאו את שיטת האיזון שמתאימה לכם.</li>
          <li><span>הכנה מראש:</span> תכננו ארוחות מראש כדי להימנע מפיתויים.</li>
          <li><span>התמדה:</span> הרגלים קטנים ועקביים מביאים לתוצאות גדולות.</li>
        </ol>

        <div className="tips-footer">
          <Link to="/print-tips" className="tips-print-link">לצפייה והדפסה</Link>
        </div>
      </div>
    </div>
  );
}