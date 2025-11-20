import { Router } from 'express';

import {
  changePassword,
  deleteProfile,
  forgotPassword,
  login,
  logout,
  profile,
  register,
  updateProfile,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, profile);
router.patch('/me', requireAuth, updateProfile);
router.delete('/me', requireAuth, deleteProfile);
router.patch('/password', requireAuth, changePassword);
router.post('/forgot-password', forgotPassword);

export default router;

