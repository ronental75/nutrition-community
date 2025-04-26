import './contract.css'; // Import the CSS file
import React from 'react';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">צור קשר</h1>

        <div className="contact-details">
          <p>
            <strong>רונן טל</strong><br />
            📞 <a href="tel:0544974531" className="contact-link">054-4974531</a><br />
            📧 <a href="mailto:ronental1975@gmail.com" className="contact-link">ronental1975@gmail.com</a>
          </p>

          <div className="contact-buttons">
            <a
              href="https://wa.me/972544974531"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              שלח הודעה בוואטסאפ
            </a>

            <a
              href="https://chat.whatsapp.com/DM67WGstonC1nhDvq5Sh0D"
              target="_blank"
              rel="noopener noreferrer"
              className="community-button"
            >
              הצטרף לקהילת <br></br>
              Eat Smart, Live Strong
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
