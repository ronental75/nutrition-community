// AuthComponents.js - קובץ חדש עם כל קומפוננטות ההתחברות והניהול
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, XCircle, BarChart, User, Mail, Lock, LogOut, X } from 'lucide-react';
import * as firebaseConfig from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
// יצירת קונטקסט לאותנטיקציה שיהיה זמין בכל המערכת
const AuthContext = createContext(null);
const auth = firebaseConfig.auth;
const db = firebaseConfig.dbFirestore;
// Provider קומפוננטת
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  useEffect(() => {
    // const auth = getAuth();
    // const db = dbFirestore;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          // קבלת נתוני המשתמש מ-Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role || 'user');
            
            // עדכן את המשתמש עם נתונים מ-Firestore
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: userData.name || user.displayName,
              role: userData.role || 'user',
              approved: userData.approved || false,
              trackedDays: userData.trackedDays || {}
            });
          } else {
            // אם אין מסמך, צור חדש עם נתוני ברירת מחדל
            await setDoc(userDocRef, {
              name: user.displayName || '',
              email: user.email,
              role: 'user',
              approved: false,
              trackedDays: {}
            });
            
            setUserRole('user');
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || '',
              role: 'user',
              approved: false,
              trackedDays: {}
            });
          }
        } catch (error) {
          console.error("שגיאה בטעינת נתוני משתמש:", error);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const value = {
    currentUser,
    userRole,
    loading,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// הוק שימושי לגישה לנתוני האותנטיקציה
export const useAuth = () => {
  return useContext(AuthContext);
};

// קומפוננטת אייקון משתמש בתפריט העליון
export const UserIcon = () => {
  const { currentUser, openLoginModal } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      // const auth = getAuth();
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("שגיאה בהתנתקות:", error);
    }
  };
  
  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  if (currentUser) {
    // הצג ראשי תיבות של המשתמש
    const initials = currentUser.displayName
      ? currentUser.displayName
          .split(' ')
          .map(part => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : currentUser.email.substring(0, 2).toUpperCase();
    
    return (
      <div className="user-icon-container">
        <div 
          className="user-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {initials}
        </div>
        
        {isMenuOpen && (
          <div className="user-menu" 
            style={{
              position: 'absolute',
              top: '40px',
              left: '0',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              width: '200px',
              zIndex: 999
            }}
          >
            <div style={{
              padding: '12px',
              borderBottom: '1px solid #eee',
              fontSize: '14px'
            }}>
              <div style={{fontWeight: '600'}}>{currentUser.displayName}</div>
              <div style={{fontSize: '12px', color: '#666'}}>{currentUser.email}</div>
            </div>
            
            <div style={{padding: '8px 0'}}>
              <button 
                onClick={() => navigateTo('/diet-tracker')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  width: '100%',
                  textAlign: 'right',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                <Calendar style={{marginLeft: '8px', width: '18px', height: '18px'}} />
                מעקב תפריט
              </button>
              
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => navigateTo('/admin-panel')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    width: '100%',
                    textAlign: 'right',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <User style={{marginLeft: '8px', width: '18px', height: '18px'}} />
                  ניהול משתמשים
                </button>
              )}
            </div>
            
            <div style={{
              borderTop: '1px solid #eee',
              padding: '8px 0'
            }}>
              <button 
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  width: '100%',
                  textAlign: 'right',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#e53e3e'
                }}
              >
                <LogOut style={{marginLeft: '8px', width: '18px', height: '18px'}} />
                התנתק
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // הצג אייקון התחברות
    return (
      <button 
        onClick={openLoginModal}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px'
        }}
      >
        <User style={{width: '24px', height: '24px'}} />
      </button>
    );
  }
};

// מודל התחברות
export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  if (!isLoginModalOpen) return null;
  
  return (
    <div 
      className="login-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        className="login-modal-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '420px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button 
          className="close-button"
          onClick={closeLoginModal}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          <X style={{width: '20px', height: '20px'}} />
        </button>
        
        {isRegisterMode ? (
          <RegisterForm switchToLogin={() => setIsRegisterMode(false)} />
        ) : (
          <LoginForm switchToRegister={() => setIsRegisterMode(true)} />
        )}
      </div>
    </div>
  );
};

