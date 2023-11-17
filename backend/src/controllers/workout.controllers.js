import Workout from '../models/workouts.models.js';

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET a single workout
const getWorkoutsById = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: 'No such workout' });
  }
};

// CREATE new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  const emptyField = [];

  if (!title) emptyField.push('title');
  if (!reps) emptyField.push('reps');
  if (!load) emptyField.push('load');

  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields!', emptyField });
  }

  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    console.log(workout);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'No such workout' });
  }
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'No such workout' });
  }
};

export {
  createWorkout,
  getWorkouts,
  getWorkoutsById,
  deleteWorkout,
  updateWorkout,
};
