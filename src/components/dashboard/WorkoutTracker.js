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
    
    // עדכון Firebase
    updateData(updatedWorkouts);
    
    // איפוס הטופס
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
  
  const toggleForm = () => {
    if (isFormVisible && editIndex !== null) {
      // Reset form if canceling an edit
      setNewWorkout({
        date: new Date().toISOString().split('T')[0],
        type: '',
        duration: '',
        intensity: 'medium',
        calories: '',
        notes: ''
      });
      setEditIndex(null);
    }
    setIsFormVisible(!isFormVisible);
  };
  
  const getWorkoutTypeIcon = (type) => {
    const typeToLower = type.toLowerCase();
    if (typeToLower.includes('ריצה') || typeToLower.includes('הליכה')) {
      return '🏃';
    } else if (typeToLower.includes('אופניים') || typeToLower.includes('רכיבה')) {
      return '🚴';
    } else if (typeToLower.includes('שחייה')) {
      return '🏊';
    } else if (typeToLower.includes('משקולות') || typeToLower.includes('כוח')) {
      return '🏋️';
    } else if (typeToLower.includes('יוגה')) {
      return '🧘';
    } else {
      return '💪';
    }
  };
  
  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low':
        return 'intensity-low';
      case 'medium':
        return 'intensity-medium';
      case 'high':
        return 'intensity-high';
      default:
        return '';
    }
  };
  
  const filterWorkouts = () => {
    if (filter === 'all') {
      return workouts;
    }
    
    return workouts.filter(workout => 
      workout.type.toLowerCase().includes(filter.toLowerCase())
    );
  };
  
  const calculateStats = () => {
    if (workouts.length === 0) return { total: 0, avg: 0, max: 0 };
    
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, workout) => 
      sum + (parseInt(workout.calories) || 0), 0);
    const totalDuration = workouts.reduce((sum, workout) => 
      sum + (parseInt(workout.duration) || 0), 0);
    
    const avgCaloriesPerWorkout = Math.round(totalCalories / totalWorkouts);
    const avgDuration = Math.round(totalDuration / totalWorkouts);
    
    const maxCalories = Math.max(...workouts.map(w => parseInt(w.calories) || 0));
    
    return {
      total: totalWorkouts,
      avgCalories: avgCaloriesPerWorkout,
      avgDuration: avgDuration,
      maxCalories: maxCalories,
      totalCalories: totalCalories,
      totalDuration: totalDuration
    };
  };
  
  const stats = calculateStats();
  const filteredWorkouts = filterWorkouts();
  
  // Sort workouts by date (newest first)
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return (
    <div className="workout-tracker">
      <div className="workout-header">
        <h3>מעקב אימונים</h3>
        <button className="workout-add-btn" onClick={toggleForm}>
          {isFormVisible ? 'ביטול' : 'הוסף אימון'}
        </button>
      </div>
      
      {isFormVisible && (
        <form className="workout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>תאריך:</label>
            <input
              type="date"
              name="date"
              value={newWorkout.date}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>סוג אימון:</label>
            <input
              type="text"
              name="type"
              value={newWorkout.type}
              onChange={handleInputChange}
              placeholder="לדוגמה: ריצה, אימון כוח, יוגה"
              required
            />
          </div>
          
          <div className="form-group">
            <label>משך (דקות):</label>
            <input
              type="number"
              name="duration"
              value={newWorkout.duration}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>רמת מאמץ:</label>
            <select
              name="intensity"
              value={newWorkout.intensity}
              onChange={handleInputChange}
            >
              <option value="low">קל</option>
              <option value="medium">בינוני</option>
              <option value="high">גבוה</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>קלוריות:</label>
            <input
              type="number"
              name="calories"
              value={newWorkout.calories}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>הערות:</label>
            <textarea
              name="notes"
              value={newWorkout.notes}
              onChange={handleInputChange}
              rows="2"
            />
          </div>
          
          <button type="submit" className="workout-submit-btn">
            {editIndex !== null ? 'עדכן אימון' : 'הוסף אימון'}
          </button>
        </form>
      )}
      
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
        {sortedWorkouts.length > 0 ? (
          sortedWorkouts.map((workout, index) => (
            <div className="workout-item" key={index}>
              <div className="workout-date">
                {new Date(workout.date).toLocaleDateString('he-IL')}
              </div>
              <div className="workout-type">
                <span className="workout-icon">{getWorkoutTypeIcon(workout.type)}</span> {workout.type}
              </div>
              <div className="workout-details">
                <div className={`workout-intensity ${getIntensityColor(workout.intensity)}`}>
                  {workout.intensity === 'low' ? 'קל' : 
                   workout.intensity === 'medium' ? 'בינוני' : 'גבוה'}
                </div>
                <div className="workout-duration">{workout.duration} דקות</div>
                {workout.calories && (
                  <div className="workout-calories">{workout.calories} קלוריות</div>
                )}
              </div>
              {workout.notes && (
                <div className="workout-notes">{workout.notes}</div>
              )}
              <div className="workout-actions">
                <button onClick={() => handleEdit(index)} className="edit-btn">ערוך</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">מחק</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-workouts">
            לא נמצאו אימונים. הוסף את האימון הראשון שלך!
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutTracker;