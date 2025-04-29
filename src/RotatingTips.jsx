import React, { useState, useEffect } from 'react';
import './RotatingTips.css';

const RotatingTips = () => {
  const tips = [
    {
      category: 'תזונה',
      text: 'הקפד על שתיית לפחות 8 כוסות מים ביום לשמירה על הידרציה טובה',
      icon: '💧'
    },
    {
      category: 'ספורט',
      text: 'אימון של 20 דקות בדופק גבוה יעיל יותר לשריפת שומן מריצה איטית ארוכה',
      icon: '🏃'
    },
    {
      category: 'אורח חיים בריא',
      text: '7-8 שעות שינה בלילה חיוניות לשמירה על הורמוני הרעב והשובע בגוף',
      icon: '😴'
    },
    {
      category: 'תזונה',
      text: 'אכילת מנת חלבון בכל ארוחה תורמת לתחושת שובע ולשמירה על מסת שריר',
      icon: '🥩'
    },
    {
      category: 'ספורט',
      text: 'שלב אימוני כוח עם אימוני קרדיו לשריפת שומן אופטימלית',
      icon: '💪'
    },
    {
      category: 'אורח חיים בריא',
      text: 'קח הפסקה של 5 דקות מהמסך כל שעה לשמירה על בריאות העיניים',
      icon: '👁️'
    },
    {
      category: 'תזונה',
      text: 'הוסף לתפריט מגוון של פירות וירקות בצבעים שונים לקבלת מגוון נוגדי חמצון',
      icon: '🥗'
    },
    {
      category: 'ספורט',
      text: 'מתיחות לאחר אימון מפחיתות כאבי שרירים ומשפרות את הגמישות',
      icon: '🧘'
    },
    // {
    //   category: 'אורח חיים בריא',
    //   text: 'צמצום צריכת סוכר מעובד משפר את מצב הרוח ואת רמות האנרגיה',
    //   icon: '🍬'
    // },
  ];

  const [currentTip, setCurrentTip] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      
      setTimeout(() => {
        setCurrentTip((prevTip) => (prevTip + 1) % tips.length);
        setFadeState('fade-in');
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [tips.length]);

  const tip = tips[currentTip];

  return (
    <div className="tips-container">
      {/* <h2 className="tips-title">טיפ היום</h2> */}
      
      <div className={`tips-content ${fadeState}`}>
        <div className="tips-layout">
          <div className="tips-icon">{tip.icon}</div>
          <div className="tips-text">
            <div className="tips-category">{tip.category}</div>
            <p className="tips-message">{tip.text}</p>
          </div>
        </div>
      </div>
      
      <div className="tips-indicators">
        {tips.map((_, index) => (
          <span 
            key={index}
            className={`tips-indicator ${currentTip === index ? 'tips-indicator-active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default RotatingTips;