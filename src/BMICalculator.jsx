import React, { useState } from 'react';
import './BMICalculator.css';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) {
      setError('נא למלא את כל השדות');
      return;
    }
    
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
    
    if (bmiValue < 18.5) {
      setCategory('תת-משקל');
    } else if (bmiValue < 25) {
      setCategory('משקל תקין');
    } else if (bmiValue < 30) {
      setCategory('עודף משקל');
    } else {
      setCategory('השמנה');
    }
    
    setError('');
  };

  return (
    
    <div className="bmi-calculator">
    <div className="return-button-container">
        <a href="/he" className="return-button">
          חזרה לדף הראשי
        </a>
      </div>  
      <h2 className="bmi-title">מחשבון BMI</h2>
      
      <div className="bmi-input-group">
        <label className="bmi-label">גובה (בס"מ):</label>
        <input
          type="number"
          value={height}
          onChange={e => setHeight(e.target.value)}
          className="bmi-input"
          placeholder="למשל: 170"
        />
      </div>
      
      <div className="bmi-input-group">
        <label className="bmi-label">משקל (בק"ג):</label>
        <input
          type="number"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          className="bmi-input"
          placeholder="למשל: 70"
        />
      </div>
      
      {error && <p className="bmi-error">{error}</p>}
      
      <button
        onClick={calculateBMI}
        className="bmi-button"
      >
        חשב BMI
      </button>
      
      {bmi && (
        <div className="bmi-result">
          <p className="bmi-result-text">
            ה-BMI שלך הוא: <span className="bmi-result-value">{bmi}</span>
          </p>
          <p className="bmi-category">
            קטגוריה: <span className="bmi-category-value">{category}</span>
          </p>
          <p className="bmi-disclaimer">
            * חשוב לזכור: BMI הוא רק אינדיקציה כללית ואינו לוקח בחשבון גורמים כמו מסת שריר, מבנה גוף וגורמים אחרים.
          </p>
        </div>
        
      )}
    </div>
    
  );
};

export default BMICalculator;