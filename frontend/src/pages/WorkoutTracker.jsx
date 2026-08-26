import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Topbar from '../components/Topbar';

const categories = ['strength', 'cardio', 'flexibility', 'sports', 'other'];

const initialForm = {
  exerciseName: '',
  category: 'strength',
  duration: '',
  caloriesBurned: '',
  sets: '',
  reps: '',
  weightUsed: '',
  notes: '',
};

const WorkoutTracker = () => {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.post('/workouts', form);
      setMessage('Workout logged! Great work.');
      setForm(initialForm);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not log workout.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Topbar title="Workout Tracker" subtitle="Log today's session — it feeds your streak and progress chart instantly." />

      {message && <div className="alert alert--success">{message}</div>}

      <section className="panel panel--narrow">
        <form onSubmit={submit} className="form form--grid">
          <label>
            Exercise name
            <input value={form.exerciseName} onChange={update('exerciseName')} required placeholder="Bench Press" />
          </label>
          <label>
            Category
            <select value={form.category} onChange={update('category')}>
              {categories.map((c) => (
                <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </label>
          <label>
            Duration (minutes)
            <input type="number" value={form.duration} onChange={update('duration')} required min="1" placeholder="30" />
          </label>
          <label>
            Calories burned (optional)
            <input type="number" value={form.caloriesBurned} onChange={update('caloriesBurned')} min="0" placeholder="250" />
          </label>
          <label>
            Sets (optional)
            <input type="number" value={form.sets} onChange={update('sets')} min="0" placeholder="4" />
          </label>
          <label>
            Reps (optional)
            <input type="number" value={form.reps} onChange={update('reps')} min="0" placeholder="10" />
          </label>
          <label>
            Weight used, kg (optional)
            <input type="number" value={form.weightUsed} onChange={update('weightUsed')} min="0" placeholder="60" />
          </label>
          <label className="form__full">
            Notes (optional)
            <textarea value={form.notes} onChange={update('notes')} rows={3} placeholder="How did it feel?" />
          </label>
          <div className="form__full" style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Log Workout'}
            </button>
            <button type="button" className="btn btn--outline" onClick={() => navigate('/dashboard/history')}>
              View History
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default WorkoutTracker;
