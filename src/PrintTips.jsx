import React from 'react';
import './PrintTips.css';
import { useNavigate } from 'react-router-dom';

export default function PrintTips() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="about-container" dir="rtl">
      <div className="about-content styled-poster">
        <h1 className="poster-title">8 טיפים לאורח חיים בריא</h1>

        <ol className="tip-list-rtl">
          <li><span>תזונה מאוזנת:</span> שלבו ירקות, חלבון איכותי ופחמימות מלאות בכל ארוחה.</li>
          <li><span>פעילות גופנית:</span> הכניסו לשגרה פעילות גופנית שכוללת אימוני כוח ואירובי.</li>
          <li><span>שינה איכותית:</span> 7–9 שעות בלילה תורמות לבריאות פיזית ונפשית.</li>
          <li><span>שתייה מרובה:</span> לפחות 8 כוסות מים ביום לשמירה על ריכוז ואנרגיה.</li>
          <li><span>צריכת חלבון:</span> התאימו את כמות החלבון למטרה האישית שלכם.</li>
          <li><span>ניהול מתחים:</span> מצאו את שיטת האיזון שמתאימה לכם </li>
          <li><span>הכנה מראש:</span> תכננו ארוחות מראש כדי להימנע מפיתויים.</li>
          <li><span>התמדה:</span> הרגלים קטנים ועקביים מביאים לתוצאות גדולות.</li>
        </ol>

        <div className="contact-section no-print">
          <div className="contact-buttons">
            <button onClick={handlePrint} className="contact-button">שמור כ-PDF</button>
            {/* <div className="return-button-container"> */}
                <a href="/he" className="return-button">
            חזרה לדף הראשי
          </a>
        {/* </div> */}
          </div>
        </div>
        
      </div>
    </div>
  );
}