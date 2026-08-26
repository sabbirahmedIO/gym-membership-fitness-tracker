// Seeds the database with demo data so you have something to show right away.
// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Membership = require('./models/Membership');
const Workout = require('./models/Workout');

const seed = async () => {
  await connectDB();

  await User.deleteMany();
  await Membership.deleteMany();
  await Workout.deleteMany();

  const plans = await Membership.insertMany([
    {
      name: 'Basic',
      price: 999,
      durationInMonths: 1,
      description: 'Great for getting started with gym access.',
      features: ['Gym floor access', 'Locker room access', 'Free fitness assessment'],
    },
    {
      name: 'Standard',
      price: 2499,
      durationInMonths: 3,
      description: 'Our most popular plan for consistent training.',
      features: ['Everything in Basic', 'Group classes', '1 trainer session / month'],
    },
    {
      name: 'Premium',
      price: 7999,
      durationInMonths: 12,
      description: 'Best value for serious, long-term members.',
      features: ['Everything in Standard', 'Unlimited trainer sessions', 'Nutrition guidance', 'Priority booking'],
    },
  ]);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@gymtracker.com',
    password: 'admin123',
    role: 'admin',
  });

  const member = await User.create({
    name: 'Sabbir Ahmed',
    email: 'member@gymtracker.com',
    password: 'member123',
    role: 'member',
    age: 22,
    gender: 'male',
    height: 175,
    weight: 70,
    membership: {
      plan: plans[1]._id,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      status: 'active',
    },
  });

  const today = new Date();
  const demoWorkouts = [
    { exerciseName: 'Bench Press', category: 'strength', duration: 40, caloriesBurned: 220, sets: 4, reps: 10, weightUsed: 60, daysAgo: 0 },
    { exerciseName: 'Treadmill Run', category: 'cardio', duration: 30, caloriesBurned: 300, daysAgo: 1 },
    { exerciseName: 'Squats', category: 'strength', duration: 35, caloriesBurned: 250, sets: 5, reps: 8, weightUsed: 80, daysAgo: 2 },
    { exerciseName: 'Yoga Flow', category: 'flexibility', duration: 25, caloriesBurned: 120, daysAgo: 4 },
    { exerciseName: 'Basketball', category: 'sports', duration: 60, caloriesBurned: 450, daysAgo: 5 },
  ];

  for (const w of demoWorkouts) {
    const date = new Date(today);
    date.setDate(date.getDate() - w.daysAgo);
    await Workout.create({ user: member._id, date, ...w });
  }

  console.log('Seed data created successfully!');
  console.log('Admin login -> admin@gymtracker.com / admin123');
  console.log('Member login -> member@gymtracker.com / member123');
  process.exit();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
