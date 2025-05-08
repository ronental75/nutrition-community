import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeightTracker.css';

const WeightTracker = ({ weightData, updateData, userId }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // תאריך נוכחי בפורמט YYYY-MM-DD
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  // בדיקת תקינות הפורם
  const validateForm = (value) => {
    const weightValue = parseFloat(value);
    return !isNaN(weightValue) && weightValue > 0 && weightValue < 300;
  };
  
  // עדכון ערך המשקל והתקפות
  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);
    setIsFormValid(validateForm(value));
  };
  
  // הוספת משקל חדש
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    const weightValue = parseFloat(weight);
    
    let updatedWeightData;
    
    if (isEditing && editIndex !== null) {
      // עדכון רשומה קיימת
      updatedWeightData = [...weightData];
      updatedWeightData[editIndex] = {
        ...updatedWeightData[editIndex],
        weight: weightValue,
        date: date // שימוש בתאריך הנבחר
      };
    } else {
      // הוספת רשומה חדשה
      const newEntry = {
        date: date, // שימוש בתאריך הנבחר
        weight: weightValue
      };
      
      // בדוק אם כבר יש רשומה לתאריך זה
      const existingEntryIndex = weightData.findIndex(entry => entry.date === date);
      
      if (existingEntryIndex !== -1) {
        // עדכן את הרשומה הקיימת לתאריך זה
        updatedWeightData = [...weightData];
        updatedWeightData[existingEntryIndex] = newEntry;
      } else {
        // הוסף רשומה חדשה
        updatedWeightData = [...weightData, newEntry];
      }
    }
    
    // מיון לפי תאריך (מהחדש לישן)
    updatedWeightData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // עדכון Firebase
    updateData(updatedWeightData);
    
    // איפוס הפורם
    setWeight('');
    setDate(new Date().toISOString().split('T')[0]); // איפוס לתאריך הנוכחי
    setIsFormValid(false);
    setIsEditing(false);
    setEditIndex(null);
  };
  
  // עריכת רשומה קיימת
  const handleEdit = (index) => {
    const entry = weightData[index];
    setWeight(entry.weight.toString());
    setDate(entry.date); // העתקת התאריך של הרשומה הנבחרת
    setIsFormValid(true);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  // מחיקת רשומה
  const handleDelete = (index) => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק רשומה זו?');
    
    if (confirmed) {
      const updatedWeightData = weightData.filter((_, i) => i !== index);
      updateData(updatedWeightData);
    }
  };
  
  // עבור הגרף
  const chartData = [...weightData]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(entry => ({
      date: formatDate(entry.date),
      weight: entry.weight
    }));
  
  // פונקציית עזר לפורמט תאריך
  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  }
  
  return (
    <div className="weight-tracker">
      <div className="weight-input-section">
        <h3>הוסף משקל {isEditing ? '(עריכה)' : 'חדש'}</h3>
        
        <form onSubmit={handleSubmit} className="weight-form">
          <div className="form-group">
            <label>תאריך:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>משקל (ק"ג):</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={handleWeightChange}
              step="0.1"
              min="30"
              max="250"
              placeholder="הכנס משקל"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className={`weight-submit-btn ${!isFormValid ? 'disabled' : ''}`}
          >
            {isEditing ? 'עדכן' : 'הוסף'} משקל
          </button>
          
          {isEditing && (
            <button
              type="button"
              className="cancel-edit-btn"
              onClick={() => {
                setIsEditing(false);
                setEditIndex(null);
                setWeight('');
                setDate(new Date().toISOString().split('T')[0]); // איפוס לתאריך הנוכחי
              }}
            >
              בטל עריכה
            </button>
          )}
        </form>
      </div>
      
      {weightData.length > 0 ? (
        <>
          <div className="weight-chart">
            <h3>גרף מעקב משקל</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip formatter={(value) => [`${value} ק"ג`, 'משקל']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="weight-history">
            <h3>היסטוריית משקל</h3>
            <div className="weight-list">
              {weightData
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((entry, index) => (
                  <div key={index} className="weight-item">
                    <div className="weight-info">
                      <div className="weight-date">
                        {new Date(entry.date).toLocaleDateString('he-IL')}
                      </div>
                      <div className="weight-value">{entry.weight} ק"ג</div>
                    </div>
                    <div className="weight-actions">
                      <button
                        onClick={() => handleEdit(index)}
                        className="edit-weight-btn"
                      >
                        ערוך
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="delete-weight-btn"
                      >
                        מחק
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
      ) : (
        <div className="no-weight-data">
          <p>אין נתוני משקל. הוסף את המשקל הראשון שלך!</p>
        </div>
      )}
    </div>
  );
};

export default WeightTracker;