import React, { lazy, Suspense } from 'react';

const LazySuccessStoriesComponent = lazy(() => import('./SuccessStoriesComponent'));

const SuccessStories = () => (
  <Suspense fallback={<div className="loading-screen">טוען סיפורי הצלחה...</div>}>
    <LazySuccessStoriesComponent />
  </Suspense>
);

export default SuccessStories;
