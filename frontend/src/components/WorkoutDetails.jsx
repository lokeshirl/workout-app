import React from 'react';
import { useWorkoutsContext } from '../context/WorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDeleteClick = async () => {
    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: 'DELETE',
      }
    );
    const json = await response.json();
    dispatch({ type: 'DELTE_WORKOUT', payload: json });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDeleteClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
