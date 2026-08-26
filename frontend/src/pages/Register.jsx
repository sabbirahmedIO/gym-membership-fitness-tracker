import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: '', height: '', weight: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card auth-card--wide">
        <Link to="/" className="auth-card__logo">PULSE</Link>
        <h1>Create your account</h1>
        <p className="auth-card__subtitle">Set up your profile so your BMI and workouts track accurately.</p>

        {error && <div className="alert alert--error">{error}</div>}

        <form onSubmit={submit} className="form form--grid">
          <label>
            Full name
            <input value={form.name} onChange={update('name')} required placeholder="Sabbir Ahmed" />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={update('email')} required placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={update('password')} required minLength={6} placeholder="At least 6 characters" />
          </label>
          <label>
            Age
            <input type="number" value={form.age} onChange={update('age')} min="10" max="100" placeholder="22" />
          </label>
          <label>
            Gender
            <select value={form.gender} onChange={update('gender')}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Height (cm)
            <input type="number" value={form.height} onChange={update('height')} placeholder="175" />
          </label>
          <label>
            Weight (kg)
            <input type="number" value={form.weight} onChange={update('weight')} placeholder="70" />
          </label>
          <button type="submit" className="btn btn--primary btn--block" disabled={loading} style={{ gridColumn: '1 / -1' }}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-card__footer">
          Already training with us? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
