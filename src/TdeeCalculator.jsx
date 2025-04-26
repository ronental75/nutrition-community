import React, { useState } from 'react';

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

  const containerStyle = {
    direction: 'rtl',
    maxWidth: '32rem',
    margin: '2.5rem auto',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  };

  const returnButtonContainerStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem'
  };

  const returnButtonStyle = {
    display: 'inline-block',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    borderRadius: '9999px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  };

  const genderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    gap: '1rem'
  };

  const genderButtonStyle = (isSelected) => ({
    padding: '0.5rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '600',
    transition: 'all 0.3s',
    backgroundColor: isSelected ? (gender === 'male' ? '#2563eb' : '#ec4899') : '#f3f4f6',
    color: isSelected ? 'white' : '#374151',
    boxShadow: isSelected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    border: 'none',
    cursor: 'pointer'
  });

  const titleContainerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: '0.5rem'
  };

  const disclaimerStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    lineHeight: '1.5'
  };

  const warningStyle = {
    color: '#ef4444',
    fontWeight: '600'
  };

  const formContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '0.25rem'
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem'
  };

  const calculateButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const calculateButtonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.5rem 2rem',
    borderRadius: '9999px',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };

  const resultsContainerStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '0.5rem',
    textAlign: 'center',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
  };

  const resultsTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: '1rem'
  };

  const resultsTextStyle = {
    color: '#374151',
    fontSize: '1rem',
    marginBottom: '0.5rem'
  };

  const boldStyle = {
    fontWeight: 'bold'
  };

  // Media query for larger screens
  const mediaQuery = window.matchMedia('(min-width: 640px)');
  
  if (mediaQuery.matches) {
    formContainerStyle.gridTemplateColumns = 'repeat(2, 1fr)';
  }

  return (
    <div style={containerStyle}>
      {/* Return Button */}
      <div style={returnButtonContainerStyle}>
        <a 
          href="/he" 
          style={returnButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          חזרה לדף הראשי
        </a>
      </div>
      
      {/* Gender Selection */}
      <div style={genderContainerStyle}>
        <button
          onClick={() => setGender('male')}
          style={genderButtonStyle(gender === 'male')}
        >
          זכר
        </button>
        <button
          onClick={() => setGender('female')}
          style={genderButtonStyle(gender === 'female')}
        >
          נקבה
        </button>
      </div>

      {/* Title and Disclaimer */}
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>מחשבון הוצאה קלורית יומית (TDEE)</h1>
        <p style={disclaimerStyle}>
          מחשבון זה עוזר להעריך את כמות הקלוריות היומית הדרושה לגופך, בהתבסס על נוסחת הריס-בנדיקט.
          <br />
          <span style={warningStyle}>שימו לב:</span> מדובר בהערכה בלבד ואינה מהווה ייעוץ תזונתי מקצועי.
        </p>
      </div>

      {/* Form */}
      <div style={formContainerStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>גיל</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
            placeholder="לדוגמה: 30"
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>משקל (ק"ג)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
            placeholder="לדוגמה: 70"
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>גובה (ס"מ)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
            placeholder="לדוגמה: 175"
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>רמת פעילות</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(Number(e.target.value))}
            style={inputStyle}
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
      <div style={calculateButtonContainerStyle}>
        <button
          onClick={handleCalculate}
          style={calculateButtonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#1d4ed8';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#2563eb';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          חשב
        </button>
      </div>

      {/* Results */}
      {bmr && tdee && (
        <div style={resultsContainerStyle}>
          <h3 style={resultsTitleStyle}>תוצאה:</h3>
          <p style={resultsTextStyle}>
            קצב חילוף חומרים בסיסי (BMR): <span style={boldStyle}>{bmr}</span> קלוריות ליום
          </p>
          <p style={resultsTextStyle}>
            הוצאה קלורית יומית מוערכת (TDEE): <span style={boldStyle}>{tdee}</span> קלוריות ליום
          </p>
        </div>
      )}
    </div>
  );
}