import { useEffect, useState } from 'react';
import api from '../api/axios';
import Topbar from '../components/Topbar';

const categoryColor = {
  strength: 'var(--accent)',
  cardio: 'var(--accent-alt)',
  flexibility: '#5AC8FF',
  sports: '#FFC65A',
  other: 'var(--text-muted)',
};

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/workouts');
    setWorkouts(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this workout entry?')) return;
    await api.delete(`/workouts/${id}`);
    setWorkouts((prev) => prev.filter((w) => w._id !== id));
  };

  const filtered = filter === 'all' ? workouts : workouts.filter((w) => w.category === filter);

  return (
    <>
      <Topbar title="Workout History" subtitle="Every logged session, most recent first." />

      <div className="filter-row">
        {['all', 'strength', 'cardio', 'flexibility', 'sports', 'other'].map((c) => (
          <button
            key={c}
            className={`chip${filter === c ? ' chip--active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c[0].toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Loading workout history…</p>
      ) : filtered.length === 0 ? (
        <div className="panel panel--center">
          <p className="muted">No workouts logged yet for this filter.</p>
        </div>
      ) : (
        <div className="log-list">
          {filtered.map((w) => (
            <div key={w._id} className="log-item">
              <span className="log-item__marker" style={{ background: categoryColor[w.category] }} />
              <div className="log-item__body">
                <div className="log-item__top">
                  <h4>{w.exerciseName}</h4>
                  <span className="muted">{new Date(w.date).toLocaleDateString()}</span>
                </div>
                <p className="muted">
                  {w.category} · {w.duration} min
                  {w.caloriesBurned ? ` · ${w.caloriesBurned} kcal` : ''}
                  {w.sets ? ` · ${w.sets} sets` : ''}
                  {w.reps ? ` × ${w.reps} reps` : ''}
                  {w.weightUsed ? ` @ ${w.weightUsed}kg` : ''}
                </p>
                {w.notes && <p className="log-item__notes">"{w.notes}"</p>}
              </div>
              <button className="log-item__delete" onClick={() => remove(w._id)} aria-label="Delete workout">✕</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WorkoutHistory;
