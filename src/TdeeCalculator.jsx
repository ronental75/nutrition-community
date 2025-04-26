import React, { useState } from 'react';
import './styles.css'; // Import the CSS file

export default function TdeeCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);

  const handleCalculate = () => {
    if (!age || !weight || !height) {
      alert('נא למלא את כל השדות');
      return;
    }

    let calculatedBmr = 0;

    if (gender === 'male') {
      calculatedBmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      calculatedBmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedBmr * activityLevel));
  };

  return (
    <div className="container">
      {/* Return Button */}
      <div className="return-button-container">
        <a href="/he" className="return-button">
          חזרה לדף הראשי
        </a>
      </div>
      
      {/* Gender Selection */}
      <div className="gender-container">
        <button
          onClick={() => setGender('male')}
          className={`gender-button gender-button-male ${gender === 'male' ? 'selected' : ''}`}
        >
          זכר
        </button>
        <button
          onClick={() => setGender('female')}
          className={`gender-button gender-button-female ${gender === 'female' ? 'selected' : ''}`}
        >
          נקבה
        </button>
      </div>

      {/* Title and Disclaimer */}
      <div className="title-container">
        <h1 className="title">מחשבון הוצאה קלורית יומית (TDEE)</h1>
        <p className="disclaimer">
          מחשבון זה עוזר להעריך את כמות הקלוריות היומית הדרושה לגופך, בהתבסס על נוסחת הריס-בנדיקט.
          <br />
          <span className="warning">שימו לב:</span> מדובר בהערכה בלבד ואינה מהווה ייעוץ תזונתי מקצועי.
        </p>
      </div>

      {/* Form */}
      <div className="form-container">
        <div className="form-group">
          <label className="label">גיל</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
            placeholder="לדוגמה: 30"
          />
        </div>

        <div className="form-group">
          <label className="label">משקל (ק"ג)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input"
            placeholder="לדוגמה: 70"
          />
        </div>

        <div className="form-group">
          <label className="label">גובה (ס"מ)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
            placeholder="לדוגמה: 175"
          />
        </div>

        <div className="form-group">
          <label className="label">רמת פעילות</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(Number(e.target.value))}
            className="input"
          >
            <option value={1.2}>יושבני (מעט פעילות)</option>
            <option value={1.375}>פעילות קלה (1-3 פעמים בשבוע)</option>
            <option value={1.55}>פעילות בינונית (3-5 פעמים בשבוע)</option>
            <option value={1.725}>פעילות גבוהה (6-7 פעמים בשבוע)</option>
            <option value={1.9}>פעילות מאוד גבוהה (אימונים יומיים)</option>
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="calculate-button-container">
        <button
          onClick={handleCalculate}
          className="calculate-button"
        >
          חשב
        </button>
      </div>

      {/* Results */}
      {bmr && tdee && (
        <div className="results-container">
          <h3 className="results-title">תוצאה:</h3>
          <p className="results-text">
            קצב חילוף חומרים בסיסי (BMR): <span className="bold">{bmr}</span> קלוריות ליום
          </p>
          <p className="results-text">
            הוצאה קלורית יומית מוערכת (TDEE): <span className="bold">{tdee}</span> קלוריות ליום
          </p>
        </div>
      )}
    </div>
  );
}