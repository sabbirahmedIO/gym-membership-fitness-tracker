import { useEffect, useState } from 'react';
import api from '../api/axios';
import Topbar from '../components/Topbar';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const load = async (q = '') => {
    setLoading(true);
    const { data } = await api.get('/admin/members', { params: q ? { search: q } : {} });
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    load(search);
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setEditForm({ name: member.name, email: member.email, phone: member.phone || '' });
  };

  const saveEdit = async (id) => {
    const { data } = await api.put(`/admin/members/${id}`, editForm);
    setMembers((prev) => prev.map((m) => (m._id === id ? { ...m, ...data } : m)));
    setEditingId(null);
  };

  const remove = async (id) => {
    if (!window.confirm('Remove this member permanently?')) return;
    await api.delete(`/admin/members/${id}`);
    setMembers((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <>
      <Topbar title="Member Management" subtitle="Add, update, search and remove gym members." />

      <form onSubmit={onSearch} className="search-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
        />
        <button type="submit" className="btn btn--outline">Search</button>
      </form>

      {loading ? (
        <p className="muted">Loading members…</p>
      ) : (
        <div className="panel table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id}>
                  {editingId === m._id ? (
                    <>
                      <td><input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></td>
                      <td><input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} /></td>
                      <td><input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} /></td>
                      <td colSpan={2} className="muted">—</td>
                      <td className="table-actions">
                        <button className="btn btn--primary btn--sm" onClick={() => saveEdit(m._id)}>Save</button>
                        <button className="btn btn--outline btn--sm" onClick={() => setEditingId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{m.name}</td>
                      <td>{m.email}</td>
                      <td>{m.phone || '—'}</td>
                      <td>{m.membership?.plan?.name || '—'}</td>
                      <td>
                        <span className={`status-pill status-pill--${m.membership?.status || 'none'}`}>
                          {m.membership?.status || 'none'}
                        </span>
                      </td>
                      <td className="table-actions">
                        <button className="btn btn--outline btn--sm" onClick={() => startEdit(m)}>Edit</button>
                        <button className="btn btn--danger btn--sm" onClick={() => remove(m._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan={6} className="muted" style={{ textAlign: 'center', padding: '2rem' }}>No members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MemberManagement;
