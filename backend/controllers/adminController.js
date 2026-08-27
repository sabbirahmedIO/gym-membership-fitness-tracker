const User = require('../models/User');
const Workout = require('../models/Workout');
const Membership = require('../models/Membership');

// @route GET /api/admin/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const totalMembers = await User.countDocuments({ role: 'member' });
    const activeMembers = await User.countDocuments({ role: 'member', 'membership.status': 'active' });
    const totalWorkoutsLogged = await Workout.countDocuments();
    const totalPlans = await Membership.countDocuments();

    const planBreakdown = await User.aggregate([
      { $match: { 'membership.status': 'active' } },
      { $group: { _id: '$membership.plan', count: { $sum: 1 } } },
      { $lookup: { from: 'memberships', localField: '_id', foreignField: '_id', as: 'plan' } },
      { $unwind: { path: '$plan', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, planName: '$plan.name', count: 1 } },
    ]);

    res.json({ totalMembers, activeMembers, totalWorkoutsLogged, totalPlans, planBreakdown });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/admin/members?search=
const getMembers = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = { role: 'member' };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const members = await User.find(filter).populate('membership.plan').sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/admin/members/:id
const updateMember = async (req, res, next) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    const fields = ['name', 'email', 'age', 'gender', 'phone'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) member[f] = req.body[f];
    });

    const updated = await member.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/admin/members/:id
const deleteMember = async (req, res, next) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    await member.deleteOne();
    res.json({ message: 'Member removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats, getMembers, updateMember, deleteMember };
