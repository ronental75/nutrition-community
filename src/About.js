import React from 'react';
import './about.css'; // Import the CSS file

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">אודות</h1>
        
        <div className="about-profile">
          <div className="profile-image">
            <img src="/images/stack1.jpg" alt="רונן" className="profile-photo" loading="lazy"/>
          </div>
          <div className="profile-intro">
            <p className="intro-text">
              שלום, שמי <strong className="highlight-name">רונן</strong>, בן 49, מאמן ריצה מוסמך ומומחה לאורח חיים בריא.<br></br>מנחה תהליכי הורדה במשקל תוך שינוי הרגלים, שיפור כושר גופני והשגת יעדי בריאות ארוכי טווח.
            </p>
          </div>
        </div>

        <div className="about-philosophy">
          <p className="philosophy-text">
            הפילוסופיה שלי מתבססת על העיקרון ששינוי אמיתי מתחיל בצעדים קטנים וישימים –{' '}
            <br/><strong className="highlight-text">
              המפתח להצלחה הוא יצירת שגרה בריאה, מאוזנת ויציבה לאורך זמן
            </strong>
          </p>
        </div>

        <div className="about-background">
          <p>
            בחיי המקצועיים אני מנהל תחום מחקרי דאטה במכון סמואלי – מכון לחקר סרטן במרכז דוידוף שבבית החולים בילינסון.<br />
            החיבור לעולם המחקר הרפואי נותן לי פרספקטיבה נוספת בתהליך הליווי לאורח חיים בריא.
            </p>
          <p>
            כספורטאי, אני רץ למרחקים ארוכים ומתאמן באופן קבוע בחדר כושר. מאמין בשילוב אופטימלי בין אימוני סיבולת, אימוני כוח ותזונה מאוזנת כבסיס לשינוי אמיתי ובר-קיימא באורח החיים.
          </p>
        </div>

        
        <div className="service-section">
          <h3 className="section-title">תוכנית הליווי</h3>
          <p style={{ marginBottom: '1rem' }}>
          אני מציע תוכנית ליווי אישית מקיפה <strong>בת 13 שבועות</strong>, המותאמת במדויק לצרכים וליעדים האישיים שלך:
          </p>
          <ul className="service-list">
            <li className="service-item">
              <span className="check-icon">✔️</span>  פגישת היכרות ראשונית לניתוח מצב קיים והגדרת יעדים  (אפשרי באופן מכוון)
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span> בניית תפריט תזונה מותאם אישית עם התייחסות לטעמים והעדפות אישיות
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span> תוכנית אימונים משולבת הכוללת אימוני כוח ואירובי
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span> פגישות מכוונות שבועיות או דו-שבועיות למעקב, חיזוק מוטיבציה והתאמות
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span> מדידות ושקילות תקופתיות לניטור התקדמות וביצוע התאמות נדרשות
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span> כלים להתמודדות עם אתגרים צפויים ומניעת נסיגה להרגלים ישנים
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span> זמינות מלאה לתמיכה, ייעוץ ומענה לשאלות דרך WhatsApp
            </li>
            {/* <li className="service-item">
              <span className="check-icon">✔️</span> תוכנית המשך אישית לשמירה על ההישגים לאחר סיום תקופת הליווי
            </li> */}
          </ul>
        </div>
        <div className="approach-section">
          <h3 className="section-title">הגישה שלי לאימון אישי</h3>
          <p>
            אני מאמין שכל אדם הוא ייחודי, ולכן תהליך השינוי חייב להיות מותאם אישית.<br></br> הליווי שלי מבוסס על:
          </p>
          <ul className="approach-list">
            <li className="approach-item">
              <span className="bullet-icon"></span> <strong>הדרגתיות</strong> – שינויים קטנים ועקביים שמצטברים לתוצאות משמעותיות
            </li>
            <li className="approach-item">
              <span className="bullet-icon"></span> <strong>מדידה וניטור</strong> – מעקב שיטתי אחר נתונים לצורך התאמות מדויקות
            </li>
            <li className="approach-item">
              <span className="bullet-icon"></span> <strong>איזון</strong> – שילוב נכון בין תזונה, פעילות גופנית ומנוחה
            </li>
            <li className="approach-item">
              <span className="bullet-icon"></span> <strong>התמדה</strong> – בניית הרגלים שיימשכו הרבה אחרי תום תקופת הליווי
            </li>
          </ul>
        </div>

        {/* <div className="results-section">
          <h3 className="section-title">תוצאות שתוכל/י לצפות להן</h3>
          <ul className="results-list">
            <li className="results-item">
              <span className="star-icon">★</span> ירידה במשקל והפחתת אחוזי שומן באופן בריא 
            </li>
            <li className="results-item">
              <span className="star-icon">★</span> שיפור משמעותי ברמת הכושר, הסיבולת והכוח
            </li>
            <li className="results-item">
              <span className="star-icon">★</span> הטמעת הרגלי תזונה בריאים ומקיימים
            </li>
            <li className="results-item">
              <span className="star-icon">★</span> שיפור איכות השינה, רמות האנרגיה והמצב הרוח
            </li>
            <li className="results-item">
              <span className="star-icon">★</span> רכישת כלים וידע שיישארו איתך לשנים קדימה
            </li>
          </ul>
        </div> */}

        <div className="education-section">
          <h3 className="section-title">הכשרות מקצועיות</h3>
          <ul className="education-list">
            <li className="education-item">
              <span className="check-icon">✔️</span> בוגר מכון וינגייט - מדריך מוסמך לריצות ארוכות
            </li>
            <li className="education-item">
              <span className="check-icon">✔️</span> בוגר התוכנית המורחבת במכון וינגייט לתזונת ספורט ואורח חיים בריא (בהדרכת שגיא הלוי)
            </li>
            {/* <li className="education-item">
              <span className="check-icon">✔️</span> השתלמויות מקצועיות בתחומי תזונה, פיזיולוגיה של המאמץ ושיקום פציעות ספורט
            </li> */}
          </ul>
        </div>

        {/* <div className="testimonial-section">
          <h3 className="section-title">מה אומרים המתאמנים שלי</h3>
          <div className="testimonial-container">
            <div className="testimonial-item">
              <p className="testimonial-text">
                "הליווי של רונן שינה לי את החיים. לא רק שירדתי במשקל, אלא שהצלחתי לשמור עליו כבר שנתיים. הגישה המדורגת והמותאמת אישית עשתה את ההבדל."
              </p>
              <p className="testimonial-author">— ענת, בת 43</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "חיפשתי מישהו שיבין שאני לא ספורטאי מקצועי אלא אדם עסוק שרוצה להיות בריא יותר. רונן הצליח לבנות לי תוכנית שמשתלבת בחיים האמיתיים שלי."
              </p>
              <p className="testimonial-author">— אלון, בן 51</p>
            </div>
          </div>
        </div> */}

        <div className="contact-section">
          <h3 className="section-title">צור קשר</h3>
          <p className="contact-intro">
            מוכנים להתחיל במסע לאורח חיים בריא יותר? אשמח לשוחח ולהסביר בפירוט כיצד אוכל לסייע בהשגת היעדים שלכם.
          </p>
          <div className="contact-buttons">
            <a
              href="https://wa.me/972544974531?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A8%D7%95%D7%A0%D7%9F%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%9E%D7%99%D7%93%D7%A2%20%D7%A0%D7%95%D7%A1%D7%A3%20%D7%A2%D7%9C%20%D7%94%D7%9C%D7%99%D7%95%D7%95%D7%99%20%D7%9C%D7%90%D7%95%D7%A8%D7%97%20%D7%97%D7%99%D7%99%D7%9D%20%D7%91%D7%A8%D7%99%D7%90%20%D7%A9%D7%90%D7%AA%D7%94%20%D7%9E%D7%A6%D7%99%D7%A2."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              שלח הודעת WhatsApp
            </a>
            <a href="tel:+972544974531" className="phone-button">התקשר עכשיו</a>
          </div>
        </div>

        <div className="return-button-container">
          <a href="/he" className="return-button">
            חזרה לדף הראשי
          </a>
        </div>
      </div>
    </div>
  );
}