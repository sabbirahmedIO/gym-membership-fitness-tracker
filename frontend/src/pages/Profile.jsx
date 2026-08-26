import { useEffect, useState } from 'react';
import api from '../api/axios';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUserInStorage } = useAuth();
  const [form, setForm] = useState({ name: '', age: '', gender: '', phone: '', height: '', weight: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/auth/me');
      setForm({
        name: data.name || '',
        age: data.age || '',
        gender: data.gender || '',
        phone: data.phone || '',
        height: data.height || '',
        weight: data.weight || '',
        password: '',
      });
    };
    load();
  }, []);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      const { data } = await api.put('/users/profile', payload);
      updateUserInStorage({ name: data.name });
      setStatus({ type: 'success', message: 'Profile updated successfully.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Could not update profile.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Topbar title="Profile" subtitle="Keep your details current for accurate BMI and workout tracking." />

      <section className="panel panel--narrow">
        {status.message && <div className={`alert alert--${status.type}`}>{status.message}</div>}
        <form onSubmit={submit} className="form form--grid">
          <label>
            Full name
            <input value={form.name} onChange={update('name')} required />
          </label>
          <label>
            Email
            <input value={user?.email || ''} disabled />
          </label>
          <label>
            Age
            <input type="number" value={form.age} onChange={update('age')} />
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
            Phone
            <input value={form.phone} onChange={update('phone')} />
          </label>
          <label>
            Height (cm)
            <input type="number" value={form.height} onChange={update('height')} />
          </label>
          <label>
            Weight (kg)
            <input type="number" value={form.weight} onChange={update('weight')} />
          </label>
          <label>
            New password
            <input type="password" value={form.password} onChange={update('password')} placeholder="Leave blank to keep current password" />
          </label>
          <button type="submit" className="btn btn--primary" disabled={saving} style={{ gridColumn: '1 / -1' }}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </section>
    </>
  );
};

export default Profile;
