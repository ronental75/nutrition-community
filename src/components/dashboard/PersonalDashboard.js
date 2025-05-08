import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthComponents';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dbFirestore as db } from '../../firebase';
import DietTracker from './DietTracker';
import WeightTracker from './WeightTracker';
import WorkoutTracker from './WorkoutTracker';
import './PersonalDashboard.css'; // נניח שכבר יצרת את הקובץ הזה בתיקייה הנכונה

const PersonalDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(() => {
    // Get active tab from localStorage or default to 'diet'
    return localStorage.getItem('activeTab') || 'diet';
  });
  
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    trackedDays: {},
    weightData: [],
    workouts: []
  });
  
  useEffect(() => {
    // אם אין משתמש מחובר, נווט לדף הבית
    if (!currentUser) {
      navigate('/');
      return;
    }
    
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          
          // בדוק אם המשתמש מאושר
          if (!data.approved) {
            alert('החשבון שלך עדיין לא אושר על ידי מנהל המערכת');
            navigate('/');
            return;
          }
          
          // טען את נתוני המשתמש
          setUserData({
            trackedDays: data.trackedDays || {},
            weightData: data.weightData || [],
            workouts: data.workouts || []
          });
        }
      } catch (error) {
        console.error('שגיאה בטעינת נתוני משתמש:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [currentUser, navigate]);
  
  useEffect(() => {
    // Save active tab to localStorage
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  
  // פונקציה לעדכון נתוני תפריט
  const updateTrackedDays = async (newTrackedDays) => {
    if (!currentUser) return;
    
    try {
      // עדכון Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        trackedDays: newTrackedDays
      });
      
      // עדכון מצב מקומי
      setUserData(prev => ({
        ...prev,
        trackedDays: newTrackedDays
      }));
    } catch (error) {
      console.error('שגיאה בעדכון נתוני תפריט:', error);
      alert('אירעה שגיאה בשמירת הנתונים');
    }
  };
  
  // פונקציה לעדכון נתוני משקל
  const updateWeightData = async (newWeightData) => {
    if (!currentUser) return;
    
    try {
      // עדכון Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        weightData: newWeightData
      });
      
      // עדכון מצב מקומי
      setUserData(prev => ({
        ...prev,
        weightData: newWeightData
      }));
    } catch (error) {
      console.error('שגיאה בעדכון נתוני משקל:', error);
      alert('אירעה שגיאה בשמירת הנתונים');
    }
  };
  
  // פונקציה לעדכון נתוני אימונים
  const updateWorkouts = async (newWorkouts) => {
    if (!currentUser) return;
    
    try {
      // עדכון Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        workouts: newWorkouts
      });
      
      // עדכון מצב מקומי
      setUserData(prev => ({
        ...prev,
        workouts: newWorkouts
      }));
    } catch (error) {
      console.error('שגיאה בעדכון נתוני אימונים:', error);
      alert('אירעה שגיאה בשמירת הנתונים');
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'diet':
        return <DietTracker 
          trackedDays={userData.trackedDays} 
          updateData={updateTrackedDays} 
          userId={currentUser.uid} 
        />;
      case 'weight':
        return <WeightTracker 
          weightData={userData.weightData} 
          updateData={updateWeightData} 
          userId={currentUser.uid} 
        />;
      case 'workout':
        return <WorkoutTracker 
          workouts={userData.workouts} 
          updateData={updateWorkouts} 
          userId={currentUser.uid} 
        />;
      default:
        return <DietTracker 
          trackedDays={userData.trackedDays} 
          updateData={updateTrackedDays} 
          userId={currentUser.uid} 
        />;
    }
  };
  
  if (loading) {
    return <div className="loading-container">טוען נתונים...</div>;
  }
  
  return (
    <div className="dashboard-container" dir="rtl">
      {/* כפתור חזרה לדף הראשי */}
      <div className="back-button-container" style={{ marginBottom: '15px' }}>
        <button 
          onClick={() => navigate('/')}
          className="back-to-home-btn"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#3b82f6',
            fontSize: '1rem',
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ 
            marginLeft: '5px', 
            fontSize: '1.2rem' 
          }}>
            &#8592;
          </span>
          חזרה לדף הראשי
        </button>
      </div>
      
      <header className="dashboard-header">
        <h1>הדאשבורד האישי שלי</h1>
        <div className="profile-section">
          <span className="greeting">שלום, {currentUser.displayName}</span>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'diet' ? 'active' : ''}`}
          onClick={() => setActiveTab('diet')}
        >
          <span className="tab-icon">🍎</span>
          מעקב תפריט
        </button>
        <button 
          className={`nav-tab ${activeTab === 'weight' ? 'active' : ''}`}
          onClick={() => setActiveTab('weight')}
        >
          <span className="tab-icon">⚖️</span>
          מעקב משקל
        </button>
        <button 
          className={`nav-tab ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <span className="tab-icon">💪</span>
          מעקב אימונים
        </button>
      </nav>
      
      <main className="dashboard-content">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default PersonalDashboard;