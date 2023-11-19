import { Router } from 'express';
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkoutsById,
  updateWorkout,
} from '../controllers/workout.controllers.js';
import requireAuth from '../middleware/requireAuth.middleware.js';

const workoutRoutes = Router();

// authorization middleware
workoutRoutes.use(requireAuth);

// GET all workouts
workoutRoutes.get('/', getWorkouts);

// GET a single workout
workoutRoutes.get('/:id', getWorkoutsById);

// POST new workout
workoutRoutes.post('/', createWorkout);

// DELETE a workout
workoutRoutes.delete('/:id', deleteWorkout);

// UPDATE a workout
workoutRoutes.patch('/:id', updateWorkout);

export default workoutRoutes;
