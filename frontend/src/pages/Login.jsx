import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <Link to="/" className="auth-card__logo">PULSE</Link>
        <h1>Welcome back</h1>
        <p className="auth-card__subtitle">Log in to pick up your training where you left off.</p>

        {error && <div className="alert alert--error">{error}</div>}

        <form onSubmit={submit} className="form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </label>
          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-card__footer">
          New to PULSE? <Link to="/register">Create an account</Link>
        </p>
        <p className="auth-card__hint">
          Demo — Admin: admin@gymtracker.com / admin123 &nbsp;|&nbsp; Member: member@gymtracker.com / member123
        </p>
      </div>
    </div>
  );
};

export default Login;
