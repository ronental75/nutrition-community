import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-right" dir="rtl">

      {/* שורה עליונה: תמונה מצד שמאל, כותרת מצד ימין */}
      {/* <div className="flex items-center justify-between mb-4">
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
      </div> */}

      {/* תוכן קומפקטי עם פחות ריווחים */}
      <div style={{ lineHeight: '1.45', fontSize: '1.05rem' }}>
        <p className="mb-2">
          שמי <strong>רונן</strong>, ואני מלווה יחידים וזוגות בתהליכי שינוי אמיתי באורח החיים – מתוך מטרה לבנות שגרה בריאה, מאוזנת ויציבה לאורך זמן.
        </p>

        <p className="mb-2">
          אני מאמין ש<strong>תזונה מאוזנת, אורח חיים פעיל, שינה איכותית וניהול מתחים</strong> הם אבני היסוד להשגת מטרות פיזיות ובריאותיות כאחד.
        </p>

        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '1rem 0 0.25rem' }}>
          מה כולל הליווי?
        </h2>
        <ul style={{ paddingRight: '1.2rem', marginBottom: '0.8rem', listStyleType: 'disc' }}>
          <li>בניית תפריטי תזונה מותאמים אישית לפי מטרה והעדפה</li>
          <li>תוכניות אימון אישיות המשלבות ריצה, כוח ושיפור סיבולת</li>
          <li>ליווי שוטף עם תמיכה, מעקב והתאמות לאורך הדרך</li>
        </ul>

        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '1rem 0 0.25rem' }}>
          הכשרות
        </h2>
        <p className="mb-2">
          בוגר וינגייט כמאמן ריצות ארוכות<br />
          הסמכה בתזונת ספורט ואורח חיים בריא (בהדרכת שגיא הלוי)
        </p>

        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '1rem 0 0.25rem' }}>
          רקע אישי
        </h2>
        <p className="mb-2">
          בן 49, רץ ותיק ועוסק בספורט לאורך עשרות שנים – משלב בין ניסיון מעשי לבין ידע מחקרי עדכני.
        </p>

        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '1rem 0 0.25rem' }}>
          רקע מקצועי
        </h2>
        <p className="mb-2">
          מנהל תחום מחקרי הדאטה בתחום הסרטן במכון סמואלי - מרכז דוידוף בית חולים בלינסון.<br />
          החיבור לעולם המחקר מאפשר לי להביא דיוק מדעי וניסיון מעמיק לליווי שאני מעניק.
        </p>
      </div>
    </div>
  );
}
