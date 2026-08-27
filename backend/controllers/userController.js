const User = require('../models/User');

// @route PUT /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const fields = ['name', 'age', 'gender', 'phone', 'height', 'weight'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) user[field] = req.body[field];
    });

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      age: updated.age,
      gender: updated.gender,
      phone: updated.phone,
      height: updated.height,
      weight: updated.weight,
      role: updated.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile };
