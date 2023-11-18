import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import workoutRoutes from './routes/workout.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Databse Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB Connected');
  })
  .catch((error) => {
    console.log('ERR DB Connection :: ', error);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Workout Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running at PORT :: ${process.env.PORT || 8000}`);
});
