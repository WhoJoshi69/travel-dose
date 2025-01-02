import express from 'express';
import { User } from '../models/User';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/employees', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, {
      _id: 1,
      firstName: 1,
      lastName: 1,
      employeeId: 1,
      designation: 1
    });
    
    res.json(users.map(user => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      employeeId: user.employeeId,
      designation: user.designation
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

export default router; 