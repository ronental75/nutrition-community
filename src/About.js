import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-right" dir="rtl">
      
      {/* שורה עליונה: תמונה מצד שמאל, כותרת מצד ימין */}
      <div className="flex items-center justify-between mb-4">
      <img
    src="/images/ronen.jpg"
    alt="רונן"
    style={{
      width: '70px',
      height: '70px',
      objectFit: 'cover',
      marginLeft: '1rem',
      flexShrink: 0,
    }}
  />
  <h1
    className="page-title"
    style={{
      textAlign: 'right',
      margin: 0,
      flex: 1,
    }}
  >
    אודות
  </h1>

  
</div>

      {/* טקסטים מרווחים בצורה קומפקטית */}
      <div style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>
        <p>
          שמי <strong>רונן</strong>, ואני מלווה יחידים וזוגות בתהליכי שינוי אמיתי באורח החיים – מתוך מטרה לבנות שגרה בריאה, מאוזנת ויציבה לאורך זמן.
        </p>

        <p>
          אני מאמין ש<strong>תזונה מאוזנת, אורח חיים פעיל, שינה איכותית וניהול מתחים</strong> הם אבני היסוד להשגת מטרות פיזיות ובריאותיות כאחד.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">מה כולל הליווי?</h2>
        <ul className="list-disc pr-5 mb-4">
          <li>בניית תפריטי תזונה מותאמים אישית לפי מטרה והעדפה</li>
          <li>תוכניות אימון אישיות המשלבות ריצה, כוח ושיפור סיבולת</li>
          <li>ליווי שוטף עם תמיכה, מעקב והתאמות לאורך הדרך</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4 mb-2">הכשרות</h2>
        <p className="mb-4">
          בוגר וינגייט כמאמן ריצות ארוכות<br />
          הסמכה בתזונת ספורט ואורח חיים בריא (בהדרכת שגיא הלוי)
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">רקע אישי</h2>
        <p className="mb-4">
          בן 49, רץ ותיק ועוסק בספורט לאורך עשרות שנים – משלב בין ניסיון מעשי לבין ידע מחקרי עדכני.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">רקע מקצועי</h2>
        <p>
          מנהל תחום מחקרי הדאטה במכון סמואלי, בית החולים בילינסון – מתמקד במחקר סרטן.  
          החיבור לעולם המחקר מאפשר לי להביא דיוק מדעי וניסיון מעמיק לליווי שאני מעניק.
        </p>
      </div>
    </div>
  );
}
