import React, { useEffect, useState } from 'react';
import { dbRealtime } from './firebase';
import { ref, onValue } from "firebase/database";

export default function LikeDisplay({ slug }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const likesRef = ref(dbRealtime, `likes/${slug}`);
    onValue(likesRef, (snapshot) => {
      const data = snapshot.val();
      setLikes(data?.likes || 0);
    });
  }, [slug]);

  return (
    <div className="post-meta-likes">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656l-1.414 1.415L10 18l-5.414-5.414-1.414-1.415a4 4 0 010-5.656z" />
      </svg>
      {likes}
    </div>
  );
}
