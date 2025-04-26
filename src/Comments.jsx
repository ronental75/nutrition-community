import React, { useEffect, useState } from 'react';
import { dbFirestore } from './firebase'; // 👈 import dbFirestore correctly
import { collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const auth = getAuth();

  useEffect(() => {
    // Sign in anonymously once
    if (!auth.currentUser) {
      signInAnonymously(auth).catch((error) => console.error('Anonymous sign-in error:', error));
    }
  }, [auth]);

  useEffect(() => {
    // Load comments for this post
    const q = query(
      collection(dbFirestore, "comments"),
      where("slug", "==", slug),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedComments = [];
      querySnapshot.forEach((doc) => {
        loadedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(loadedComments);
    });

    return () => unsubscribe();
  }, [slug]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      console.log('Empty comment. Not sending.');
      return;
    }
    if (isSending) {
      console.log('Already sending...');
      return;
    }

    if (!auth.currentUser) {
      console.log('User not signed in. Signing in...');
      await signInAnonymously(auth);
    }

    console.log('Adding comment:', newComment);

    setIsSending(true);

    try {
      await addDoc(collection(dbFirestore, "comments"), {
        slug: slug,
        text: newComment,
        createdAt: new Date(),
        uid: auth.currentUser?.uid || "anonymous",
        parentCommentId: parentCommentId ? parentCommentId : null
      });
      console.log('Comment added successfully.');
    } catch (error) {
      console.error('Error adding comment:', error);
    }

    setNewComment('');
    setParentCommentId(null);

    setTimeout(() => {
      setIsSending(false);
    }, 1000);
  };

  const handleReply = (commentId) => {
    setParentCommentId(commentId);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const renderComments = (parentId = null, level = 0) => {
    const filtered = comments.filter(c => (parentId ? c.parentCommentId === parentId : !c.parentCommentId));

    const visibleComments = parentId === null
      ? filtered.slice(0, visibleCount)
      : filtered;

    return visibleComments.map(comment => (
      <div
        key={comment.id}
        className={`p-3 rounded-lg mb-2 ${level === 0 ? 'bg-gray-100' : 'bg-gray-50'} border border-gray-200`}
        style={{ marginRight: level * 20 }}
      >
        <div className="text-right">{comment.text}</div>

        <div className="flex justify-end mt-1">
          <button
            onClick={() => handleReply(comment.id)}
            className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
          >
            הגב
          </button>
        </div>

        <div className="mt-2">
          {renderComments(comment.id, level + 1)}
        </div>
      </div>
    ));
  };

  return (
    <div dir="rtl" className="w-full p-4 bg-white rounded shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4 text-right">תגובות</h3>

      <div className="space-y-2 mb-6">
        {renderComments()}
      </div>

      {comments.filter(c => !c.parentCommentId).length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleCount(visibleCount + 5)}
            className="text-blue-600 font-semibold hover:underline"
          >
            הצג עוד תגובות
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-2 mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 resize-y min-h-[100px] focus:ring-2 focus:ring-blue-300"
          placeholder={parentCommentId ? "כתבו תגובה להודעה..." : "הוסיפו תגובה חדשה..."}
        />
        <button
          onClick={handleAddComment}
          disabled={isSending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isSending ? "שולח..." : "שלח תגובה"}
        </button>
      </div>
    </div>
  );
}
