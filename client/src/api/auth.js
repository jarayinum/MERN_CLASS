import { http } from './http';

export const authApi = {
  register: (data) => http.post('/auth/register', data),
  login: (data) => http.post('/auth/login', data),
  logout: () => http.post('/auth/logout'),
  profile: () => http.get('/auth/me'),
  updateProfile: (data) => http.patch('/auth/me', data),
  deleteProfile: () => http.delete('/auth/me'),
  changePassword: (data) => http.patch('/auth/password', data),
  forgotPassword: (data) => http.post('/auth/forgot-password', data),
};

