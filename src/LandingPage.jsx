import React, { useState, useEffect } from 'react';
import { dbRealtime } from './firebase';
import { ref, set, get, onValue } from 'firebase/database';
import UserLogin from './UserLogin';
import './LikeDislike.css';

const LikeDislike = ({ slug }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', או null
  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);

  // בדיקה אם המשתמש כבר מזוהה
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    const storedNickname = localStorage.getItem('user_nickname');
    
    if (storedUserId && storedNickname) {
      setUserId(storedUserId);
      setUserNickname(storedNickname);
    }
  }, []);

  // טעינת נתוני לייק/דיסלייק והפעולה של המשתמש הנוכחי
  useEffect(() => {
    if (!slug) return;

    // האזנה לשינויים במספר הלייקים והדיסלייקים
    const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
    const dislikesRef = ref(dbRealtime, `post_reactions/${slug}/dislikes`);
    
    const likesListener = onValue(likesRef, (snapshot) => {
      setLikes(snapshot.exists() ? snapshot.val() : 0);
    });

    const dislikesListener = onValue(dislikesRef, (snapshot) => {
      setDislikes(snapshot.exists() ? snapshot.val() : 0);
    });

    // בדיקה אם המשתמש כבר דירג את הפוסט
    const checkUserAction = async () => {
      if (userId) {
        try {
          const userActionRef = ref(dbRealtime, `user_reactions/${userId}/${slug}`);
          const snapshot = await get(userActionRef);
          
          if (snapshot.exists()) {
            setUserAction(snapshot.val());
          } else {
            setUserAction(null);
          }
        } catch (error) {
          console.error("Error checking user action:", error);
        }
      }
      setIsLoading(false);
    };

    checkUserAction();

    return () => {
      likesListener();
      dislikesListener();
    };
  }, [slug, userId]);

  const handleLike = async () => {
    if (isLoading || !userId) return;

    try {
      const userActionRef = ref(dbRealtime, `user_reactions/${userId}/${slug}`);
      const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
      const dislikesRef = ref(dbRealtime, `post_reactions/${slug}/dislikes`);

      // אם המשתמש כבר לחץ לייק, מבטל את הלייק
      if (userAction === 'like') {
        await set(userActionRef, null);
        await set(likesRef, Math.max(0, likes - 1));
        setUserAction(null);
      } 
      // אם המשתמש לא דירג או לחץ דיסלייק
      else {
        // אם המשתמש לחץ דיסלייק קודם, מבטל את הדיסלייק
        if (userAction === 'dislike') {
          await set(dislikesRef, Math.max(0, dislikes - 1));
        }
        
        // שומר את הלייק
        await set(userActionRef, 'like');
        await set(likesRef, (likes || 0) + 1);
        setUserAction('like');
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleDislike = async () => {
    if (isLoading || !userId) return;

    try {
      const userActionRef = ref(dbRealtime, `user_reactions/${userId}/${slug}`);
      const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
      const dislikesRef = ref(dbRealtime, `post_reactions/${slug}/dislikes`);

      // אם המשתמש כבר לחץ דיסלייק, מבטל את הדיסלייק
      if (userAction === 'dislike') {
        await set(userActionRef, null);
        await set(dislikesRef, Math.max(0, dislikes - 1));
        setUserAction(null);
      } 
      // אם המשתמש לא דירג או לחץ לייק
      else {
        // אם המשתמש לחץ לייק קודם, מבטל את הלייק
        if (userAction === 'like') {
          await set(likesRef, Math.max(0, likes - 1));
        }
        
        // שומר את הדיסלייק
        await set(userActionRef, 'dislike');
        await set(dislikesRef, (dislikes || 0) + 1);
        setUserAction('dislike');
      }
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  const handleUserLogin = (userData) => {
    setUserId(userData.userId);
    setUserNickname(userData.nickname);
  };

  // אם המשתמש לא מזוהה, מציג את טופס ההזדהות
  if (!userId) {
    return <UserLogin onLogin={handleUserLogin} />;
  }

  return (
    <div className="like-dislike-container">
      <div className="like-dislike-header">
        <div className="like-dislike-text">האם הפוסט הזה היה מועיל?</div>
        <div className="user-info">מחובר כ: {userNickname}</div>
      </div>
      
      <div className="like-dislike-buttons">
        <button 
          className={`like-button ${userAction === 'like' ? 'active' : ''}`} 
          onClick={handleLike}
          disabled={isLoading}
        >
          <span className="like-icon">👍</span>
          <span className="like-count">{likes || 0}</span>
        </button>
        <button 
          className={`dislike-button ${userAction === 'dislike' ? 'active' : ''}`} 
          onClick={handleDislike}
          disabled={isLoading}
        >
          <span className="dislike-icon">👎</span>
          <span className="dislike-count">{dislikes || 0}</span>
        </button>
      </div>
      
      {isLoading && <div className="like-dislike-loading">טוען...</div>}
    </div>
  );
};

export default LikeDislike;