import React from 'react';

export default function Contact() {
  return (
    <div dir="rtl" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-right font-sans">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">צור קשר</h1>

      <div className="leading-relaxed text-[1.05rem] text-gray-800 space-y-4">
        <p>
          <strong>רונן טל</strong><br />
          📞 <a href="tel:0544974531" className="text-blue-600 hover:underline">054-4974531</a><br />
          📧 <a href="mailto:ronental1975@gmail.com" className="text-blue-600 hover:underline">ronental1975@gmail.com</a>
        </p>
        <p>
          💬 <strong>שלח לי הודעה ישירה ב-WhatsApp:</strong><br />
          <a
            href="https://wa.me/972544974531"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
          >
            שלח הודעה
          </a>
        </p>
        <p dir ="rtl">
          👥 <strong>הצטרפות לקהילת Eat Smart, Live Strong (WhatsApp) :</strong><br />
          <a
            href="https://chat.whatsapp.com/DM67WGstonC1nhDvq5Sh0D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
          >
            הצטרף לקהילה
          </a>
        </p>

        
      </div>
    </div>
  );
}