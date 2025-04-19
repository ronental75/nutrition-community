import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-right" dir="rtl">
      <div className="leading-relaxed text-[1.05rem] space-y-4 text-gray-800">

        <p className="mb-2">
          שמי <strong className="text-blue-800 font-semibold">רונן</strong>, בן 49, עוסק בספורט באופן עקבי מזה עשרות שנים, חוקר תזונה ומלווה אנשים בתהליכי שינוי לאורח חיים בריא.
        </p>

        <p className="mb-2">
          מאמין ששינוי אמיתי מתחיל בהרגלים קטנים – כאלה שיוצרים{' '}
          <strong className="text-blue-700 underline decoration-blue-300 decoration-2 underline-offset-2">
            שגרה בריאה, מאוזנת ויציבה לאורך זמן
          </strong>.
        </p>

        <p className="mb-2">
          ביום יום מנהל תחום מחקרי דאטה בתחום הסרטן במכון סמואלי – מרכז דוידוף, בית החולים בילינסון.<br />
          החיבור לעולם המחקר מאפשר לי לשלב בתהליך הליווי דיוק מדעי וחשיבה מבוססת-נתונים.
        </p>

        <h3 className="mt-6 mb-0 font-semibold text-lg text-blue-900">מה כולל הליווי?</h3>
        <p className="mt-1">
          ✔️ בניית תפריטי תזונה מותאמים אישית לפי מטרה והעדפה<br />
          ✔️ תוכניות אימון אישיות המשלבות ריצה, כוח ושיפור סיבולת<br />
          ✔️ ליווי שוטף עם תמיכה, מעקב והתאמות לאורך הדרך
        </p>

        <h3 className="mt-6 mb-0 font-semibold text-lg text-blue-900">הכשרות מקצועיות</h3>
        <p className="mt-1">
          ✔️ בוגר וינגייט כמאמן ריצות ארוכות<br />
          ✔️ הסמכה בתזונת ספורט ואורח חיים בריא (בהדרכת שגיא הלוי)
        </p>

      </div>
    </div>
  );
}
