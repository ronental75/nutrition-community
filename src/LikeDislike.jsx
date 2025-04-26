import React, { useEffect, useState } from 'react';


import { dbRealtime } from './firebase'; // Correct import for likes
import { ref, set, get, onValue } from "firebase/database";


export default function LikeDislike({ slug }) {
  const [userIP, setUserIP] = useState('');
  const [status, setStatus] = useState(null);
  const [counts, setCounts] = useState({ like: 0, dislike: 0 });

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        const sanitizedIP = data.ip.split('.').join('_');
        setUserIP(sanitizedIP);
      });
  }, []);

  useEffect(() => {
    if (!userIP) return;
    const countRef = ref(dbRealtime, `likes/${slug}`);
    const userRef = ref(dbRealtime, `likes/${slug}/users/${userIP}`);

    get(countRef).then((snapshot) => {
      const data = snapshot.val() || {};
      setCounts({
        like: data.likeCount || 0,
        dislike: data.dislikeCount || 0
      });
    });

    get(userRef).then((snapshot) => {
      setStatus(snapshot.val() ?? null);
    });
  }, [userIP, slug]);

  const updateReaction = async (newStatus) => {
    if (!userIP) return;

    const countRef = ref(dbRealtime, `likes/${slug}`);
    const userRef = ref(dbRealtime, `likes/${slug}/users/${userIP}`);

    const snapshot = await get(countRef);
    const data = snapshot.val() || { likeCount: 0, dislikeCount: 0 };

    let newCounts = { ...data };

    if (status === 'like') newCounts.likeCount--;
    if (status === 'dislike') newCounts.dislikeCount--;

    if (newStatus === status) {
      newStatus = null;
    } else {
      if (newStatus === 'like') newCounts.likeCount++;
      if (newStatus === 'dislike') newCounts.dislikeCount++;
    }

    await set(countRef, {
      likeCount: newCounts.likeCount,
      dislikeCount: newCounts.dislikeCount
    });

    await set(userRef, newStatus);
    setStatus(newStatus);
    setCounts({
      like: newCounts.likeCount,
      dislike: newCounts.dislikeCount
    });
  };
  const animateButton = (type) => {
    const btn = document.getElementById(`${type}-button`);
    if (btn) {
      btn.classList.add('scale-bounce');
      setTimeout(() => btn.classList.remove('scale-bounce'), 200);
    }
  };
  return (
    <div
  className="flex gap-4 items-center justify-center animate-fade-in"
  style={{
    fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
    fontSize: '1.1rem',
    color: '#1f2937'
  }}
>

<button
  onClick={() => {
    updateReaction('like');
    animateButton('like');
  }}
  id="like-button"
  className={`like-btn px-4 py-1 rounded-full transition border text-sm ${
    status === 'like'
      ? 'bg-blue-600 text-white font-bold'
      : 'bg-gray-100 text-gray-800'
  }`}
>
  <span role="img" aria-label="like">👍</span> אהבתי ({counts.like})
</button>

{/* <button
  onClick={() => {
    updateReaction('dislike');
    animateButton('dislike');
  }}
  id="dislike-button"
  className={`dislike-btn px-4 py-1 rounded-full transition border text-sm ${
    status === 'dislike'
      ? 'bg-red-600 text-white font-bold'
      : 'bg-gray-100 text-gray-800'
  }`}
>
  <span role="img" aria-label="dislike">👎</span> לא אהבתי ({counts.dislike})
</button> */}
    </div>
  );
}
