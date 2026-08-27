const express = require('express');
const {
  addWorkout,
  getMyWorkouts,
  getWorkoutStats,
  deleteWorkout,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addWorkout).get(protect, getMyWorkouts);
router.get('/stats', protect, getWorkoutStats);
router.delete('/:id', protect, deleteWorkout);

module.exports = router;
