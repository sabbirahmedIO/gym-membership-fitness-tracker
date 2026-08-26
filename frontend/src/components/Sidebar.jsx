import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const memberLinks = [
  { to: '/dashboard', label: 'Overview', icon: '◈' },
  { to: '/dashboard/workouts', label: 'Workout Tracker', icon: '⌁' },
  { to: '/dashboard/history', label: 'Workout History', icon: '≣' },
  { to: '/dashboard/bmi', label: 'BMI Calculator', icon: '◑' },
  { to: '/dashboard/membership', label: 'Membership Plans', icon: '◆' },
  { to: '/dashboard/profile', label: 'Profile', icon: '●' },
];

const adminLinks = [
  { to: '/admin', label: 'Admin Overview', icon: '◈' },
  { to: '/admin/members', label: 'Member Management', icon: '☰' },
  { to: '/dashboard/profile', label: 'Profile', icon: '●' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const links = user?.role === 'admin' ? adminLinks : memberLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">PULSE</span>
        <span className="sidebar__brand-sub">Fitness OS</span>
      </div>

      <nav className="sidebar__nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard' || link.to === '/admin'}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            <span className="sidebar__link-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button className="sidebar__logout" onClick={logout}>
        <span>⏻</span> Log Out
      </button>
    </aside>
  );
};

export default Sidebar;
