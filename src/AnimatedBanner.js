import React from 'react';

function AnimatedBanner({ 
  text, 
  backgroundColor = '#f0f4f8', 
  textColor = '#2563eb',
  fontSize = '0.95rem', // Smaller default size
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
          padding: 8px 0;
          margin: 8px 0;
          border-radius: 4px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }
        
        .animated-banner {
          display: inline-block;
          white-space: nowrap;
          animation: moveLeftToRight ${animationDuration} linear infinite;
        }
        
        .animated-banner span {
          padding: 5px;
          font-weight: ${fontWeight};
          color: ${textColor};
          font-size: ${fontSize};
        }
        
        @keyframes moveLeftToRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        /* Responsive font size */
        @media (min-width: 640px) {
          .animated-banner span {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedBanner;