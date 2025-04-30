import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SuccessStories.css';

const SuccessStories = () => {
  // מערך של סיפורי הצלחה
  const successStories = [
    {
      id: 'story1',
      name: 'ה\'',
      age: 48,
      gender: 'female',
      height: 168,
      startWeight: 80.8,
      currentWeight: 66.8,
      shortDescription: 'התחילה את התהליך מיואשת לאחר שעברה פגישות עם אנשי מקצוע שאמרו שאין מה לעשות.... הגנים אשמים',
      fullDescription: 'ה\' התחילה את התהליך כשהיא מיואשת לאחר שעברה פגישות עם אנשי מקצוע שאמרו לה שאין מה לעשות ושהגנים הם האשמים. באמצעות תהליך מאוזן של ירידה במשקל, הצליחה להוריד 14 ק"ג!',
      quote: 'אני לא האמנתי שניתן לרדת במשקל באופן בריא ומאוזן, אחרי שכל כך הרבה אנשי מקצוע אמרו לי שזה בגלל הגנים שלי. היום אני מרגישה קלילה יותר ומלאת אנרגיה, וגיליתי שזה אפשרי כשיש ליווי נכון שמחזיר את השליטה לידיים שלי.',
      weightData: [
        { date: '06/11/2024', weight: 80.8, change: 0 },
        { date: '13/11/2024', weight: 79.7, change: -1.1 },
        { date: '20/11/2024', weight: 78.8, change: -0.9 },
        { date: '27/11/2024', weight: 78.0, change: -0.8 },
        { date: '11/12/2024', weight: 76.1, change: -1.9 },
        { date: '18/12/2024', weight: 75.4, change: -0.7 },
        { date: '25/12/2024', weight: 74.9, change: -0.5 },
        { date: '01/01/2025', weight: 74.0, change: -0.9 },
        { date: '08/01/2025', weight: 74.3, change: 0.3 },
        { date: '15/01/2025', weight: 73.1, change: -1.2 },
        { date: '29/01/2025', weight: 72.3, change: -0.8 },
        { date: '05/02/2025', weight: 71.5, change: -0.8 },
        { date: '12/02/2025', weight: 70.8, change: -0.7 },
        { date: '19/02/2025', weight: 70.4, change: -0.4 },
        { date: '12/03/2025', weight: 69.6, change: -0.8 },
        { date: '26/03/2025', weight: 68.6, change: -1.0 },
        { date: '02/04/2025', weight: 67.8, change: -0.8 },
        { date: '16/04/2025', weight: 67.2, change: -0.6 },
        { date: '30/04/2025', weight: 66.8, change: -0.4 }
      ],
      image: '/api/placeholder/400/300' // להחליף בתמונה אמיתית כשיש
    },
    {
      id: 'story2',
      name: 'י\'',
      age: 35,
      gender: 'male',
      height: 178,
      startWeight: 95.5,
      currentWeight: 82.0,
      shortDescription: 'השילוב של עבודה יושבנית ואכילה לא מסודרת גרמו לעלייה הדרגתית במשקל',
      fullDescription: 'י\' הגיע לאחר שנים של הזנחה עצמית, עם עבודה יושבנית שהובילה לעלייה הדרגתית במשקל. הצליח להוריד 13.5 ק"ג ולשפר משמעותית את הבריאות הכללית תוך 6 חודשים.',
      quote: 'לא האמנתי שאוכל לחזור למשקל שהייתי בו בגיל 25. הליווי עזר לי לא רק לרדת במשקל אלא גם לבנות הרגלים חדשים שנשארו איתי גם אחרי סיום התהליך.',
      weightData: [
        { date: '10/10/2024', weight: 95.5, change: 0 },
        { date: '24/10/2024', weight: 93.8, change: -1.7 },
        { date: '07/11/2024', weight: 92.1, change: -1.7 },
        { date: '21/11/2024', weight: 90.6, change: -1.5 },
        { date: '05/12/2024', weight: 89.2, change: -1.4 },
        { date: '19/12/2024', weight: 88.0, change: -1.2 },
        { date: '02/01/2025', weight: 87.3, change: -0.7 },
        { date: '16/01/2025', weight: 86.1, change: -1.2 },
        { date: '30/01/2025', weight: 85.2, change: -0.9 },
        { date: '13/02/2025', weight: 84.4, change: -0.8 },
        { date: '27/02/2025', weight: 83.5, change: -0.9 },
        { date: '13/03/2025', weight: 82.7, change: -0.8 },
        { date: '27/03/2025', weight: 82.0, change: -0.7 }
      ],
      image: '/api/placeholder/400/300' // להחליף בתמונה אמיתית כשיש
    }
    // כאן ניתן להוסיף עוד סיפורי הצלחה בעתיד
  ];

  // ניהול הסיפור הנבחר
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  
  // מציאת הסיפור הנבחר או הסיפור הראשון כברירת מחדל
  const selectedStory = selectedStoryId 
    ? successStories.find(story => story.id === selectedStoryId) 
    : successStories[0];

  return (
    <div className="success-stories-container" dir="rtl">
      <div className="success-stories-header">
        <h1 className="success-stories-title">סיפורי הצלחה אמיתיים</h1>
        <p className="success-stories-subtitle">
          הלקוחות שלנו מספרים על השינוי האמיתי שעברו בתהליך הליווי שלנו
        </p>
      </div>
      
      {/* תצוגת כרטיסיות סיפורי ההצלחה */}
      <div className="success-stories-tabs">
        {successStories.map(story => (
          <button
            key={story.id}
            className={`story-tab ${selectedStory.id === story.id ? 'active' : ''}`}
            onClick={() => setSelectedStoryId(story.id)}
          >
            <div className="story-tab-content">
              <div className="story-tab-name">{story.name}</div>
              <div className="story-tab-stats">
                <span>{story.startWeight - story.currentWeight} ק"ג</span>
                <span className="story-tab-divider">|</span>
                <span>{Math.round(((story.startWeight - story.currentWeight) / story.startWeight) * 100)}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* תצוגת סיפור הצלחה נבחר */}
      <div className="success-story-display">
        <div className="success-story-card">
          <div className="success-story-header-stats">
            <div className="stat-box">
              <h3>גיל</h3>
              <div className="stat-value">{selectedStory.age}</div>
            </div>
            <div className="stat-box">
              <h3>גובה</h3>
              <div className="stat-value">{selectedStory.height} ס"מ</div>
            </div>
            <div className="stat-box">
              <h3>משקל התחלתי</h3>
              <div className="stat-value">{selectedStory.startWeight} ק"ג</div>
            </div>
            <div className="stat-box">
              <h3>משקל נוכחי</h3>
              <div className="stat-value highlight">{selectedStory.currentWeight} ק"ג</div>
            </div>
            <div className="stat-box">
              <h3>סה"כ ירידה</h3>
              <div className="stat-value highlight">{(selectedStory.startWeight - selectedStory.currentWeight).toFixed(1)} ק"ג</div>
            </div>
          </div>
          
          <div className="success-story-intro">
            <div className="success-story-image">
              <img src={selectedStory.image} alt={`סיפור ההצלחה של ${selectedStory.name}`} />
            </div>
            <div className="success-story-description">
              <h2>הסיפור של {selectedStory.name}</h2>
              <p>{selectedStory.fullDescription}</p>
            </div>
          </div>
          
          <div className="success-story-quote">
            <div className="quote-mark left">"</div>
            <p className="quote-text">{selectedStory.quote}</p>
            <div className="quote-mark right">"</div>
            <p className="quote-author">- {selectedStory.name}, {selectedStory.gender === 'female' ? 'בת' : 'בן'} {selectedStory.age}</p>
          </div>
          
          <div className="success-story-progress">
            <h3>מעקב התקדמות</h3>
            
            <div className="chart-container">
              <div className="weight-chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={selectedStory.weightData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => {
                        const parts = value.split('/');
                        return `${parts[0]}/${parts[1]}`;
                      }}
                    />
                    <YAxis 
                      domain={['dataMin - 1', 'dataMax + 1']} 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} ק"ג`, 'משקל']}
                      labelFormatter={(label) => `תאריך: ${label}`}
                      contentStyle={{ direction: 'rtl', textAlign: 'right' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#0d9488"
                      strokeWidth={2}
                      name="משקל (ק״ג)"
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="weight-table">
                <div className="weight-table-header">
                  <div className="weight-table-cell">תאריך</div>
                  <div className="weight-table-cell">משקל (ק"ג)</div>
                  <div className="weight-table-cell">שינוי (ק"ג)</div>
                </div>
                <div className="weight-table-body">
                  {selectedStory.weightData.map((entry, index) => (
                    <div key={index} className="weight-table-row">
                      <div className="weight-table-cell">{entry.date}</div>
                      <div className="weight-table-cell weight-value">{entry.weight}</div>
                      <div className={`weight-table-cell ${
                        entry.change > 0 
                          ? 'weight-gain' 
                          : entry.change < 0 
                            ? 'weight-loss' 
                            : ''
                      }`}>
                        {entry.change > 0 ? '+' : ''}{entry.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="success-story-contact">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <div className="contact-text">
              <p>מתלבטים אם התהליך מתאים לכם? ניתן לשוחח עם {selectedStory.name} ולשמוע באופן ישיר על חווית הליווי לפני תחילת התהליך.</p>
              <a href="/contact" className="contact-link">צרו קשר לתיאום שיחה &larr;</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="success-stories-cta">
        <h2>רוצים להיות הסיפור הבא?</h2>
        <p>בואו נבנה יחד תוכנית ליווי אישית שמתאימה בדיוק לכם</p>
        <a href="/contact" className="cta-button">צרו קשר עכשיו</a>
      </div>
    </div>
  );
};

export default SuccessStories;