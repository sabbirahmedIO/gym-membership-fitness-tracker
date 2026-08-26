import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api/axios';
import Topbar from '../components/Topbar';
import ProgressRing from '../components/ProgressRing';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';

const WEEKLY_MINUTE_GOAL = 150;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, meRes] = await Promise.all([api.get('/workouts/stats'), api.get('/auth/me')]);
        setStats(statsRes.data);
        setMembership(meRes.data.membership);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const weeklyMinutes = stats?.minutesByDay?.reduce((sum, d) => sum + d.minutes, 0) || 0;
  const goalPercent = Math.round((weeklyMinutes / WEEKLY_MINUTE_GOAL) * 100);

  return (
    <>
      <Topbar title={`Welcome back, ${user?.name?.split(' ')[0]}`} subtitle="Here's where your training stands today." />

      {loading ? (
        <p className="muted">Loading your stats…</p>
      ) : (
        <>
          <section className="dashboard-hero">
            <div className="panel panel--ring">
              <ProgressRing
                percent={goalPercent}
                value={`${weeklyMinutes}m`}
                label={`of ${WEEKLY_MINUTE_GOAL}m goal`}
              />
              <div>
                <h3>Weekly Activity Goal</h3>
                <p className="muted">
                  You're {goalPercent >= 100 ? 'past' : `${Math.max(goalPercent, 0)}% of the way to`} this
                  week's target. Keep logging workouts to fill the ring.
                </p>
                <Link to="/dashboard/workouts" className="btn btn--primary">Log a Workout</Link>
              </div>
            </div>

            <div className="panel panel--streak">
              <span className="panel--streak__flame">🔥</span>
              <div>
                <p className="panel--streak__value">{stats?.streak || 0} day{stats?.streak === 1 ? '' : 's'}</p>
                <p className="muted">Current streak</p>
              </div>
            </div>
          </section>

          <section className="stat-grid">
            <StatCard icon="⌁" label="Total Workouts" value={stats?.totalWorkouts ?? 0} accent="var(--accent)" />
            <StatCard icon="⏱" label="Minutes Trained" value={stats?.totalMinutes ?? 0} accent="var(--accent-alt)" />
            <StatCard icon="◭" label="Calories Burned" value={stats?.totalCalories ?? 0} accent="var(--accent)" />
            <StatCard
              icon="◆"
              label="Membership"
              value={membership?.status === 'active' ? 'Active' : 'None'}
              accent={membership?.status === 'active' ? 'var(--accent)' : 'var(--accent-alt)'}
            />
          </section>

          <section className="panel">
            <div className="panel__header">
              <h3>7-Day Activity Trend</h3>
              <span className="muted">Minutes trained per day</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={stats?.minutesByDay || []}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickFormatter={(d) => d.slice(5)}
                  stroke="var(--text-muted)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}
                />
                <Line type="monotone" dataKey="minutes" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </>
      )}
    </>
  );
};

export default Dashboard;
