const Workout = require('../models/Workout');

// @route POST /api/workouts
const addWorkout = async (req, res, next) => {
  try {
    const { exerciseName, category, duration, caloriesBurned, sets, reps, weightUsed, notes, date } =
      req.body;

    if (!exerciseName || !duration) {
      return res.status(400).json({ message: 'Exercise name and duration are required' });
    }

    const workout = await Workout.create({
      user: req.user._id,
      exerciseName,
      category,
      duration,
      caloriesBurned,
      sets,
      reps,
      weightUsed,
      notes,
      date: date || Date.now(),
    });

    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

// @route GET /api/workouts  (logged-in user's history)
const getMyWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
};

// @route GET /api/workouts/stats  (summary numbers used by dashboard + charts)
const getWorkoutStats = async (req, res, next) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: 1 });

    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

    // Build a 7-day activity trend (minutes per day) for the progress chart
    const today = new Date();
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

    const minutesByDay = last7Days.map((day) => {
      const minutes = workouts
        .filter((w) => new Date(w.date).toISOString().slice(0, 10) === day)
        .reduce((sum, w) => sum + (w.duration || 0), 0);
      return { day, minutes };
    });

    // Current streak: consecutive days (ending today) with at least one workout
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const hasWorkout = workouts.some((w) => new Date(w.date).toISOString().slice(0, 10) === key);
      if (hasWorkout) streak++;
      else if (i !== 0) break;
      else continue;
    }

    res.json({ totalWorkouts, totalMinutes, totalCalories, minutesByDay, streak });
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/workouts/:id
const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this workout' });
    }
    await workout.deleteOne();
    res.json({ message: 'Workout removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addWorkout, getMyWorkouts, getWorkoutStats, deleteWorkout };
