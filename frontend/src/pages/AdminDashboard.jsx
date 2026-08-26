import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api/axios';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/admin/stats');
      setStats(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <>
      <Topbar title="Admin Control Room" subtitle="System-wide membership and activity overview." />

      {loading ? (
        <p className="muted">Loading system stats…</p>
      ) : (
        <>
          <section className="stat-grid">
            <StatCard icon="☰" label="Total Members" value={stats.totalMembers} accent="var(--accent)" />
            <StatCard icon="◆" label="Active Memberships" value={stats.activeMembers} accent="var(--accent)" />
            <StatCard icon="⌁" label="Workouts Logged" value={stats.totalWorkoutsLogged} accent="var(--accent-alt)" />
            <StatCard icon="▤" label="Membership Plans" value={stats.totalPlans} accent="var(--accent-alt)" />
          </section>

          <section className="panel">
            <div className="panel__header">
              <h3>Active Members per Plan</h3>
              <span className="muted">Distribution across current membership plans</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.planBreakdown}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="planName" stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
                <Bar dataKey="count" fill="var(--accent)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
