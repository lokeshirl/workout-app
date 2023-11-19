import { createContext, useContext, useReducer } from 'react';

// creating workout context
export const WorkoutContext = createContext({});

// creating workout context hook
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context)
    throw new Error(
      'useWorkoutsContext must be used inside an WorkoutContextProvider'
    );

  return context;
};

// creating workout reducer
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELTE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

// creating workout context provider
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
