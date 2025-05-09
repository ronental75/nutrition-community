import React, { useState, useEffect } from 'react';

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // התאמה לאירוע beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // מניעת הצגת חלון ההתקנה האוטומטי
      e.preventDefault();
      // שמירת האירוע כדי להציג אותו מאוחר יותר
      setDeferredPrompt(e);
      // הצגת הכפתור
      setIsVisible(true);
    });

    // בדיקה אם האפליקציה כבר מותקנת
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    // ניקוי
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // הצגת חלון ההתקנה
    deferredPrompt.prompt();
    
    // המתנה לבחירת המשתמש
    const { outcome } = await deferredPrompt.userChoice;
    
    // ניקוי האירוע
    setDeferredPrompt(null);

    // הסתרת הכפתור אם המשתמש התקין
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
  };

  // אם אין אפשרות להתקנה, לא נציג כלום
  if (!isVisible) return null;

  return (
    <button 
      onClick={handleInstallClick}
      className="install-button"
    >
      התקן
    </button>
  );
};

export default InstallAppButton;