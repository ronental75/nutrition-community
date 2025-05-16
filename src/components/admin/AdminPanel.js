// src/components/admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Users, 
  CheckCircle, 
  XCircle, 
  BarChart, 
  Calendar, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  TrendingDown,
  Eye,          // אייקון חדש לצפייה בדשבורד
  Activity,     // אייקון עבור אימונים
  Scale,        // אייקון עבור משקל
  Clipboard     // אייקון עבור תפריט
} from 'lucide-react';
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  updateDoc, 
  where 
} from 'firebase/firestore';
import { auth, dbFirestore as db } from '../../firebase';
import { useAuth } from '../auth/AuthComponents';
// ייבוא הסגנונות - צור קובץ נפרד או הוסף לקובץ הקיים
import './AdminPanel.css'; // ודא שיש לך את כל הסגנונות נדרשים

const AdminPanel = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'approvals', 'statistics'
  const [selectedUser, setSelectedUser] = useState(null); // משתמש שנבחר לצפייה מפורטת
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // משתנים חדשים לצפייה בדשבורד משתמש
  const [viewingDashboard, setViewingDashboard] = useState(false);
  const [dashboardUser, setDashboardUser] = useState(null);
  
  useEffect(() => {
    // בדוק אם המשתמש הוא אדמין
    if (!currentUser || currentUser.role !== 'admin') {
      alert('אין לך הרשאות לצפות בדף זה');
      navigate('/');
      return;
    }
    
    const loadAdminData = async () => {
      try {
        setLoading(true);
        
        // טען את כל המשתמשים
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = [];
        
        usersSnapshot.forEach((doc) => {
          const user = doc.data();
          usersData.push({
            uid: doc.id,
            ...user
          });
        });
        
        // מיין משתמשים למאושרים ולא מאושרים
        const approved = usersData.filter(user => user.approved);
        const pending = usersData.filter(user => !user.approved);
        
        setUsers(approved);
        setPendingApprovals(pending);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAdminData();
  }, [currentUser, navigate]);
  
  // פונקציה חדשה - חישוב סטטיסטיקות לכל משתמש
  const calculateUserStats = (trackedDays) => {
    if (!trackedDays || Object.keys(trackedDays).length === 0) {
      return { successCount: 0, failCount: 0, successRate: 0, totalDays: 0, lastActivity: null };
    }
    
    let successCount = 0;
    let failCount = 0;
    let lastActivity = null;
    
    // מיון הימים לפי תאריך
    const sortedDays = Object.entries(trackedDays).sort((a, b) => {
      return new Date(b[0]) - new Date(a[0]);
    });
    
    // הפעילות האחרונה היא התאריך האחרון בסדר יורד
    if (sortedDays.length > 0) {
      lastActivity = sortedDays[0][0];
    }
    
    Object.values(trackedDays).forEach(status => {
      if (status === 'success') successCount++;
      else if (status === 'fail') failCount++;
    });
    
    const totalDays = successCount + failCount;
    const successRate = totalDays ? Math.round((successCount / totalDays) * 100) : 0;
    
    return { successCount, failCount, successRate, totalDays, lastActivity };
  };
  
  // פונקציית עזר להצגת תאריך בפורמט נוח
  const formatDate = (dateStr) => {
    if (!dateStr) return 'לא פעיל';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // פונקציה לאישור או דחיית משתמש
  const handleUserApproval = async (userId, approved) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      
      await updateDoc(userDocRef, {
        approved
      });
      
      // עדכון הרשימות המקומיות
      if (approved) {
        // העבר את המשתמש לרשימת המאושרים
        const userToApprove = pendingApprovals.find(u => u.uid === userId);
        setPendingApprovals(pendingApprovals.filter(u => u.uid !== userId));
        setUsers([...users, {...userToApprove, approved: true}]);
      } else {
        // הסר את המשתמש מרשימת הבקשות
        setPendingApprovals(pendingApprovals.filter(u => u.uid !== userId));
      }
    } catch (error) {
      console.error('Error updating user approval:', error);
      alert('אירעה שגיאה בעדכון סטטוס המשתמש');
    }
  };
  
  // פונקציה לצפייה בנתוני משתמש ספציפי
  const viewUserDetails = (user) => {
    setSelectedUser(user);
  };
  
  // פונקציה לחזרה לטבלת המשתמשים
  const backToUsersList = () => {
    setSelectedUser(null);
  };
  
  // פונקציה חדשה - צפייה בדשבורד משתמש
  const viewUserDashboard = (user) => {
    setDashboardUser(user);
    setViewingDashboard(true);
  };
  
  // פונקציה חדשה - חזרה מדשבורד משתמש
  const backFromDashboard = () => {
    setViewingDashboard(false);
    setDashboardUser(null);
  };
  
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>טוען נתונים...</p>
      </div>
    );
  }
  
  return (
    <div dir="rtl" className="admin-panel-container">
      {/* בדיקה אם מציגים דשבורד משתמש */}
      {viewingDashboard && dashboardUser ? (
        <UserDashboardView 
          user={dashboardUser} 
          onBack={backFromDashboard} 
        />
      ) : (
        <>
          <div className="admin-header">
            <button onClick={() => navigate('/')} className="inline-back-button">
              <span className="back-arrow">←</span>
            </button>
            <h2 className="admin-panel-title">
              <Users className="admin-icon" />
              פאנל ניהול משתמשים
            </h2>
          </div>
          
          {/* לשוניות */}
          <div className="admin-tabs">
            <button 
              onClick={() => { setActiveTab('users'); setSelectedUser(null); }}
              className={`admin-tab ${activeTab === 'users' ? 'active-tab' : ''}`}
            >
              משתמשים מאושרים
            </button>
            <button 
              onClick={() => { setActiveTab('approvals'); setSelectedUser(null); }}
              className={`admin-tab ${activeTab === 'approvals' ? 'active-tab' : ''}`}
            >
              בקשות הרשמה
              {pendingApprovals.length > 0 && (
                <span className="approval-badge">{pendingApprovals.length}</span>
              )}
            </button>
            <button 
              onClick={() => { setActiveTab('statistics'); setSelectedUser(null); }}
              className={`admin-tab ${activeTab === 'statistics' ? 'active-tab' : ''}`}
            >
              סטטיסטיקות מעקב
            </button>
          </div>
          
          {/* תוכן הלשוניות */}


{activeTab === 'users' && (
  <div className="admin-section">
    <h3 className="admin-section-title">משתמשים מאושרים במערכת</h3>
    
    {users.length === 0 ? (
      <p className="empty-message">אין משתמשים מאושרים במערכת</p>
    ) : (
      <div className="users-table-container">
        {/* סינון משתמשים - רק משתמשים רגילים יוצגו בטבלה */}
        {(() => {
          const regularUsers = users.filter(user => user.role !== 'admin');
          
          if (regularUsers.length === 0) {
            return <p className="empty-message">אין משתמשים רגילים מאושרים במערכת</p>;
          }
          
          return (
            <table className="users-table">
              <thead>
                <tr>
                  <th>שם</th>
                  <th>אימייל</th>
                  <th>תפקיד</th>
                  <th>תאריך הרשמה</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {regularUsers.map((user) => (
                  <tr key={user.uid}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="role-badge user-role">
                        משתמש
                      </span>
                    </td>
                    <td>{user.createdAt ? formatDate(user.createdAt) : '-'}</td>
                    <td>
                      <button 
                        onClick={() => viewUserDashboard(user)}
                        className="view-dashboard-button"
                      >
                        <Eye className="button-icon" />
                        צפה בדשבורד
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })()}
      </div>
    )}
  </div>
)}
          
          {activeTab === 'approvals' && (
            <div className="admin-section">
              <h3 className="admin-section-title">בקשות הרשמה ממתינות לאישור</h3>
              
              {pendingApprovals.length === 0 ? (
                <p className="empty-message">אין בקשות הרשמה ממתינות לאישור</p>
              ) : (
                <div className="approval-requests">
                  {pendingApprovals.map((user) => (
                    <div key={user.uid} className="user-card">
                      <div className="user-info">
                        <h4 className="user-name">{user.name}</h4>
                        <div className="user-email">{user.email}</div>
                        <div className="user-created-at">
                          נרשם: {formatDate(user.createdAt)}
                        </div>
                      </div>
                      <div className="user-actions">
                        <button
                          onClick={() => handleUserApproval(user.uid, false)}
                          className="reject-button"
                        >
                          <XCircle className="action-icon" />
                          דחה
                        </button>
                        <button
                          onClick={() => handleUserApproval(user.uid, true)}
                          className="approve-button"
                        >
                          <CheckCircle className="action-icon" />
                          אשר
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* לשונית סטטיסטיקות */}


{activeTab === 'statistics' && !selectedUser && (
  <div className="statistics-tab">
    <h3 className="admin-section-title">סטטיסטיקות מעקב תפריט של כל המשתמשים</h3>
    
    {users.length === 0 ? (
      <p className="empty-message">אין משתמשים מאושרים במערכת</p>
    ) : (
      <div className="stats-summary">
        {/* חישוב וסינון רק משתמשים רגילים (ללא מנהלים) */}
        {(() => {
          // סינון משתמשים - רק משתמשים רגילים, ללא מנהלים
          const regularUsers = users.filter(user => user.role !== 'admin');
          
          return (
            <>
              <div className="stats-cards">
                <div className="stats-card">
                  <div className="stats-card-icon users-icon">
                    <Users size={24} />
                  </div>
                  <div className="stats-card-content">
                    <div className="stats-card-value">{regularUsers.length}</div>
                    <div className="stats-card-label">סה"כ משתמשים</div>
                  </div>
                </div>
                
                <div className="stats-card">
                  <div className="stats-card-icon active-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="stats-card-content">
                    <div className="stats-card-value">
                      {regularUsers.filter(user => user.trackedDays && Object.keys(user.trackedDays).length > 0).length}
                    </div>
                    <div className="stats-card-label">משתמשים פעילים</div>
                  </div>
                </div>
                
                <div className="stats-card">
                  <div className="stats-card-icon success-icon">
                    <Award size={24} />
                  </div>
                  <div className="stats-card-content">
                    <div className="stats-card-value">
                      {regularUsers.reduce((total, user) => {
                        const { successCount } = calculateUserStats(user.trackedDays);
                        return total + successCount;
                      }, 0)}
                    </div>
                    <div className="stats-card-label">סה"כ ימי הצלחה</div>
                  </div>
                </div>
                
                <div className="stats-card">
                  <div className="stats-card-icon rate-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stats-card-content">
                    <div className="stats-card-value">
                      {(() => {
                        let totalSuccess = 0;
                        let totalDays = 0;
                        
                        regularUsers.forEach(user => {
                          const { successCount, totalDays: days } = calculateUserStats(user.trackedDays);
                          totalSuccess += successCount;
                          totalDays += days;
                        });
                        
                        return totalDays ? Math.round((totalSuccess / totalDays) * 100) : 0;
                      })()}%
                    </div>
                    <div className="stats-card-label">אחוז הצלחה כללי</div>
                  </div>
                </div>
              </div>
              
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>שם</th>
                      <th>אימייל</th>
                      <th>ימי הצלחה</th>
                      <th>ימי כישלון</th>
                      <th>אחוז הצלחה</th>
                      <th>פעילות אחרונה</th>
                      <th>פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularUsers.map((user) => {
                      const { successCount, failCount, successRate, lastActivity } = calculateUserStats(user.trackedDays || {});
                      return (
                        <tr key={user.uid}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="success-cell">{successCount}</td>
                          <td className="fail-cell">{failCount}</td>
                          <td className={`rate-cell ${successRate > 70 ? 'high-rate' : successRate > 40 ? 'medium-rate' : 'low-rate'}`}>
                            {successRate}%
                          </td>
                          <td>{lastActivity ? formatDate(lastActivity) : 'לא פעיל'}</td>
                          <td>
                            <button 
                              onClick={() => viewUserDashboard(user)}
                              className="view-dashboard-button"
                              style={{ marginLeft: '8px' }}
                            >
                              <Eye className="button-icon" />
                              צפה בדשבורד
                            </button>
                            
                            <button 
                              onClick={() => viewUserDetails(user)}
                              className="view-details-button"
                              disabled={successCount === 0 && failCount === 0}
                            >
                              צפה בפרטים
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
      </div>
    )}
  </div>
)}
          
          {/* צפייה מפורטת במשתמש ספציפי */}
          {activeTab === 'statistics' && selectedUser && (
            <div className="user-details-view">
              <div className="user-details-header">
                <button 
                  onClick={backToUsersList}
                  className="back-to-list-button"
                >
                  <ChevronRight className="back-icon" />
                  חזרה לרשימת המשתמשים
                </button>
                
                <h3 className="user-details-title">
                  נתוני מעקב תפריט עבור: {selectedUser.name}
                </h3>
                
                <div className="user-email">{selectedUser.email}</div>
              </div>
              
              {(!selectedUser.trackedDays || Object.keys(selectedUser.trackedDays).length === 0) ? (
                <p className="empty-message">משתמש זה עדיין לא סימן ימים במעקב התפריט</p>
              ) : (
                <div className="user-tracking-data">
                  <UserTrackingStats trackedDays={selectedUser.trackedDays} userName={selectedUser.name} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// קומפוננטת סטטיסטיקות מעקב (קיימת)
const UserTrackingStats = ({ trackedDays, userName }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly', 'yearly'
  
  // פונקציה להצגת חודש ספציפי
  const navigateMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };
  
  // פונקציה להצגת שנה ספציפית
  const navigateYear = (delta) => {
    setCurrentYear(currentYear + delta);
  };
  
  // פונקציית עזר - מיון ימים לפי תאריך
  const sortDaysByDate = (days) => {
    return days.sort((a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateB - dateA; // מיון יורד - החדש ביותר קודם
    });
  };
  
  // פילטור הימים לפי התצוגה הנוכחית
  const getDaysForCurrentView = () => {
    const allDays = Object.entries(trackedDays);
    
    if (viewMode === 'monthly') {
      // פילטור לחודש הנוכחי
      return allDays.filter(([dateKey]) => {
        const dateParts = dateKey.split('-');
        return parseInt(dateParts[0]) === currentYear && parseInt(dateParts[1]) === currentMonth + 1;
      });
    } else {
      // פילטור לשנה הנוכחית
      return allDays.filter(([dateKey]) => {
        const dateParts = dateKey.split('-');
        return parseInt(dateParts[0]) === currentYear;
      });
    }
  };
  
  // חישוב סטטיסטיקות לתצוגה הנוכחית
  const calculateStats = (days) => {
    const successCount = days.filter(([, status]) => status === 'success').length;
    const failCount = days.filter(([, status]) => status === 'fail').length;
    const totalDays = successCount + failCount;
    const successRate = totalDays ? Math.round((successCount / totalDays) * 100) : 0;
    
    return { successCount, failCount, totalDays, successRate };
  };
  
  // שליפת הימים המסומנים לפי התצוגה הנוכחית
  const filteredDays = getDaysForCurrentView();
  const sortedDays = sortDaysByDate(filteredDays);
  const stats = calculateStats(filteredDays);
  
  // יצירת סטטיסטיקות חודשיות לתצוגה שנתית
  const getMonthlyStatsForYear = () => {
    const monthlyStats = Array(12).fill().map(() => ({ successCount: 0, failCount: 0 }));
    
    if (viewMode === 'yearly') {
      Object.entries(trackedDays).forEach(([dateKey, status]) => {
        const dateParts = dateKey.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        
        if (year === currentYear && month >= 0 && month < 12) {
          if (status === 'success') {
            monthlyStats[month].successCount++;
          } else if (status === 'fail') {
            monthlyStats[month].failCount++;
          }
        }
      });
    }
    
    return monthlyStats.map((stats, index) => {
      const totalDays = stats.successCount + stats.failCount;
      const successRate = totalDays ? Math.round((stats.successCount / totalDays) * 100) : 0;
      return {
        ...stats,
        totalDays,
        successRate,
        month: index
      };
    });
  };
  
  const monthlyStatsForYear = getMonthlyStatsForYear();
  
  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];
  
  // פונקציית עזר - הצגת תאריך בפורמט קריא
  const formatDateDisplay = (dateKey) => {
    const dateParts = dateKey.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    
    const date = new Date(year, month, day);
    
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="user-stats-details">
      {/* בורר תצוגה - חודשי או שנתי */}
      <div className="view-mode-selector">
        <button 
          onClick={() => setViewMode('monthly')}
          className={`view-mode-button ${viewMode === 'monthly' ? 'active-view-mode' : ''}`}
        >
          <Calendar className="view-mode-icon" />
          תצוגה חודשית
        </button>
        <button 
          onClick={() => setViewMode('yearly')}
          className={`view-mode-button ${viewMode === 'yearly' ? 'active-view-mode' : ''}`}
        >
          <Calendar className="view-mode-icon" />
          תצוגה שנתית
        </button>
      </div>
      
      {/* בורר חודש/שנה */}
      <div className="period-selector">
        <button 
          onClick={() => viewMode === 'monthly' ? navigateMonth(-1) : navigateYear(-1)} 
          className="period-nav-button"
        >
          <ChevronRight className="nav-icon" />
          {viewMode === 'monthly' ? 'החודש הקודם' : 'השנה הקודמת'}
        </button>
        <h4 className="current-period-display">
          {viewMode === 'monthly' 
            ? `${monthNames[currentMonth]} ${currentYear}` 
            : currentYear}
        </h4>
        <button 
          onClick={() => viewMode === 'monthly' ? navigateMonth(1) : navigateYear(1)} 
          className="period-nav-button"
        >
          {viewMode === 'monthly' ? 'החודש הבא' : 'השנה הבאה'}
          <ChevronLeft className="nav-icon" />
        </button>
      </div>
      
      {/* סיכום סטטיסטי */}
      <div className="stats-summary-grid">
        <div className="stats-summary-card">
          <div className="stats-card-header">
            <Award className="stats-card-icon success-icon" />
            <h5 className="stats-card-title">ימי הצלחה</h5>
          </div>
          <div className="stats-card-value success-value">{stats.successCount}</div>
        </div>
        
        <div className="stats-summary-card">
          <div className="stats-card-header">
            <TrendingDown className="stats-card-icon fail-icon" />
            <h5 className="stats-card-title">ימי כישלון</h5>
          </div>
          <div className="stats-card-value fail-value">{stats.failCount}</div>
        </div>
        
        <div className="stats-summary-card">
          <div className="stats-card-header">
            <Calendar className="stats-card-icon" />
            <h5 className="stats-card-title">סה"כ ימים</h5>
          </div>
          <div className="stats-card-value">{stats.totalDays}</div>
        </div>
        
        <div className="stats-summary-card">
          <div className="stats-card-header">
            <TrendingUp className="stats-card-icon" />
            <h5 className="stats-card-title">אחוז הצלחה</h5>
          </div>
          <div className={`stats-card-value ${stats.successRate > 70 ? 'high-rate' : stats.successRate > 40 ? 'medium-rate' : 'low-rate'}`}>
            {stats.successRate}%
          </div>
        </div>
      </div>
      
      {/* תצוגה חודשית - טבלת ימים */}
      {viewMode === 'monthly' && (
        <>
          {filteredDays.length > 0 ? (
            <div className="days-table-container">
              <h4 className="days-table-title">
                ימים מסומנים ב{monthNames[currentMonth]} {currentYear}
              </h4>
              <table className="days-table">
                <thead>
                  <tr>
                    <th>תאריך</th>
                    <th>סטטוס</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDays.map(([dateKey, status]) => (
                    <tr key={dateKey}>
                      <td>{formatDateDisplay(dateKey)}</td>
                      <td className={status === 'success' ? 'success-status' : 'fail-status'}>
                        {status === 'success' ? 
                          <><CheckCircle className="status-icon" /> עמד ביעד</> : 
                          <><XCircle className="status-icon" /> לא עמד ביעד</>}
                      </td>
                    </tr>
                  )
                )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-month-message">אין נתונים מסומנים ב{monthNames[currentMonth]} {currentYear}</p>
          )}
        </>
      )}
      
      {/* תצוגה שנתית - סיכום חודשי */}
      {viewMode === 'yearly' && (
        <div className="yearly-stats-container">
          <h4 className="yearly-stats-title">סיכום חודשי לשנת {currentYear}</h4>
          
          {monthlyStatsForYear.some(month => month.totalDays > 0) ? (
            <table className="monthly-stats-table">
              <thead>
                <tr>
                  <th>חודש</th>
                  <th>ימי הצלחה</th>
                  <th>ימי כישלון</th>
                  <th>סה"כ ימים</th>
                  <th>אחוז הצלחה</th>
                </tr>
              </thead>
              <tbody>
                {monthlyStatsForYear.map((monthStats) => (
                  monthStats.totalDays > 0 && (
                    <tr key={monthStats.month}>
                      <td>{monthNames[monthStats.month]}</td>
                      <td className="success-cell">{monthStats.successCount}</td>
                      <td className="fail-cell">{monthStats.failCount}</td>
                      <td>{monthStats.totalDays}</td>
                      <td className={`rate-cell ${monthStats.successRate > 70 ? 'high-rate' : monthStats.successRate > 40 ? 'medium-rate' : 'low-rate'}`}>
                        {monthStats.successRate}%
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-year-message">אין נתונים מסומנים בשנת {currentYear}</p>
          )}
        </div>
      )}
    </div>
  );
};

// קומפוננטת הדשבורד החדשה
const UserDashboardView = ({ user, onBack }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('diet'); // 'diet', 'weight', 'workouts'
  
  useEffect(() => {
    const loadUserDashboard = async () => {
      try {
        setLoading(true);
        
        // שליפת נתוני הדשבורד של המשתמש
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // איסוף כל המידע הרלוונטי לדשבורד
          const dashboardInfo = {
            trackedDays: userData.trackedDays || {},
            weightData: userData.weightData || [],
            workouts: userData.workouts || [],
            dietGoals: userData.dietGoals || {},
            weightGoals: userData.weightGoals || {},
            notes: userData.notes || {}
          };
          
          setDashboardData(dashboardInfo);
        }
      } catch (error) {
        console.error('Error loading user dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserDashboard();
  }, [user.uid]);
  
  // פונקציית הצגת תאריך בפורמט מקומי
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>טוען נתוני דשבורד...</p>
      </div>
    );
  }
  
  return (
    <div className="admin-user-dashboard">
      <div className="dashboard-header">
        <button onClick={onBack} className="back-button">
          <ChevronRight className="back-icon" />
          חזרה לרשימת משתמשים
        </button>
        
        <h2 className="dashboard-title">
          דשבורד של {user.name}
        </h2>
        
        <div className="user-email">{user.email}</div>
      </div>
      
      {/* לשוניות הדשבורד */}
      <div className="dashboard-tabs">
        <button 
          onClick={() => setActiveTab('diet')}
          className={`dashboard-tab ${activeTab === 'diet' ? 'active-tab' : ''}`}
        >
          <Clipboard className="tab-icon" />
          מעקב תפריט
        </button>
        <button 
          onClick={() => setActiveTab('weight')}
          className={`dashboard-tab ${activeTab === 'weight' ? 'active-tab' : ''}`}
        >
          <Scale className="tab-icon" />
          מעקב משקל
        </button>
        <button 
          onClick={() => setActiveTab('workouts')}
          className={`dashboard-tab ${activeTab === 'workouts' ? 'active-tab' : ''}`}
        >
          <Activity className="tab-icon" />
          אימונים
        </button>
      </div>
      
      {/* תצוגת מעקב תפריט */}
      {activeTab === 'diet' && (
        <div className="diet-tracking-section">
          <div className="section-header">
            <h3 className="section-title">
              <Clipboard className="section-icon" />
              מעקב תפריט ויעדים קלוריים
            </h3>
          </div>
          
          {Object.keys(dashboardData.trackedDays).length === 0 ? (
            <p className="empty-data-message">המשתמש טרם החל מעקב תפריט</p>
          ) : (
            <>
              {/* כרטיס סיכום מעקב תפריט */}
              <div className="diet-summary-card">
                <div className="card-header">
                  <h4>סיכום מעקב תפריט</h4>
                </div>
                <div className="diet-stats">
                  <div className="stat-item">
                    <div className="stat-label">סה"כ ימים מתועדים</div>
                    <div className="stat-value">{Object.keys(dashboardData.trackedDays).length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">ימי הצלחה</div>
                    <div className="stat-value success">
                      {Object.values(dashboardData.trackedDays).filter(status => status === 'success').length}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">ימי אי-עמידה ביעד</div>
                    <div className="stat-value fail">
                      {Object.values(dashboardData.trackedDays).filter(status => status === 'fail').length}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">אחוז הצלחה</div>
                    <div className="stat-value">
                      {(() => {
                        const successCount = Object.values(dashboardData.trackedDays).filter(status => status === 'success').length;
                        const totalDays = Object.keys(dashboardData.trackedDays).length;
                        return totalDays ? Math.round((successCount / totalDays) * 100) : 0;
                      })()}%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* טבלת ימים מתועדים */}
              <div className="tracked-days-table-container">
                <h4>ימים מתועדים (10 אחרונים)</h4>
                <table className="tracked-days-table">
                  <thead>
                    <tr>
                      <th>תאריך</th>
                      <th>סטטוס</th>
                      <th>הערות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(dashboardData.trackedDays)
                      .sort((a, b) => new Date(b[0]) - new Date(a[0])) // מיון לפי תאריך - החדש ביותר קודם
                      .slice(0, 10) // הצגת 10 הימים האחרונים בלבד
                      .map(([date, status]) => (
                        <tr key={date} className={status === 'success' ? 'success-row' : 'fail-row'}>
                          <td>{formatDate(date)}</td>
                          <td>
                            {status === 'success' ? 
                              <><CheckCircle className="status-icon success" /> עמד ביעד</> : 
                              <><XCircle className="status-icon fail" /> לא עמד ביעד</>}
                          </td>
                          <td>
                            {dashboardData.notes && dashboardData.notes[date] ? 
                              dashboardData.notes[date] : '-'}
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* יעדים תזונתיים */}
              {dashboardData.dietGoals && Object.keys(dashboardData.dietGoals).length > 0 && (
                <div className="diet-goals-section">
                  <h4>יעדים תזונתיים נוכחיים</h4>
                  <div className="goals-container">
                    {dashboardData.dietGoals.calories && (
                      <div className="goal-item">
                        <div className="goal-label">יעד קלוריות יומי</div>
                        <div className="goal-value">{dashboardData.dietGoals.calories} קלוריות</div>
                      </div>
                    )}
                    {dashboardData.dietGoals.protein && (
                      <div className="goal-item">
                        <div className="goal-label">יעד חלבון יומי</div>
                        <div className="goal-value">{dashboardData.dietGoals.protein} גרם</div>
                      </div>
                    )}
                    {dashboardData.dietGoals.carbs && (
                      <div className="goal-item">
                        <div className="goal-label">יעד פחמימות יומי</div>
                        <div className="goal-value">{dashboardData.dietGoals.carbs} גרם</div>
                      </div>
                    )}
                    {dashboardData.dietGoals.fat && (
                      <div className="goal-item">
                        <div className="goal-label">יעד שומן יומי</div>
                        <div className="goal-value">{dashboardData.dietGoals.fat} גרם</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* תצוגת מעקב משקל */}
      {activeTab === 'weight' && (
        <div className="weight-tracking-section">
          <div className="section-header">
            <h3 className="section-title">
              <Scale className="section-icon" />
              מעקב משקל והתקדמות
            </h3>
          </div>
          
          {!dashboardData.weightData || dashboardData.weightData.length === 0 ? (
            <p className="empty-data-message">המשתמש טרם החל במעקב משקל</p>
          ) : (
            <>
              {/* יעדי משקל */}
              {dashboardData.weightGoals && Object.keys(dashboardData.weightGoals).length > 0 && (
                <div className="weight-goals-card">
                  <h4>יעדי משקל</h4>
                  <div className="weight-goals-container">
                    {dashboardData.weightGoals.startingWeight && (
                      <div className="weight-goal-item">
                        <div className="goal-label">משקל התחלתי</div>
                        <div className="goal-value">{dashboardData.weightGoals.startingWeight} ק"ג</div>
                      </div>
                    )}
                    {dashboardData.weightGoals.targetWeight && (
                      <div className="weight-goal-item">
                        <div className="goal-label">משקל יעד</div>
                        <div className="goal-value">{dashboardData.weightGoals.targetWeight} ק"ג</div>
                      </div>
                    )}
                    {dashboardData.weightGoals.weeklyGoal && (
                      <div className="weight-goal-item">
                        <div className="goal-label">יעד שבועי</div>
                        <div className="goal-value">{dashboardData.weightGoals.weeklyGoal} ק"ג בשבוע</div>
                      </div>
                    )}
                  </div>
                  
                  {/* חישוב התקדמות */}
                  {dashboardData.weightGoals.startingWeight && dashboardData.weightGoals.targetWeight && (
                    <div className="weight-progress">
                      <h5>התקדמות לעבר היעד</h5>
                      {(() => {
                        const sortedWeights = [...dashboardData.weightData].sort(
                          (a, b) => new Date(b.date) - new Date(a.date)
                        );
                        const currentWeight = sortedWeights.length > 0 ? sortedWeights[0].weight : null;
                        
                        if (currentWeight) {
                          const startWeight = dashboardData.weightGoals.startingWeight;
                          const targetWeight = dashboardData.weightGoals.targetWeight;
                          const isLoss = targetWeight < startWeight;
                          
                          let totalChange = Math.abs(startWeight - targetWeight);
                          let currentChange = Math.abs(startWeight - currentWeight);
                          let progressPercent = Math.min(100, Math.round((currentChange / totalChange) * 100));
                          
                          return (
                            <div className="progress-stats">
                              <div className="progress-bar-container">
                                <div 
                                  className="progress-bar" 
                                  style={{ width: `${progressPercent}%` }}
                                ></div>
                              </div>
                              <div className="progress-text">
                                {progressPercent}% מהיעד הושג
                                {isLoss ? 
                                  ` (ירידה של ${(startWeight - currentWeight).toFixed(1)} ק"ג מתוך ${totalChange.toFixed(1)} ק"ג)` : 
                                  ` (עלייה של ${(currentWeight - startWeight).toFixed(1)} ק"ג מתוך ${totalChange.toFixed(1)} ק"ג)`}
                              </div>
                            </div>
                          );
                        }
                        return <div>אין נתונים מספיקים לחישוב התקדמות</div>;
                      })()}
                    </div>
                  )}
                </div>
              )}
              
              {/* טבלת מדידות משקל */}
              <div className="weight-table-container">
                <h4>מדידות משקל (10 אחרונות)</h4>
                <table className="weight-table">
                  <thead>
                    <tr>
                      <th>תאריך</th>
                      <th>משקל (ק"ג)</th>
                      <th>שינוי</th>
                      <th>הערות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...dashboardData.weightData]
                      .sort((a, b) => new Date(b.date) - new Date(a.date)) // מיון לפי תאריך - החדש ביותר קודם
                      .slice(0, 10) // הצגת 10 המדידות האחרונות בלבד
                      .map((entry, index, arr) => {
                        // חישוב השינוי ממדידה קודמת
                        let change = null;
                        if (index < arr.length - 1) {
                          change = entry.weight - arr[index + 1].weight;
                        }
                        
                        return (
                          <tr key={entry.date}>
                            <td>{formatDate(entry.date)}</td>
                            <td>{entry.weight} ק"ג</td>
                            <td className={change > 0 ? 'weight-increase' : change < 0 ? 'weight-decrease' : ''}>
                              {change !== null ? 
                                `${change > 0 ? '+' : ''}${change.toFixed(1)} ק"ג` : 
                                '-'}
                            </td>
                            <td>{entry.notes || '-'}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* תצוגת אימונים */}
      {activeTab === 'workouts' && (
        <div className="workouts-section">
          <div className="section-header">
            <h3 className="section-title">
              <Activity className="section-icon" />
              מעקב אימונים ופעילות גופנית
            </h3>
          </div>
          
          {!dashboardData.workouts || dashboardData.workouts.length === 0 ? (
            <p className="empty-data-message">המשתמש טרם תיעד אימונים</p>
          ) : (
            <>
              {/* סיכום אימונים */}
              <div className="workouts-summary-card">
                <h4>סיכום אימונים</h4>
                <div className="workout-stats">
                  <div className="stat-item">
                    <div className="stat-label">סה"כ אימונים</div>
                    <div className="stat-value">{dashboardData.workouts.length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">אימוני כוח</div>
                    <div className="stat-value">
                      {dashboardData.workouts.filter(workout => workout.type === 'strength').length}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">אימוני סיבולת</div>
                    <div className="stat-value">
                      {dashboardData.workouts.filter(workout => workout.type === 'cardio').length}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">אימונים אחרים</div>
                    <div className="stat-value">
                      {dashboardData.workouts.filter(workout => 
                        workout.type !== 'strength' && workout.type !== 'cardio').length}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* טבלת אימונים */}
              <div className="workouts-table-container">
                <h4>אימונים אחרונים (10 אחרונים)</h4>
                <table className="workouts-table">
                  <thead>
                    <tr>
                      <th>תאריך</th>
                      <th>סוג אימון</th>
                      <th>משך</th>
                      <th>קלוריות</th>
                      <th>פרטים</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...dashboardData.workouts]
                      .sort((a, b) => new Date(b.date) - new Date(a.date)) // מיון לפי תאריך - החדש ביותר קודם
                      .slice(0, 10) // הצגת 10 האימונים האחרונים בלבד
                      .map((workout) => {
                        const workoutType = () => {
                          switch(workout.type) {
                            case 'strength': return 'אימון כוח';
                            case 'cardio': return 'אימון סיבולת';
                            case 'flexibility': return 'אימון גמישות';
                            case 'hiit': return 'אימון HIIT';
                            default: return workout.type || 'לא צוין';
                          }
                        };
                        
                        return (
                          <tr key={workout.date + '-' + workout.type}>
                            <td>{formatDate(workout.date)}</td>
                            <td>{workoutType()}</td>
                            <td>{workout.duration ? `${workout.duration} דקות` : '-'}</td>
                            <td>{workout.calories ? `${workout.calories} קק"ל` : '-'}</td>
                            <td>{workout.details || '-'}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;