// טופס התחברות
const LoginForm = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { closeLoginModal } = useAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('נא למלא את כל השדות');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // const auth = getAuth();
      // const db = getFirestore();
      
      // התחברות עם Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // בדוק אם המשתמש מאושר
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().approved === false) {
        // התנתק אם המשתמש לא מאושר
        await signOut(auth);
        setError('החשבון שלך עדיין לא אושר על ידי מנהל המערכת');
      } else {
        // התחברות הצליחה
        closeLoginModal();
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('אימייל או סיסמה שגויים');
      } else if (error.code === 'auth/too-many-requests') {
        setError('יותר מדי ניסיונות כניסה כושלים. נסה שוב מאוחר יותר');
      } else {
        setError('אירעה שגיאה בהתחברות. נסה שוב מאוחר יותר');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{direction: 'rtl'}}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '16px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <User style={{marginLeft: '8px', width: '20px', height: '20px'}} />
        התחברות למערכת
      </h2>
      
      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '6px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div style={{marginBottom: '16px'}}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Mail style={{marginLeft: '6px', width: '16px', height: '16px'}} />
              אימייל
            </div>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              direction: 'ltr'
            }}
          />
        </div>
        
        <div style={{marginBottom: '20px'}}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Lock style={{marginLeft: '6px', width: '16px', height: '16px'}} />
              סיסמה
            </div>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              direction: 'ltr'
            }}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'מתחבר...' : 'התחבר'}
        </button>
      </form>
      
      <div style={{
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '14px'
      }}>
        <span style={{color: '#666'}}>אין לך חשבון? </span>
        <button 
          onClick={switchToRegister}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          הירשם עכשיו
        </button>
      </div>
    </div>
  );
};

// טופס הרשמה
const RegisterForm = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // בדיקת חוזק סיסמה
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: 'יש להזין סיסמה'
  });
  
  const checkPasswordStrength = (pass) => {
    if (!pass) {
      return { score: 0, message: 'יש להזין סיסמה' };
    }
    
    let score = 0;
    let message = '';
    
    // בדיקת אורך
    if (pass.length >= 8) score += 1;
    
    // בדיקת מספרים
    if (/\d/.test(pass)) score += 1;
    
    // בדיקת אותיות קטנות
    if (/[a-z]/.test(pass)) score += 1;
    
    // בדיקת אותיות גדולות
    if (/[A-Z]/.test(pass)) score += 1;
    
    // בדיקת תווים מיוחדים
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    // קביעת הודעה לפי ציון
    if (score === 0 || score === 1) {
      message = 'חלשה מאוד';
    } else if (score === 2) {
      message = 'חלשה';
    } else if (score === 3) {
      message = 'בינונית';
    } else if (score === 4) {
      message = 'חזקה';
    } else {
      message = 'חזקה מאוד';
    }
    
    return { score, message };
  };
  
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // איפוס הודעות
    setError('');
    setSuccess('');
    
    // בדיקת תקינות
    if (!name || !email || !password || !confirmPassword) {
      setError('נא למלא את כל השדות');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }
    
    // בדיקת חוזק סיסמה
    const strength = checkPasswordStrength(password);
    if (strength.score < 3) {
      setError('הסיסמה חלשה מדי. יש להשתמש בלפחות 8 תווים הכוללים אותיות, מספרים וסימנים מיוחדים');
      return;
    }
    
    setLoading(true);
    
    try {
      // const auth = getAuth();
      // const db = getFirestore();
      
      // יצירת משתמש חדש
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // שמירת נתוני המשתמש ב-Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: 'user',
        approved: false,
        trackedDays: {},
        createdAt: new Date().toISOString()
      });
      
      // שליחת הודעה למנהל (בפרויקט אמיתי זה יהיה בצד שרת)
      const adminNotificationRef = doc(collection(db, 'adminNotifications'));
      await setDoc(adminNotificationRef, {
        type: 'newUser',
        userId: user.uid,
        userName: name,
        userEmail: email,
        createdAt: new Date().toISOString(),
        read: false
      });
      
      // התנתק מהמשתמש החדש עד לאישור
      await signOut(auth);
      
      // הצג הודעת הצלחה
      setSuccess('ההרשמה התקבלה בהצלחה! החשבון שלך ממתין לאישור מנהל המערכת.');
      
      // איפוס טופס
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        setError('כתובת האימייל כבר רשומה במערכת');
      } else if (error.code === 'auth/invalid-email') {
        setError('כתובת אימייל לא תקינה');
      } else if (error.code === 'auth/weak-password') {
        setError('הסיסמה חלשה מדי');
      } else {
        setError('אירעה שגיאה בהרשמה. נסה שוב מאוחר יותר');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // רינדור סרגל חוזק סיסמה
  const renderPasswordStrengthBar = () => {
    const { score, message } = passwordStrength;
    
    let colorClass = '#e5e7eb';
    if (score === 1) colorClass = '#ef4444';
    else if (score === 2) colorClass = '#f97316';
    else if (score === 3) colorClass = '#eab308';
    else if (score === 4) colorClass = '#84cc16';
    else if (score === 5) colorClass = '#22c55e';
    
    return (
      <div style={{marginTop: '6px'}}>
        <div style={{
          height: '4px',
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              width: `${score * 20}%`,
              backgroundColor: colorClass,
              transition: 'all 0.3s'
            }}
          ></div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <span>{message}</span>
          <span>{score}/5</span>
        </div>
      </div>
    );
  };
  
  return (
    <div style={{direction: 'rtl'}}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '16px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <User style={{marginLeft: '8px', width: '20px', height: '20px'}} />
        הרשמה למערכת
      </h2>
      
      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '6px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{
          padding: '12px',
          backgroundColor: '#dcfce7',
          color: '#166534',
          borderRadius: '6px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {success}
        </div>
      )}
      
      <form onSubmit={handleRegister}>
        <div style={{marginBottom: '16px'}}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            שם מלא
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{marginBottom: '16px'}}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Mail style={{marginLeft: '6px', width: '16px', height: '16px'}} />
              אימייל
            </div>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              direction: 'ltr'
            }}
          />
        </div>
        
        <div style={{marginBottom: '16px'}}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Lock style={{marginLeft: '6px', width: '16px', height: '16px'}} />
              סיסמה
            </div>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              direction: 'ltr'
            }}
          />
          {renderPasswordStrengthBar()}
          <div style={{
            marginTop: '4px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            הסיסמה חייבת להכיל לפחות 8 תווים, אותיות גדולות וקטנות, מספרים וסימנים מיוחדים
          </div>
        </div>
        
        <div style={{marginBottom: '20px'}}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            אימות סיסמה
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              direction: 'ltr'
            }}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'נרשם...' : 'הירשם'}
        </button>
      </form>
      
      <div style={{
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '14px'
      }}>
        <span style={{color: '#666'}}>כבר יש לך חשבון? </span>
        <button 
          onClick={switchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          התחבר
        </button>
      </div>
    </div>
  );
};

