import crypto from 'node:crypto';

import { z } from 'zod';

import { UserService } from '../services/UserService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/token.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'mentor', 'admin']).optional(),
  interests: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const updateSchema = z
  .object({
    name: z.string().min(2).optional(),
    role: z.enum(['student', 'mentor', 'admin']).optional(),
    interests: z.array(z.string()).optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'Provide at least one field to update'
  );

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  })
  .refine(
    (data) => data.currentPassword !== data.newPassword,
    'New password must be different from the current password'
  );

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const register = asyncHandler(async (req, res) => {
  const payload = registerSchema.parse(req.body);
  const existing = await UserService.findByEmail(payload.email);

  if (existing) {
    res.status(409);
    throw new Error('Email already in use');
  }

  const user = await UserService.createUser(payload);
  const safeUser = { ...user, password: undefined };
  const token = generateToken({ id: safeUser._id, role: safeUser.role });

  res.status(201).json({ user: safeUser, token });
});

export const login = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const user = await UserService.findByEmail(payload.email);

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.matchPassword(payload.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ user: { ...user.toObject(), password: undefined }, token });
});

export const profile = asyncHandler(async (req, res) => {
  const user = await UserService.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ user });
});

export const logout = asyncHandler((_req, res) => {
  res.json({
    message:
      'Logged out. Remove the token on the client to finish the operation.',
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const payload = updateSchema.parse(req.body);
  const user = await UserService.updateById(req.user.id, payload);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ user });
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const deleted = await UserService.deleteById(req.user.id);

  if (!deleted) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ message: 'Account deleted successfully' });
});

export const changePassword = asyncHandler(async (req, res) => {
  const payload = changePasswordSchema.parse(req.body);
  const user = await UserService.findByIdWithPassword(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const isMatch = await user.matchPassword(payload.currentPassword);
  if (!isMatch) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  user.password = payload.newPassword;
  await user.save();

  res.json({ message: 'Password updated successfully' });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const payload = forgotPasswordSchema.parse(req.body);
  const user = await UserService.findByEmail(payload.email);

  // Training environment: return mock token even if the user does not exist
  const resetToken = crypto.randomBytes(20).toString('hex');

  res.json({
    message: user
      ? 'Password reset token generated'
      : 'If that email exists, a reset token is generated.',
    resetToken,
    expiresInMinutes: 30,
    email: payload.email,
  });
});

