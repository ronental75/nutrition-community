import React, { useState } from 'react';
import './ProgressTracker.css';

const ProgressTracker = () => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (weight && date) {
      const newEntry = { weight, date };
      setEntries([...entries, newEntry]);
      setWeight('');
      setDate('');
    }
  };

  return (
    <div className="tracker-container">
      <h2 className="tracker-title">מעקב משקל אישי</h2>
      
      <div className="tracker-form">
        <div className="tracker-input-group">
          <label className="tracker-label">משקל (ק"ג):</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="tracker-input"
          />
        </div>
        
        <div className="tracker-input-group">
          <label className="tracker-label">תאריך:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="tracker-input"
          />
        </div>
        
        <button
          onClick={handleAddEntry}
          className="tracker-button"
        >
          הוסף רשומה
        </button>
      </div>
      
      {entries.length > 0 ? (
        <div className="tracker-history">
          <h3 className="tracker-subtitle">ההיסטוריה שלך:</h3>
          <ul className="tracker-list">
            {entries.map((entry, index) => (
              <li key={index} className="tracker-list-item">
                {entry.date}: {entry.weight} ק"ג
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="tracker-empty">אין עדיין רשומות. התחל להוסיף נתונים כדי לעקוב אחר ההתקדמות שלך!</p>
      )}
    </div>
  );
};

export default ProgressTracker;