const Membership = require('../models/Membership');
const User = require('../models/User');

// @route GET /api/memberships  (public list of active plans)
const getMemberships = async (req, res, next) => {
  try {
    const plans = await Membership.find({ isActive: true }).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

// @route POST /api/memberships/subscribe/:planId  (member chooses a plan)
const subscribeToPlan = async (req, res, next) => {
  try {
    const plan = await Membership.findById(req.params.planId);
    if (!plan) return res.status(404).json({ message: 'Membership plan not found' });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    const user = await User.findById(req.user._id);
    user.membership = { plan: plan._id, startDate, endDate, status: 'active' };
    await user.save();

    const populated = await user.populate('membership.plan');
    res.json(populated.membership);
  } catch (error) {
    next(error);
  }
};

// ----- Admin only -----

// @route POST /api/memberships
const createMembership = async (req, res, next) => {
  try {
    const { name, price, durationInMonths, features, description } = req.body;
    const plan = await Membership.create({ name, price, durationInMonths, features, description });
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/memberships/:id
const updateMembership = async (req, res, next) => {
  try {
    const plan = await Membership.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Membership plan not found' });

    Object.assign(plan, req.body);
    const updated = await plan.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/memberships/:id
const deleteMembership = async (req, res, next) => {
  try {
    const plan = await Membership.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Membership plan not found' });
    await plan.deleteOne();
    res.json({ message: 'Membership plan removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMemberships,
  subscribeToPlan,
  createMembership,
  updateMembership,
  deleteMembership,
};
