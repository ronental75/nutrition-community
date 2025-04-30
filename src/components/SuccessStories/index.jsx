import React, { useState } from 'react';
import successStories from './stories';
import SuccessStoryCard from './SuccessStoryCard';
import './SuccessStories.css';

// רכיב עמוד סיפורי הצלחה ראשי
const SuccessStories = () => {
  // ניהול הסיפור הנבחר
  const [selectedStoryId, setSelectedStoryId] = useState(successStories[0]?.id || null);
  
  // מציאת הסיפור הנבחר או הסיפור הראשון כברירת מחדל
  const selectedStory = selectedStoryId 
    ? successStories.find(story => story.id === selectedStoryId) 
    : successStories[0];

  // אם אין סיפורים, הצג הודעה
  if (!successStories.length) {
    return (
      <div className="success-stories-container" dir="rtl">
        <div className="success-stories-header">
          <h1 className="success-stories-title">סיפורי הצלחה</h1>
          <p className="success-stories-subtitle">סיפורי הצלחה יתווספו בקרוב</p>
        </div>
      </div>
    );
  }

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
        {successStories.map(story => {
          const totalLoss = (story.startWeight - story.currentWeight).toFixed(1);
          const percentageLoss = Math.round((totalLoss / story.startWeight) * 100);
          
          return (
            <button
              key={story.id}
              className={`story-tab ${selectedStory.id === story.id ? 'active' : ''}`}
              onClick={() => setSelectedStoryId(story.id)}
            >
              <div className="story-tab-content">
          <div className="story-tab-name">
            {story.name} {story.gender === 'female' ? 'בת' : 'בן'} {story.age}
          </div>
          <div className="story-tab-description">
            {story.gender === 'female' ? 'ירדה' : 'ירד'} {totalLoss} ק"ג
          </div>
        </div>
            </button>
          );
        })}
      </div>
      
      {/* תצוגת סיפור הצלחה נבחר */}
      <div className="success-story-display">
        {selectedStory && <SuccessStoryCard story={selectedStory} />}
      </div>
      
      {/* <div className="success-stories-cta">
        <h2>רוצים להיות הסיפור הבא?</h2>
        <p>בואו נבנה יחד תוכנית ליווי אישית שמתאימה בדיוק לכם</p>
        <a href="/contact" className="cta-button">צרו קשר עכשיו</a>
      </div> */}
    </div>
  );
};

export default SuccessStories;