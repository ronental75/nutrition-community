import React from 'react';
import './about.css'; // Import the CSS file

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">אודות</h1>
        
        <div className="about-profile">
          <div className="profile-image">
            <img src="/images/stack1.jpg" alt="רונן" className="profile-photo" />
          </div>
          <div className="profile-intro">
            <p className="intro-text">
              שמי <strong className="highlight-name">רונן</strong>, בן 49, עוסק בספורט באופן עקבי, מאמן ריצה ומלווה אנשים בתהליכי שינוי לאורח חיים בריא.
            </p>
          </div>
        </div>

        <div className="about-philosophy">
          <p className="philosophy-text">
            מאמין ששינוי אמיתי מתחיל בהרגלים קטנים – כאלה שיוצרים{' '}
            <br></br><strong className="highlight-text">
              שגרה בריאה, מאוזנת ויציבה לאורך זמן
            </strong>
          </p>
        </div>

        <div className="about-background">
          <p>
            ביום יום מנהל תחום מחקרי דאטה במכון סמואלי – מכון לחקר סרטן במרכז דוידוף שבבית החולים בילינסון.<br />
            החיבור לעולם המחקר הרפואי נותן לי פרספקטיבה נוספת בתהליך הליווי לאורח חיים בריא.
          </p>
        </div>

        <div className="service-section">
          <h3 className="section-title">מה כולל הליווי?</h3>
          <ul className="service-list">
            <li className="service-item">
              <span className="check-icon">✔️</span>
              <strong>בניית תפריטי תזונה</strong> 
            </li>
            {/* <span>מותאמים אישית לפי מטרה והעדפה</span> */}
            <li className="service-item">
              <span className="check-icon">✔️</span>
              <strong>תוכניות אימון אישיות</strong>
               {/* המשלבות ריצה, כוח ושיפור סיבולת */}
            </li>
            <li className="service-item">
              <span className="check-icon">✔️</span>
              ליווי שוטף עם תמיכה, מעקב והתאמות לאורך הדרך
            </li>
          </ul>
        </div>

        <div className="education-section">
          <h3 className="section-title">הכשרות מקצועיות</h3>
          <ul className="education-list">
            <li className="education-item">
              <span className="check-icon">✔️</span>
              בוגר וינגייט - מדריכי ריצות ארוכות
            </li>
            <li className="education-item">
              <span className="check-icon">✔️</span>
              בוגר וינגייט במסלול המורחב לתזונת ספורט ולאורח חיים בריא (בהדרכת שגיא הלוי)
            </li>
          </ul>
        </div>

        <div className="contact-section">
          <h3 className="section-title">צור קשר</h3>
          <div className="contact-buttons">
    <a
      href="https://wa.me/972501234567"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-button"
    >
      שלח הודעה 
    </a>
            <a href="tel:+9721234567" className="phone-button">התקשר עכשיו</a>
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