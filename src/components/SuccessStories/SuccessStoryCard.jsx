import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import './SuccessStories.css';

// רכיב להצגת סיפור הצלחה בודד - גרסה מורחבת
const SuccessStoryCard = ({ story }) => {
  // חישוב הירידה הכוללת במשקל
  const totalLoss = (story.startWeight - story.currentWeight).toFixed(1);
  const percentageLoss = ((totalLoss / story.startWeight) * 100).toFixed(1);

  // פונקציה לעיצוב התאריך בטולטיפ
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // עיצוב מותאם לטולטיפ משקל
  const CustomWeightTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dateFormatted = formatDate(label);
      const weightValue = payload[0].value;
      const changeValue = story.weightData.find(item => item.date === label)?.change || 0;
      
      return (
        <div className="chart-tooltip">
          <p className="tooltip-date">{dateFormatted}</p>
          <p className="tooltip-weight">משקל: {weightValue} ק"ג</p>
          <p className={`tooltip-change ${changeValue > 0 ? 'weight-gain' : changeValue < 0 ? 'weight-loss' : ''}`}>
            שינוי: {changeValue > 0 ? '+' : ''}{changeValue} ק"ג
          </p>
        </div>
      );
    }
    return null;
  };

  // עיצוב מותאם לטולטיפ אימונים
  const CustomWorkoutsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const workoutData = story.workoutData?.find(item => item.week.toString() === label);
      
      return (
        <div className="chart-tooltip">
          <p className="tooltip-date">{workoutData?.date}</p>
          <p className="tooltip-weight">מספר אימונים: {payload[0].value}</p>
          <p className="tooltip-details">{workoutData?.details || ''}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="success-story-card">
      <div className="success-story-header-stats">
        <div className="stat-box">
          <h3>גיל</h3>
          <div className="stat-value">{story.age}</div>
        </div>
        <div className="stat-box">
          <h3>גובה</h3>
          <div className="stat-value">{story.height} ס"מ</div>
        </div>
        <div className="stat-box">
          <h3>משקל התחלתי</h3>
          <div className="stat-value">{story.startWeight} ק"ג</div>
        </div>
        <div className="stat-box">
          <h3>משקל נוכחי</h3>
          <div className="stat-value highlight">{story.currentWeight} ק"ג</div>
        </div>
        <div className="stat-box">
          <h3>סה"כ ירידה</h3>
          <div className="stat-value highlight">{totalLoss} ק"ג</div>
        </div>
      </div>
      
      <div className="success-story-intro">
  {story.image && (
    <div className="success-story-image">
      <img src={story.image} alt={`סיפור ההצלחה של ${story.name}`} />
    </div>
  )}

        <div className="success-story-description">
          <h2>הסיפור של {story.name}</h2>
          <p>{story.fullDescription}</p>
          
          {/* הצגת נקודות מרכזיות אם יש
          {story.highlights && story.highlights.length > 0 && (
            <div className="success-story-highlights">
              <h3>הישגים בולטים:</h3>
              <ul className="highlights-list">
                {story.highlights.map((highlight, index) => (
                  <li key={index} className="highlight-item">{highlight}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
      
      <div className="success-story-quote">
        <div className="quote-mark left">"</div>
        <p className="quote-text">{story.quote}</p>
        <div className="quote-mark right">"</div>
        <p className="quote-author">- {story.name}, {story.gender === 'female' ? 'בת' : 'בן'} {story.age}</p>
      </div>
      
      <div className="success-story-progress">
        <h3>מעקב התקדמות</h3>
        
        <div className="chart-container">
          <div className="weight-chart-wrapper">
            <h4 className="chart-title">התקדמות במשקל</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={story.weightData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => {
                    const parts = value.split('/');
                    return `${parts[0]}/${parts[1]}`;
                  }}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomWeightTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#0d9488"
                  strokeWidth={2}
                  name="משקל (ק״ג)"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


{/* תצוגת נתוני אימונים אם קיימים */}
{story.workoutData && story.workoutData.length > 0 && (
  <div className="workouts-chart-wrapper">
    <h4 className="chart-title">מעקב אימונים שבועי - כוח ואירובי</h4>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={story.workoutData}
        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          label={{ 
            value: 'שבוע', 
            position: 'insideBottom', 
            offset: -5,
            style: { fontSize: '14px', fill: '#374151' }
          }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          domain={[0, 'dataMax + 1']}
          label={{ 
            value: 'מספר אימונים', 
            angle: -90, 
            position: 'insideLeft',
            style: { fontSize: '14px', fill: '#374151' }
          }}
        />
       
        {/* <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const workoutData = story.workoutData.find(item => item.week === parseInt(label));
              
              return (
                <div className="chart-tooltip">
                  <p className="tooltip-date">שבוע {label} ({workoutData?.date})</p>
                  <p className="tooltip-strength">
                    <span className="tooltip-strength-color"></span>
                    אימוני כוח: {payload[0].value}
                  </p>
                  <p className="tooltip-cardio">
                    <span className="tooltip-cardio-color"></span>
                    אימוני אירובי: {payload[1].value}
                  </p>
                  <p className="tooltip-total">סה"כ: {workoutData?.totalWorkouts} אימונים</p>
                </div>
              );
            }
            return null;
          }}
          wrapperStyle={{ zIndex: 1000 }}
        /> */}
        <Legend 
          verticalAlign="top"
          align="right"
          wrapperStyle={{ paddingBottom: 10 }}
          payload={[
            { value: 'אימוני כוח', type: 'square', color: '#8884d8' },
            { value: 'אימוני אירובי', type: 'square', color: '#82ca9d' },
          ]}
        />
        
        <Bar 
          dataKey="strengthWorkouts" 
          name="אימוני כוח" 
          stackId="a"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
        >
          <LabelList 
            dataKey="strengthWorkouts" 
            position="inside" 
            fill="#ffffff"
            fontSize={11}
            fontWeight="bold"
          />
        </Bar>
        <Bar 
          dataKey="cardioWorkouts" 
          name="אימוני אירובי" 
          stackId="a"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
        >
          <LabelList 
            dataKey="cardioWorkouts" 
            position="inside" 
            fill="#ffffff"
            fontSize={11}
            fontWeight="bold"
          />
        </Bar>
        <text 
          x="50%" 
          y="95%" 
          textAnchor="middle" 
          dominantBaseline="hanging"
          style={{ fontSize: '12px', fill: '#666' }}
        >
          * הגרף כולל פירוט מלא של האימונים השבועיים בכל שבוע 
        </text>
      </BarChart>
    </ResponsiveContainer>
  </div>
)}

          {/* טבלת נתוני משקל */}
          <div className="data-tables-container">
            <div className="weight-table">
              <h4 className="table-title">טבלת משקל</h4>
              <div className="weight-table-header">
                <div className="weight-table-cell">תאריך</div>
                <div className="weight-table-cell">משקל (ק"ג)</div>
                <div className="weight-table-cell">שינוי (ק"ג)</div>
                {story.bmiData && <div className="weight-table-cell">BMI</div>}
              </div>
              <div className="weight-table-body">
                {story.weightData.map((entry, index) => {
                  const bmiValue = story.bmiData && story.bmiData[index] ? story.bmiData[index].bmi : null;
                  
                  return (
                    <div key={index} className="weight-table-row">
                      <div className="weight-table-cell">{entry.date}</div>
                      <div className="weight-table-cell weight-value">{entry.weight}</div>
                      <div className={`weight-table-cell ${
                        entry.change > 0 
                          ? 'weight-gain' 
                          : entry.change < 0 
                            ? 'weight-loss' 
                            : ''
                      }`}>
                        {entry.change > 0 ? '+' : ''}{entry.change}
                      </div>
                      {story.bmiData && (
                        <div className="weight-table-cell">{bmiValue}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="success-story-contact">
        <div className="contact-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
        </div>
        <div className="contact-text">
          <p>מתלבטים אם התהליך מתאים לכם? ניתן לשוחח עם {story.name} ולשמוע באופן ישיר על חווית הליווי לפני תחילת התהליך.</p>
          <a href="/contact" className="contact-link">צרו קשר לתיאום שיחה &larr;</a>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;