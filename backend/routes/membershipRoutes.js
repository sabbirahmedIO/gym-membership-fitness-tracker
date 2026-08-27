const express = require('express');
const {
  getMemberships,
  subscribeToPlan,
  createMembership,
  updateMembership,
  deleteMembership,
} = require('../controllers/membershipController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMemberships);
router.post('/subscribe/:planId', protect, subscribeToPlan);

router.post('/', protect, adminOnly, createMembership);
router.put('/:id', protect, adminOnly, updateMembership);
router.delete('/:id', protect, adminOnly, deleteMembership);

module.exports = router;
