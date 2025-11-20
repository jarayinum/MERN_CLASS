import { useState } from 'react';

import { authApi } from '../api/auth';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [tokenData, setTokenData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await authApi.forgotPassword({ email });
    setTokenData(data);
  };

  return (
    <section className="card auth-card">
      <h2>Reset password</h2>
      <p>In training mode we return the reset token directly.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="btn primary">Generate token</button>
      </form>
      {tokenData && (
        <div className="token-preview">
          <p>{tokenData.message}</p>
          <code>{tokenData.resetToken}</code>
          <small>Expires in {tokenData.expiresInMinutes} minutes</small>
        </div>
      )}
    </section>
  );
};

