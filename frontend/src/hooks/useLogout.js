import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useWorkoutsContext } from '../context/WorkoutContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    workoutDispatch({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
