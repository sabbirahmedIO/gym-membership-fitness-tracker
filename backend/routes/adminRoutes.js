const express = require('express');
const {
  getDashboardStats,
  getMembers,
  updateMember,
  deleteMember,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/members', getMembers);
router.put('/members/:id', updateMember);
router.delete('/members/:id', deleteMember);

module.exports = router;
