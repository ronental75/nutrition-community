// src/components/dashboard/DietTracker.js
import React, { useState } from 'react';
import { CheckCircle, XCircle, BarChart, ChevronLeft, ChevronRight } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { dbFirestore as db } from '../../firebase';

// ייבוא סגנונות מעקב תפריט
import './diet-tracker.css';

const DietTracker = ({ trackedDays, updateData, userId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get days in month for the calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get the day of week (0-6) for the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Format date to string key for storage
  const formatDateKey = (year, month, day) => {
    return `${year}-${month + 1}-${day}`;
  };
  
  // Toggle tracking status for a day
  const toggleDayStatus = async (day) => {
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    const newTrackedDays = {...trackedDays};
    
    if (!newTrackedDays[dateKey]) {
      newTrackedDays[dateKey] = 'success';
    } else if (newTrackedDays[dateKey] === 'success') {
      newTrackedDays[dateKey] = 'fail';
    } else {
      delete newTrackedDays[dateKey];
    }
    
    // עדכון Firestore
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        trackedDays: newTrackedDays
      });
      
      // עדכון מצב מקומי
      updateData(newTrackedDays);
    } catch (error) {
      console.error('Error updating tracked days:', error);
      alert('אירעה שגיאה בשמירת הנתונים');
    }
  };
  
  // Change month
  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };
  
  // Calculate statistics
  const getStats = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    let successCount = 0;
    let failCount = 0;
    
    for (let day = 1; day <= getDaysInMonth(year, month); day++) {
      const dateKey = formatDateKey(year, month, day);
      if (trackedDays[dateKey] === 'success') {
        successCount++;
      } else if (trackedDays[dateKey] === 'fail') {
        failCount++;
      }
    }
    
    const totalTracked = successCount + failCount;
    const successRate = totalTracked ? Math.round((successCount / totalTracked) * 100) : 0;
    
    return { successCount, failCount, successRate };
  };
  
  // Render the calendar grid
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const status = trackedDays[dateKey];
      
      days.push(
        <div 
          key={day} 
          onClick={() => toggleDayStatus(day)}
          className={`calendar-day ${status === 'success' ? 'success-day' : status === 'fail' ? 'fail-day' : 'regular-day'}`}
        >
          <span className="day-number">{day}</span>
          {status === 'success' && (
            <CheckCircle className="status-icon success-icon" />
          )}
          {status === 'fail' && (
            <XCircle className="status-icon fail-icon" />
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const { successCount, failCount, successRate } = getStats();
  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  
  return (
    <div className="diet-tracker-section">
      <div className="calendar-header">
        <div className="month-navigation">
          <button 
            onClick={() => changeMonth(-1)}
            className="month-nav-button"
          >
            <ChevronRight className="nav-icon" />
            הקודם
          </button>
          <h3 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button 
            onClick={() => changeMonth(1)}
            className="month-nav-button"
          >
            הבא
            <ChevronLeft className="nav-icon" />
          </button>
        </div>
      </div>
      
      {/* הסבר */}
      <div className="calendar-instructions">
        <p>לחץ על כל יום כדי לסמן האם עמדת בתפריט:</p>
        <div className="status-legend">
          <div className="status-item">
            <CheckCircle className="status-legend-icon success-icon" />
            <span>עמדתי בתפריט</span>
          </div>
          <div className="status-item">
            <XCircle className="status-legend-icon fail-icon" />
            <span>לא עמדתי בתפריט</span>
          </div>
          <div className="status-item">
            <div className="status-legend-icon empty-icon"></div>
            <span>לא מסומן</span>
          </div>
        </div>
      </div>
      
      {/* סטטיסטיקה */}
      <div className="stats-container">
        <div className="stats-header">
          <BarChart className="stats-icon" />
          <span className="stats-title">סיכום החודש:</span>
        </div>
        <div className="stats-data">
          <div className="stat-item">
            <div className="stat-value success-value">{successCount}</div>
            <div className="stat-label">ימי הצלחה</div>
          </div>
          <div className="stat-item">
            <div className="stat-value fail-value">{failCount}</div>
            <div className="stat-label">ימי פספוס</div>
          </div>
          <div className="stat-item">
            <div className={`stat-value ${successRate > 70 ? 'high-success-rate' : successRate > 40 ? 'medium-success-rate' : 'low-success-rate'}`}>
              {successRate}%
            </div>
            <div className="stat-label">אחוז הצלחה</div>
          </div>
        </div>
      </div>
      
      {/* לוח שנה */}
      <div className="calendar-grid">
        {/* שמות ימים */}
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        
        {/* ימים בחודש */}
        {renderCalendarDays()}
      </div>
      
      {/* הודעת עידוד */}
      {successCount > 0 && (
        <div className="motivation-message">
          <p>
            {successRate > 80 ? '🎉 מצוין! אתה מתמיד ועומד ביעדים בצורה מרשימה!' :
             successRate > 60 ? '👍 כל הכבוד! אתה בדרך הנכונה להשגת המטרות שלך.' :
             successRate > 40 ? '💪 המשך להתאמץ, אתה מתקדם!' :
             '🌱 כל התחלה היא טובה! המשך לנסות ותראה שיפור.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DietTracker;