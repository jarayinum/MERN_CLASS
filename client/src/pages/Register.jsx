import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const initialForm = {
  name: '',
  email: '',
  password: '',
  role: 'student',
  interests: '',
};

export const Register = () => {
  const { register, status, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      interests: form.interests
        .split(',')
        .map((interest) => interest.trim())
        .filter(Boolean),
    };
    try {
      await register(payload);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="card auth-card">
      <h2>Create your training profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>

        <label htmlFor="interests">Interests (comma separated)</label>
        <input
          id="interests"
          name="interests"
          value={form.interests}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button className="btn primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating...' : 'Register'}
        </button>
      </form>
      <div className="auth-links">
        <span>
          Already registered? <Link to="/login">Login</Link>
        </span>
      </div>
    </section>
  );
};

