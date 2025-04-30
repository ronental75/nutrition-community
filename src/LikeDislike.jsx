import React, { useState, useEffect } from 'react';
import { dbRealtime } from './firebase';
import { ref, set, get } from 'firebase/database';
import UserLogin from './UserLogin';
import './LikeDislike.css';

const LikeDislike = ({ slug }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
  const [userNickname, setUserNickname] = useState(localStorage.getItem('user_nickname') || null);
  const [showLogin, setShowLogin] = useState(false);
  const [userAction, setUserAction] = useState(null); // 'like' או 'dislike'

  // טעינת נתוני לייק/דיסלייק והפעולה הקודמת של המשתמש
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        // קריאת מספר הלייקים והדיסלייקים
        const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
        const dislikesRef = ref(dbRealtime, `post_reactions/${slug}/dislikes`);
        
        const [likesSnapshot, dislikesSnapshot] = await Promise.all([
          get(likesRef),
          get(dislikesRef)
        ]);
        
        setLikes(likesSnapshot.exists() ? likesSnapshot.val() : 0);
        setDislikes(dislikesSnapshot.exists() ? dislikesSnapshot.val() : 0);
        
        // בדיקה אם המשתמש כבר הצביע
        if (userId) {
          const userReactionsRef = ref(dbRealtime, `user_reactions/${userId}/${slug}`);
          const userReactionsSnapshot = await get(userReactionsRef);
          
          if (userReactionsSnapshot.exists()) {
            setUserAction(userReactionsSnapshot.val());
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading post reactions:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, userId]);

  // פונקציה להתנתקות
  const handleLogout = () => {
    // מחיקת נתוני המשתמש מהאחסון המקומי
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_nickname');
    
    // איפוס מצב המשתמש ברכיב
    setUserId(null);
    setUserNickname(null);
    setUserAction(null);
  };

  // הפונקציה שתיקרא כשמשתמש מנסה ללחוץ לייק/דיסלייק ללא הזדהות
  const handleActionWithoutLogin = () => {
    if (!userId) {
      setShowLogin(true);
    }
  };

  // הפונקציה שתיקרא אחרי הזדהות מוצלחת
  const handleUserLogin = (userData) => {
    setUserId(userData.userId);
    setUserNickname(userData.nickname);
    setShowLogin(false);
  };

  // פונקציות עבור לייק ודיסלייק
  const handleLike = async () => {
    if (!userId) {
      handleActionWithoutLogin();
      return;
    }

    try {
      const userReactionsRef = ref(dbRealtime, `user_reactions/${userId}/${slug}`);
      const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
      const dislikesRef = ref(dbRealtime, `post_reactions/${slug}/dislikes`);
      
      // אם המשתמש כבר לחץ לייק, מבטלים
      if (userAction === 'like') {
        await set(userReactionsRef, null);
        await set(likesRef, Math.max(0, likes - 1));
        setLikes(Math.max(0, likes - 1));
        setUserAction(null);
      } 
      // אם המשתמש לא לחץ כלום או לחץ דיסלייק
      else {
        // אם המשתמש לחץ דיסלייק קודם, מבטלים
        if (userAction === 'dislike') {
          await set(dislikesRef, Math.max(0, dislikes - 1));
          setDislikes(Math.max(0, dislikes - 1));
        }
        
        await set(userReactionsRef, 'like');
        await set(likesRef, (likes || 0) + 1);
        setLikes((likes || 0) + 1);
        setUserAction('like');
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleDislike = async () => {
    if (!userId) {
      handleActionWithoutLogin();
      return;
    }

    try {
      const userReactionsRef = ref(dbRealtime, `user_reactions/${userId}/${slug}`);
      const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
      const dislikesRef = ref(dbRealtime, `post_reactions/${slug}/dislikes`);
      
      // אם המשתמש כבר לחץ דיסלייק, מבטלים
      if (userAction === 'dislike') {
        await set(userReactionsRef, null);
        await set(dislikesRef, Math.max(0, dislikes - 1));
        setDislikes(Math.max(0, dislikes - 1));
        setUserAction(null);
      } 
      // אם המשתמש לא לחץ כלום או לחץ לייק
      else {
        // אם המשתמש לחץ לייק קודם, מבטלים
        if (userAction === 'like') {
          await set(likesRef, Math.max(0, likes - 1));
          setLikes(Math.max(0, likes - 1));
        }
        
        await set(userReactionsRef, 'dislike');
        await set(dislikesRef, (dislikes || 0) + 1);
        setDislikes((dislikes || 0) + 1);
        setUserAction('dislike');
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  // מציג טופס הזדהות אם הפעילו אותו
  if (showLogin) {
    return <UserLogin onLogin={handleUserLogin} />;
  }

  return (
    <div className="like-dislike-container">
      <div className="like-dislike-header">
        <div className="like-dislike-text">האם הפוסט הזה היה מועיל?</div>
        {userId && (
          <div className="user-info">
            <span className="user-nickname">מחובר כ: {userNickname}</span>
            <button onClick={handleLogout} className="logout-button">התנתק</button>
          </div>
        )}
      </div>
      
      <div className="like-dislike-buttons">
        <button 
          className={`like-button ${userAction === 'like' ? 'active' : ''}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          <span className="like-icon">👍</span>
          <span className="like-count">{likes}</span>
        </button>
        <button 
          className={`dislike-button ${userAction === 'dislike' ? 'active' : ''}`}
          onClick={handleDislike}
          disabled={isLoading}
        >
          <span className="dislike-icon">👎</span>
          <span className="dislike-count">{dislikes}</span>
        </button>
      </div>
      
      {isLoading && <div className="like-dislike-loading">טוען...</div>}
    </div>
  );
};

export default LikeDislike;