import React, { useState, useEffect } from 'react';
import { dbRealtime } from './firebase';
import { ref, onValue } from 'firebase/database';
import './LikeDisplay.css';

const LikeDisplay = ({ slug }) => {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // האזנה בזמן אמת לשינויים במספר הלייקים
    const likesRef = ref(dbRealtime, `post_reactions/${slug}/likes`);
    
    const unsubscribe = onValue(likesRef, (snapshot) => {
      setLikes(snapshot.exists() ? snapshot.val() : 0);
      setIsLoading(false);
    }, (error) => {
      console.error("Error loading likes:", error);
      setIsLoading(false);
    });

    // ניקוי ההאזנה בעת פירוק הרכיב
    return () => unsubscribe();
  }, [slug]);

  // אם אין לייקים או עדיין טוען, לא מציג כלום
  if (isLoading || likes === 0) {
    return null;
  }

  return (
    <div className="like-display">
      <span className="like-icon">👍</span>
      <span className="like-count">{likes}</span>
    </div>
  );
};

export default LikeDisplay;