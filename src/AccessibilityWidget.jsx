import React, { useState, useEffect } from 'react';
import './accessibility.css';

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    document.body.style.zoom = `${zoom}%`;
  }, [zoom]);

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleOutline = () => {
    document.body.classList.toggle('show-outline');
  };

  const toggleLinkHighlight = () => {
    document.body.classList.toggle('highlight-links');
  };

  const resetAll = () => {
    document.body.classList.remove('high-contrast', 'show-outline', 'highlight-links');
    setZoom(100);
  };

  return (
    <div className="accessibility-widget" dir="rtl">
      <button className="accessibility-toggle" onClick={() => setOpen(!open)}>
        נגישות
      </button>
      {open && (
        <div className="accessibility-panel">
          <button onClick={() => setZoom(zoom + 10)}>הגדל טקסט</button>
          <button onClick={() => setZoom(zoom - 10)}>הקטן טקסט</button>
          <button onClick={toggleHighContrast}>ניגודיות גבוהה</button>
          <button onClick={toggleOutline}>הצג קווים תחומים</button>
          <button onClick={toggleLinkHighlight}>הדגש קישורים</button>
          <button onClick={resetAll}>איפוס</button>
        </div>
      )}
    </div>
  );
}
