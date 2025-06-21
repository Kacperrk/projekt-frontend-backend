import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.auth.loading);
  // We could use auth.error from state if we want to display an error message

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Dispatch login thunk
      await dispatch(login({ email, password })).unwrap();
      // On success, navigate back to home (book list)
      navigate('/');
    } catch (err) {
      // If login failed, error toast will be shown by interceptors (401 Unauthorized)
      // You could also handle error state here if needed.
    }
  };

  return (
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email:</label><br />
            <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password:</label><br />
            <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
  );
};

export default LoginPage;
