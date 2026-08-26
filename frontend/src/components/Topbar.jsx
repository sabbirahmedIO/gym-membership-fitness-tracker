import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Topbar = ({ title, subtitle }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{title}</h1>
        {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
      </div>
      <div className="topbar__actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <div className="topbar__user">
          <span className="topbar__avatar">{initials}</span>
          <div>
            <p className="topbar__user-name">{user?.name}</p>
            <p className="topbar__user-role">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
