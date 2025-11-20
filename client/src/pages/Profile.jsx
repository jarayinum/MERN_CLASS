import { useState } from 'react';

import { authApi } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { storage } from '../utils/storage';

export const Profile = () => {
  const { user, refreshProfile, logout } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? '',
    role: user?.role ?? 'student',
    interests: user?.interests?.join(', ') ?? '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitProfile = async (event) => {
    event.preventDefault();
    setMessage('');
    const { data } = await authApi.updateProfile({
      ...profileForm,
      interests: profileForm.interests
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    });
    await refreshProfile();
    storage.setUser(data.user);
    setMessage('Profile updated');
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    setMessage('');
    await authApi.changePassword(passwordForm);
    setPasswordForm({ currentPassword: '', newPassword: '' });
    setMessage('Password changed');
  };

  const deleteAccount = async () => {
    await authApi.deleteProfile();
    await logout();
  };

  return (
    <section className="profile-grid">
      <form className="card" onSubmit={submitProfile}>
        <h2>Profile</h2>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={profileForm.name}
          onChange={handleProfileChange}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={profileForm.role}
          onChange={handleProfileChange}
        >
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>

        <label htmlFor="interests">Interests</label>
        <input
          id="interests"
          name="interests"
          value={profileForm.interests}
          onChange={handleProfileChange}
        />

        <button className="btn primary">Save profile</button>
      </form>

      <form className="card" onSubmit={submitPassword}>
        <h2>Change password</h2>
        <label htmlFor="currentPassword">Current password</label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={passwordForm.currentPassword}
          onChange={handlePasswordChange}
        />

        <label htmlFor="newPassword">New password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
        />

        <button className="btn primary">Update password</button>
      </form>

      <aside className="card danger">
        <h3>Danger zone</h3>
        <p>Delete your account and remove all data.</p>
        <button type="button" className="btn danger" onClick={deleteAccount}>
          Delete account
        </button>
      </aside>

      {message && <p className="success">{message}</p>}
    </section>
  );
};

