const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    phone: { type: String },
    height: { type: Number }, // cm, used to prefill BMI calculator
    weight: { type: Number }, // kg
    membership: {
      plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' },
      startDate: { type: Date },
      endDate: { type: Date },
      status: { type: String, enum: ['active', 'expired', 'none'], default: 'none' },
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
