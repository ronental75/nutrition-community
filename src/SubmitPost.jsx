import React from 'react';

export default function SubmitPost() {
  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-right">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">רוצים לפרסם פוסט באתר?</h2>
      <p className="mb-4 text-gray-700">
        אם יש לכם פוסט מעניין שקשור לתזונה, ספורט או אורח חיים בריא – אנחנו נשמח לקרוא אותו!
        כל פוסט נבדק לפני פרסום, ואם הוא מתאים – נפרסם אותו באתר עם קרדיט מלא למחבר.
      </p>
      <p className="mb-6 text-gray-700">
        שלחו לנו את הפוסט שלכם למייל:
        <br />
        <a
          href="mailto:ronental1975@gmail.com"
          className="text-blue-600 font-medium underline"
        >
          ronental1975@gmail.com
        </a>
      </p>
      <p className="text-sm text-gray-500">
        * אנא ציינו את שמכם המלא והאם תרצו שנציין אותו לצד הפוסט.
      </p>
    </div>
  );
}
