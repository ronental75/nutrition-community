// קובץ: story2.js

export default {
    id: 'story2',
    name: 'א\'',
    age: 23,
    gender: 'female',
    height: 157,
    startWeight: 53.6,
    currentWeight: 49.5,
    shortDescription: 'התחילה בעקבות אמא שלה (ה\'), רצתה להתחטב ולשפר כושר גופני. עברה לשגרת אימונים קבועה למרות קשיים בגב.',
    fullDescription: 'א\' בת 23, גובה 157 ס"מ הגיעה בעקבות אמה (ה\'), במשקל התחלתי של 53.6 ק"ג . הצטרפה לתהליך במטרה להתחטב ולהגיע למשקל של 50 ק"ג. באופן הדרגתי ואיטי, א\' נכנסה לשגרת אימונים קבועה המשלבת אימוני כוח ואימונים אירוביים, וכיום מתאמנת 4-5 פעמים בשבוע בממוצע. התהליך האיטי והמדורג אפשר לה לשמר את מסת השריר ולהגיע לחיטוב הרצוי. בימים אלה א\' החלה תהליך של שימור!!!',
    quote: 'בהתחלה חשבתי שאימונים קבועים הם בלתי אפשריים עבורי בגלל כאבי הגב, אבל הליווי האישי והתהליך האיטי לימדו אותי שהכל אפשרי כשמקשיבים לגוף ומתקדמים בקצב הנכון.',
    weightData: [
      { date: '25/12/2024', weight: 53.6, change: 0 },
      { date: '01/01/2025', weight: 53.3, change: -0.3 },
      { date: '08/01/2025', weight: 53.0, change: -0.3 },
      { date: '15/01/2025', weight: 52.8, change: -0.2 },
      { date: '22/01/2025', weight: 52.0, change: -0.8 },
      { date: '29/01/2025', weight: 52.2, change: 0.2 },
      { date: '05/02/2025', weight: 51.9, change: -0.3 },
      { date: '12/02/2025', weight: 51.6, change: -0.3 },
      { date: '19/02/2025', weight: 50.7, change: -0.9 },
      { date: '26/02/2025', weight: 50.3, change: -0.4 },
      { date: '05/03/2025', weight: 50.2, change: -0.1 },
      { date: '12/03/2025', weight: 49.7, change: -0.5 },
      { date: '19/03/2025', weight: 49.9, change: 0.2 },
      { date: '26/03/2025', weight: 49.5, change: -0.4 }
    ],
    workoutData: [
        { 
          week: 0, 
          date: '15/12/2024', 
          strengthWorkouts: 2, 
          cardioWorkouts: 2, 
          totalWorkouts: 4
        },
        { 
          week: 1, 
          date: '22/12/2024', 
          strengthWorkouts: 2, 
          cardioWorkouts: 1, 
          totalWorkouts: 3
        },
        { 
          week: 2, 
          date: '29/12/2024', 
          strengthWorkouts: 3, 
          cardioWorkouts: 2, 
          totalWorkouts: 5
        },
        { 
          week: 3, 
          date: '05/01/2025', 
          strengthWorkouts: 3,
          cardioWorkouts: 1, 
          totalWorkouts: 4
        },
        { 
          week: 4, 
          date: '12/01/2025', 
          strengthWorkouts: 2, 
          cardioWorkouts: 3, 
          totalWorkouts: 5
        },
        { 
          week: 5, 
          date: '19/01/2025', 
          strengthWorkouts: 1, 
          cardioWorkouts: 1, 
          totalWorkouts: 2
        },
        { 
          week: 6, 
          date: '26/01/2025', 
          strengthWorkouts: 3, 
          cardioWorkouts: 1, 
          totalWorkouts: 4
        },
        { 
          week: 7, 
          date: '02/02/2025', 
          strengthWorkouts: 3, 
          cardioWorkouts: 2, 
          totalWorkouts: 5
        },
        { 
          week: 8, 
          date: '09/02/2025', 
          strengthWorkouts: 2, 
          cardioWorkouts: 1, 
          totalWorkouts: 3 
         
        },
        { 
          week: 9, 
          date: '16/02/2025', 
          strengthWorkouts: 3, 
          cardioWorkouts: 2, 
          totalWorkouts: 5 
          
        },
        { 
          week: 10, 
          date: '23/02/2025', 
          strengthWorkouts: 2, 
          cardioWorkouts: 3, 
          totalWorkouts: 5
        },
        { 
          week: 11, 
          date: '02/03/2025', 
          strengthWorkouts: 2, 
          cardioWorkouts: 3, 
          totalWorkouts: 5
        },
        { 
          week: 12, 
          date: '09/03/2025', 
          strengthWorkouts: 2, 
          cardioWorkouts: 2, 
          totalWorkouts: 4
        },
        { 
          week: 13, 
          date: '16/03/2025', 
          strengthWorkouts: 2, 
          cardioWorkouts: 3, 
          totalWorkouts: 5
        }
      ],
    // bmiData: [
    //   { date: '25/12/2024', bmi: 21.7 },
    //   { date: '01/01/2025', bmi: 21.6 },
    //   { date: '08/01/2025', bmi: 21.5 },
    //   { date: '15/01/2025', bmi: 21.4 },
    //   { date: '22/01/2025', bmi: 21.1 },
    //   { date: '29/01/2025', bmi: 21.2 },
    //   { date: '05/02/2025', bmi: 21.1 },
    //   { date: '12/02/2025', bmi: 20.9 },
    //   { date: '19/02/2025', bmi: 20.6 },
    //   { date: '26/02/2025', bmi: 20.4 },
    //   { date: '05/03/2025', bmi: 20.4 },
    //   { date: '12/03/2025', bmi: 20.2 },
    //   { date: '19/03/2025', bmi: 20.2 },
    //   { date: '26/03/2025', bmi: 20.1 }
    // ],
    image: null, // אם אין תמונה
    highlights: [
      'ירידה של 4.1 ק"ג תוך שמירה על מסת שריר',
      'מעבר מאפס אימונים לשגרה של 4-5 אימונים שבועיים',
      'התגברות על כאבי גב וגמישות יתר',
      'שילוב הדרגתי של ריצה באימונים',
      'שיפור יכולת התמדה בפעילות גופנית'
    ]
  };