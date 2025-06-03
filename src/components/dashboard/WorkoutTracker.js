import React, { useState } from 'react';
import './WorkoutTracker.css';

const WorkoutTracker = ({ workouts, updateData, userId }) => {
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    duration: '',
    intensity: 'medium',
    calories: '',
    notes: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout({
      ...newWorkout,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedWorkouts;
    if (editIndex !== null) {
      updatedWorkouts = [...workouts];
      updatedWorkouts[editIndex] = newWorkout;
    } else {
      updatedWorkouts = [...workouts, newWorkout];
    }

    updateData(updatedWorkouts);
    setNewWorkout({
      date: new Date().toISOString().split('T')[0],
      type: '',
      duration: '',
      intensity: 'medium',
      calories: '',
      notes: ''
    });
    setEditIndex(null);
    setIsFormVisible(false);
  };

  const handleEdit = (index) => {
    setNewWorkout(workouts[index]);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק את האימון הזה?');
    if (confirmed) {
      const updatedWorkouts = workouts.filter((_, i) => i !== index);
      updateData(updatedWorkouts);
    }
  };

  const getWorkoutTypeIcon = (type) => {
    const typeToLower = type.toLowerCase();
    if (typeToLower.includes('ריצה')) return '🏃';
    if (typeToLower.includes('משקולות')) return '🏋️';
    if (typeToLower.includes('שחייה')) return '🏊';
    if (typeToLower.includes('יוגה')) return '🧘';
    if (typeToLower.includes('אופניים')) return '🚴';
    return '💪';
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayWorkouts = workouts.filter(
        (workout) => new Date(workout.date).toDateString() === date.toDateString()
      );

      calendarDays.push(
        <div key={day} className="calendar-day">
          <span className="day-number">{day}</span>
          <div className="workout-icons">
            {dayWorkouts.map((workout, index) => (
              <span key={index} className="workout-icon">{getWorkoutTypeIcon(workout.type)}</span>
            ))}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  const calculateStats = () => {
    const filtered = workouts.filter(
      (workout) =>
        new Date(workout.date).getMonth() === currentMonth.getMonth() &&
        new Date(workout.date).getFullYear() === currentMonth.getFullYear()
    );

    const totalCalories = filtered.reduce((sum, workout) => sum + parseInt(workout.calories || 0), 0);
    const totalDuration = filtered.reduce((sum, workout) => sum + parseInt(workout.duration || 0), 0);
    const avgDuration = filtered.length > 0 ? Math.round(totalDuration / filtered.length) : 0;

    return {
      total: filtered.length,
      avgDuration,
      totalCalories
    };
  };

  const filterWorkouts = () => {
    if (filter === 'all') return workouts;

    return workouts.filter((workout) => workout.type.includes(filter));
  };

  const stats = calculateStats();
  const filteredWorkouts = filterWorkouts();
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="workout-tracker">
      <div className="workout-header">
        <h3>מעקב אימונים</h3>
        <button className="workout-add-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'ביטול' : 'הוסף אימון'}
        </button>
      </div>

      {isFormVisible && (
        <form className="workout-form" onSubmit={handleSubmit}>
          <label>תאריך:</label>
          <input type="date" name="date" value={newWorkout.date} onChange={handleInputChange} required />
          <label>סוג אימון:</label>
          <input
            type="text"
            name="type"
            value={newWorkout.type}
            onChange={handleInputChange}
            placeholder="לדוגמה: ריצה, משקולות, שחייה, יוגה, אופניים"
            required
          />
          <label>משך (דקות):</label>
          <input type="number" name="duration" value={newWorkout.duration} onChange={handleInputChange} required />
          <label>קלוריות:</label>
          <input type="number" name="calories" value={newWorkout.calories} onChange={handleInputChange} />
          <label>הערות:</label>
          <textarea name="notes" value={newWorkout.notes} onChange={handleInputChange}></textarea>
          <button type="submit">שמור אימון</button>
        </form>
      )}

      <div className="workout-navigation">
        <button onClick={handlePrevMonth}>חודש קודם</button>
        <span>
          {currentMonth.toLocaleString('he-IL', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth}>חודש הבא</button>
      </div>

      <div className="calendar-grid">{renderCalendar()}</div>

      <div className="workout-stats">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">סה"כ אימונים</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.avgDuration || 0}</div>
          <div className="stat-label">דקות בממוצע</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.totalCalories || 0}</div>
          <div className="stat-label">סה"כ קלוריות</div>
        </div>
      </div>

      <div className="workout-filter">
        <label>סנן לפי סוג אימון:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">הכל</option>
          <option value="ריצה">ריצה</option>
          <option value="אופניים">אופניים</option>
          <option value="שחייה">שחייה</option>
          <option value="כוח">אימון כוח</option>
          <option value="יוגה">יוגה</option>
        </select>
      </div>

      <div className="workout-list">
        {sortedWorkouts.map((workout, index) => (
          <div key={index} className="workout-item">
            <div className="workout-date">{new Date(workout.date).toLocaleDateString('he-IL')}</div>
            <div className="workout-type">
              <span className="workout-icon">{getWorkoutTypeIcon(workout.type)}</span> {workout.type}
            </div>
            <div className="workout-duration">{workout.duration} דקות</div>
            <div className="workout-calories">{workout.calories} קלוריות</div>
            <div className="workout-actions">
              <button onClick={() => handleEdit(index)} className="edit-btn">ערוך</button>
              <button onClick={() => handleDelete(index)} className="delete-btn">מחק</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutTracker;