import React, { useState } from 'react';
import { dbRealtime } from './firebase';
import { ref, set } from 'firebase/database';
import './UserLogin.css';

const UserLogin = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nickname) {
      setError('כינוי הוא שדה חובה');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // יצירת מזהה משתמש ייחודי
      const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // שמירת פרטי המשתמש ב-DB
      const userRef = ref(dbRealtime, `users/${userId}`);
      await set(userRef, {
        nickname,
        email: email || null,
        createdAt: new Date().toISOString()
      });

      // שמירת מידע המשתמש בלוקל סטורג'
      localStorage.setItem('user_id', userId);
      localStorage.setItem('user_nickname', nickname);
      
      // קריאה לפונקציית קולבק
      if (onLogin) {
        onLogin({ userId, nickname, email });
      }
      
    } catch (error) {
      console.error("Error registering user:", error);
      setError('אירעה שגיאה בהרשמה. אנא נסה שוב מאוחר יותר.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-login-wrapper"> {/* div עוטף חדש */}

    <div className="user-login-container">
      <h3 className="user-login-title">הזדהות</h3>
      <p className="user-login-description">
        כדי לדרג את הפוסטים שלנו, אנא הזדהה עם כינוי ואימייל (אופציונלי)
      </p>
      
      {error && <div className="user-login-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="user-login-form">
        <div className="user-login-field">
          <label className="user-login-label">כינוי *</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="user-login-input"
            placeholder="כינוי לתצוגה"
            required
          />
        </div>
        
        <div className="user-login-field">
          <label className="user-login-label">אימייל (אופציונלי)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="user-login-input"
            placeholder="your@email.com"
          />
        </div>
        
        <button 
          type="submit" 
          className="user-login-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'שולח...' : 'שמור והמשך'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserLogin;