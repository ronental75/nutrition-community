import React from 'react';

function AnimatedBanner({ 
  text, 
  backgroundColor = '#f0f4f8', 
  textColor = '#2563eb',
  fontSize = '1.1rem',
  fontWeight = '600',
  animationDuration = '20s'
}) {
  return (
    <div className="banner-container">
      <div className="animated-banner">
        <span>{text}</span>
      </div>
      <style jsx>{`
        .banner-container {
          width: 100%;
          overflow: hidden;
          background-color: ${backgroundColor};
          padding: 10px 0;
          margin: 10px 0;
          border-radius: 4px;
        }
        
        .animated-banner {
          display: inline-block;
          white-space: nowrap;
          animation: moveRightToLeft ${animationDuration} linear infinite;
        }
        
        .animated-banner span {
          padding: 5px;
          font-weight: ${fontWeight};
          color: ${textColor};
          font-size: ${fontSize};
        }
        
        @keyframes moveRightToLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedBanner;