import React from 'react';

export default function Share() {
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'קהילת תזונה ואורח חיים בריא',
        text: 'אתר מומלץ - פוסטים בנושא תזונה,ספורט ואורח חיים בריא!',
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Sharing failed', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('הקישור הועתק ללוח! עכשיו אפשר לשלוח אותו לחברים');
    }
  }

  return (
    <button
      onClick={handleShare}
      className="share-button"
      title="שתף את האתר"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="white"
      >
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.02-4.11c.53.5 1.23.81 2.07.81 1.66 0 3-1.34 3-3S19.66 2 18 2s-3 1.34-3 3c0 .24.04.47.09.7l-7.02 4.11c-.53-.5-1.23-.81-2.07-.81-1.66 0-3 1.34-3 3s1.34 3 3 3c.84 0 1.54-.31 2.07-.81l7.13 4.15c-.05.21-.07.43-.07.66 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    </button>
  );
}
