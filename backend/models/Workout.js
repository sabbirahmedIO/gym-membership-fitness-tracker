const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseName: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
      default: 'strength',
    },
    duration: { type: Number, required: true }, // minutes
    caloriesBurned: { type: Number, default: 0 },
    sets: { type: Number },
    reps: { type: Number },
    weightUsed: { type: Number }, // kg
    notes: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
