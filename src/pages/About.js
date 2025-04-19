import React from 'react';

export default function About() {
  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-4 py-10 text-blue-900 leading-relaxed">
      <img
      src="/images/ronen.jpg"
      alt="רונן"
      style={{
        width: '64px',
        height: '80px',
        objectFit: 'cover',
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        border: '2px solid white',
      }}
/>
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center border-b pb-4">
        אודות
      </h1>

      <p className="mb-4 text-lg">
        שמי <strong className="text-blue-900 font-semibold">רונן</strong>, ואני מלווה יחידים וזוגות בתהליכי שינוי אמיתי באורח החיים – מתוך מטרה לבנות שגרה בריאה, מאוזנת ויציבה לאורך זמן.
      </p>

      <p className="mb-4 text-lg">
        אני מאמין ש<strong className="text-blue-800">תזונה מאוזנת, אורח חיים פעיל, שינה איכותית וניהול מתחים</strong> – הם אבני היסוד להשגת מטרות פיזיות ובריאותיות כאחד.
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-2">מה כולל הליווי?</h2>
        <ul className="list-disc pr-5 text-lg text-blue-900">
          <li>בניית <strong className="text-blue-900">תפריטי תזונה מותאמים אישית</strong> לפי מטרה והעדפה</li>
          <li><strong className="text-blue-900">תוכניות אימון</strong> אישיות המשלבות ריצה, כוח ושיפור סיבולת</li>
          <li><strong className="text-blue-900">ליווי שוטף</strong> עם תמיכה, מעקב והתאמות לאורך הדרך</li>
        </ul>
      </div>

      <div className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2">הכשרות</h2>
        <p className="text-lg">
          בוגר וינגייט כמאמן ריצות ארוכות<br />
          הסמכה בתזונת ספורט ואורח חיים בריא (בהדרכת שגיא הלוי)
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-2">רקע אישי</h2>
        <p className="text-lg">
          בן 49, רץ ותיק ועוסק בספורט לאורך עשרות שנים – משלב בין ניסיון מעשי לבין ידע מחקרי עדכני.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-2">רקע מקצועי</h2>
        <p className="text-lg">
          מנהל תחום מחקרי הדאטה במכון סמואלי, בית החולים בילינסון – מתמקד במחקר סרטן.  
          החיבור לעולם המחקר מאפשר לי להביא דיוק מדעי וניסיון מעמיק לליווי שאני מעניק.
        </p>
      </div>
    </div>
  );
}