// קומפוננטת לוח שנה למעקב תפריט
export const DietTrackerCalendar = () => {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trackedDays, setTrackedDays] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // אם אין משתמש מחובר, נווט לדף התחברות
    if (!currentUser) {
      navigate('/');
      return;
    }
    
    const loadUserData = async () => {
      try {
        setLoading(true);
        // const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // בדוק אם המשתמש מאושר
          if (!userData.approved) {
            alert('החשבון שלך עדיין לא אושר על ידי מנהל המערכת');
            navigate('/contact');
            return;
          }
          
          // טען את נתוני מעקב התפריט
          setTrackedDays(userData.trackedDays || {});
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [currentUser, navigate]);
  
  // שמירת נתוני מעקב ב-Firestore
  const updateTrackedDays = async (newTrackedDays) => {
    if (!currentUser) return;
    
    try {
      // const db = getFirestore();
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // עדכון נתוני המשתמש
      await updateDoc(userDocRef, {
        trackedDays: newTrackedDays
      });
      
      setTrackedDays(newTrackedDays);
    } catch (error) {
      console.error('Error updating tracked days:', error);
      alert('אירעה שגיאה בשמירת הנתונים');
    }
  };
  
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
  const toggleDayStatus = (day) => {
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
    
    updateTrackedDays(newTrackedDays);
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

  if (loading) {
    return <div className="loading-container">טוען נתונים...</div>;
  }
  
  return (
    <div dir="rtl" className="diet-tracker-container">
    <div className="calendar-header">
      <div className="title-with-back">
        <button onClick={() => navigate('/')} className="inline-back-button">
          <span className="back-arrow">←</span>
        </button>
        <h2 className="calendar-title">
          <Calendar className="calendar-icon" />
          מעקב תפריט חודשי
        </h2>
      </div>
      <div className="month-navigation">
        <button 
          onClick={() => changeMonth(-1)}
          className="month-nav-button"
        >
          &lt; הקודם
        </button>
        <h3 className="current-month">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          className="month-nav-button"
        >
          הבא &gt;
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

// דף השגיאה כשמנסים לגשת למעקב תפריט ללא הרשאה
export const UnauthorizedAccess = () => {
  return (
    <div dir="rtl" className="unauthorized-container">
      <h2 className="unauthorized-title">גישה מוגבלת</h2>
      <p className="unauthorized-message">
        מעקב התפריט זמין רק ללקוחות רשומים.
      </p>
      <div className="unauthorized-actions">
        <button 
          onClick={() => window.location.href = '/contact'}
          className="contact-button"
        >
          צור קשר לפרטים נוספים
        </button>
      </div>
    </div>
  );
};