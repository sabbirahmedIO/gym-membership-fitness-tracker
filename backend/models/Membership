const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    features: [{ type: String }],
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Membership', membershipSchema);
